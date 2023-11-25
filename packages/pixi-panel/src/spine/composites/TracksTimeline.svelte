<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { TimelineEventSource, TimelineKeyframeShape, TimelineModel, TimelineOptions, TimelineTimeChangedEvent } from "animation-timeline-js";
  import Timeline from "./Timeline.svelte";

  export let totalDuration: number = 0;
  export let head: number = 0;
  export let speed: number = 1;

  const OPTIONS: TimelineOptions = { 
    groupsDraggable: false, 
    keyframesDraggable: false,
    headerFillColor: "#292929",
    fillColor: "#292929",
    leftMargin: 3,
    snapEnabled: false
  };

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
  
  const dispatch = createEventDispatcher();
  
  $: model = {
    rows: [
      {
        keyframes: totalDuration > 0 ? [ { val: 0 }, { val: totalDuration * 1000 } ] : [],
        style: { ...ROW_STYLE }
      }
    ]
  } as TimelineModel;

  const onTimeChanged = (event: CustomEvent<TimelineTimeChangedEvent>) => {
    if (event.detail.source === TimelineEventSource.User) {
      dispatch("change", { property: "spineAnimationHead", value: event.detail.val / 1000 })
    }
  }

  let lockedPlaybackSpeed = speed;
  const onMouseDown = () => {
    lockedPlaybackSpeed = speed;
    dispatch("change", { property: "spinePlaybackSpeed", value: 0 })
  }

  const onMouseUp = () => {
    dispatch("change", { property: "spinePlaybackSpeed", value: lockedPlaybackSpeed })
  }
</script>

<Timeline
  options={OPTIONS}
  model={model}
  time={head * 1000}
  on:mouseDown={onMouseDown}
  on:mouseUp={onMouseUp}
  on:timeChanged={onTimeChanged}
/>