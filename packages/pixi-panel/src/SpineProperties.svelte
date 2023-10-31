<script lang="ts">
  import { createEventDispatcher, onMount } from "svelte";
  import SelectMenu from "blender-elements/src/SelectMenu/SelectMenu.svelte";
  import Panel from "blender-elements/src/Panel/Panel.svelte";
  import Toggle from "blender-elements/src/Toggle/Toggle.svelte";
  import { Timeline, TimelineInteractionMode, TimelineKeyframeShape } from "animation-timeline-js";
  import type { NodeProperties } from "./types";

  export let props: NodeProperties;
  export let expanded: Record<string, boolean>;

  const dispatch = createEventDispatcher();

  $: animationNamesPanel =
    typeof props.animationNames === "object" &&
    Array.isArray(props.animationNames);

  let timelineContainerElement: HTMLDivElement;
  let timeline: Timeline;

  onMount(() => {
		timeline = new Timeline({ 
      id: timelineContainerElement, 
      groupsDraggable: false, 
      keyframesDraggable: false,
      headerFillColor: "#292929",
      fillColor: "#292929",
      leftMargin: 3
    });
    timeline.setModel({ 
      rows: [
        {
          keyframes: [
            {
              val: 0,
            },
            {
              val: 3000
            }
          ],
          style: {
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
          },
        }
      ]
    });
    timeline.setInteractionMode(TimelineInteractionMode.NonInteractivePan);
	});

</script>

{#if animationNamesPanel && Array.isArray(props.animationNames) && props.animationNames.length > 0}
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
          value={false}
          location="LEFT"
          on:change={() =>
            dispatch("change", { property: "fontStyle", value: "normal" })}
        />
        <Toggle
          icon="playForward"
          value={false}
          location="RIGHT"
          on:change={() =>
            dispatch("change", { property: "fontStyle", value: "oblique" })}
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
      value={props.animationName || "-- setup pose --"}
      options={[ "-- setup pose --", ...props.animationNames ]}
      on:change={(e) => dispatch("change", { property: "animationName", value: e.detail })}
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