<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { TimelineEventSource, TimelineKeyframe, TimelineKeyframeShape, TimelineModel, TimelineOptions, TimelineTimeChangedEvent } from "animation-timeline-js";
  import type { SpineSerializableTrackData } from "../types";
  import Timeline from "./Timeline.svelte";

  export let head: number = 0;
  export let speed: number = 1;
  export let tracks: SpineSerializableTrackData[] = [];

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
    rows: tracks.map(trackData => {
      const keyframes: TimelineKeyframe[] = [];

      if (trackData) {
        let lastTrackEnd = 0;

        for (let i = 0; i < trackData.length; i += 1) {
          const trackEntry = trackData[i];
          const trackEntryDuration = trackEntry.animation.duration * 1000;

          keyframes.push(
            { val: lastTrackEnd, group: trackEntry.animation.name }, 
            { val: lastTrackEnd + trackEntryDuration, group: trackEntry.animation.name }
          );

          lastTrackEnd += trackEntryDuration;
        }
      }

      return {
        keyframes,
        style: { ...ROW_STYLE }
      }
    })
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