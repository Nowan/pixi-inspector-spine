<script lang="ts">
  import { afterUpdate, createEventDispatcher, onMount } from "svelte";
  import SelectMenu from "blender-elements/src/SelectMenu/SelectMenu.svelte";
  import Panel from "blender-elements/src/Panel/Panel.svelte";
  import Toggle from "blender-elements/src/Toggle/Toggle.svelte";
  import { 
    Timeline,
    TimelineEventSource, 
    TimelineInteractionMode, 
    TimelineKeyframeShape, 
    TimelineModel, 
    TimelineOptions, 
    TimelineTimeChangedEvent 
  } from "animation-timeline-js";

  import type { NodeProperties } from "./types";

  export let props: NodeProperties;
  export let expanded: Record<string, boolean>;
  let prevProps: NodeProperties = props;

  const dispatch = createEventDispatcher();

  const ROW_STYLE = Object.freeze({
    groupsStyle: {
      strokeColor: "Transparent",
      fillColor: "#094771",
      keyframesStyle: {
        shape: TimelineKeyframeShape.Rect,
        width: 2,
        height: 20,
        strokeColor: "Transparent",
        fillColor: "Transparent"
      }
    }
  });

  let timelineContainerElement: HTMLDivElement;
  let timeline: Timeline;

  $: {
    if (props.spineAnimationDuration && props.spineAnimationDuration !== prevProps.spineAnimationDuration) {
      timeline.setModel({ 
        rows: [
          {
            keyframes: [ { val: 0 }, { val: props.spineAnimationDuration * 1000 } ],
            style: ROW_STYLE
          }
        ]
      });
    }

     prevProps = props;
  }

  $: animationNamesPanel =
    typeof props.spineAnimationNames === "object" &&
    Array.isArray(props.spineAnimationNames);

  afterUpdate(() => {
    timeline.setTime((props.spineAnimationHead || 0) * 1000);
  })

  onMount(() => {
    const options: TimelineOptions = { 
      id: timelineContainerElement, 
      groupsDraggable: false, 
      keyframesDraggable: false,
      headerFillColor: "#292929",
      fillColor: "#292929",
      leftMargin: 3,
      snapEnabled: false
    };

    const model : TimelineModel = {
      rows: [
        {
          keyframes: [],
          style: { ...ROW_STYLE }
        }
      ]
    };

    if (props.spineAnimationDuration) {
      model.rows[0].keyframes?.push({ val: 0 }, { val: props.spineAnimationDuration * 1000 })
    }

		timeline = new Timeline(options, model);

    timeline.setTime((props.spineAnimationHead || 0) * 1000);
    timeline.setInteractionMode(TimelineInteractionMode.NonInteractivePan);

    timeline.onMouseDown(() => {
      const lockedPlaybackSpeed = props.spinePlaybackSpeed;
      const restorePlaybackSpeed = () => dispatch("change", { property: "spinePlaybackSpeed", value: lockedPlaybackSpeed })
      const restorePlaybackSpeedSelfDisposed = () => {
        restorePlaybackSpeed()
        window.removeEventListener("mouseup", restorePlaybackSpeedSelfDisposed)
      }

      dispatch("change", { property: "spinePlaybackSpeed", value: 0 })
      window.addEventListener("mouseup", restorePlaybackSpeedSelfDisposed)
    });

    timeline.onTimeChanged((event: TimelineTimeChangedEvent) => {
      if(event.source === TimelineEventSource.User) {
        dispatch("change", { property: "spineAnimationHead", value: event.val / 1000 })
      }
    });

    timeline._formatUnitsText = (val) => `${val / 1000}s`; // eslint-disable-line no-underscore-dangle
	});

</script>

{#if animationNamesPanel && Array.isArray(props.spineAnimationNames) && props.spineAnimationNames.length > 0}
  <Panel title="Playback" bind:expanded={expanded.tracks}>
    <div class="playback-controls">
      <div class="secondary-controls">
        <Toggle
          icon="fastBackward"
          value={false}
          location="ALONE"
          on:change={() =>
            dispatch("change", { property: "fontStyle", value: "normal" })}
        />
      </div>

      <div class="primary-controls">
        <Toggle
          icon="playBackward"
          value={props.spinePlaybackSpeed ? props.spinePlaybackSpeed < 0 : false}
          location="LEFT"
          on:change={event => dispatch("change", { property: "spinePlaybackSpeed", value: event.detail ? -1 : 0 })}
        />
        <Toggle
          icon="playForward"
          value={props.spinePlaybackSpeed ? props.spinePlaybackSpeed > 0 : false}
          location="RIGHT"
          on:change={event => dispatch("change", { property: "spinePlaybackSpeed", value: event.detail ? 1 : 0 })}
        />
      </div>

      <div class="secondary-controls">
        <Toggle
          icon="fastForward"
          value={false}
          location="ALONE"
          on:change={() =>
            dispatch("change", { property: "fontStyle", value: "normal" })}
        />
      </div>
    </div>

    <div id="tracksCanvas" bind:this={timelineContainerElement} />
  </Panel>
  <Panel title="Track 0" bind:expanded={expanded.ticker}>
    <SelectMenu
      value={props.spineAnimationName || "-- setup pose --"}
      options={[ "-- setup pose --", ...props.spineAnimationNames ]}
      on:change={(e) => dispatch("change", { property: "spineAnimationName", value: e.detail })}
    />
  </Panel>
{/if}

<style lang="scss">
  #tracksCanvas {
    width: 100%;
    height: 200px;
  }

  .playback-controls {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-bottom: 3px;

    & .primary-controls {
      width: 66px;
      height: 24px;
      margin: 0 5px;
      display: grid;
      grid-template-columns: 1fr 1fr;

      & :global(button .icon) {
        margin: 0 auto;
      }
    }

    & .secondary-controls {
      & :global(button) {
        width: 30px;
        height: 18px;

        & :global(.icon) {
          margin: 0 auto;
        }
      }
    }
  }
</style>