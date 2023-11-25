<script lang="ts">
  import { createEventDispatcher, onMount } from "svelte";
  import { 
    Timeline,
    TimelineClickEvent,
    TimelineInteractionMode,
    TimelineModel, 
    TimelineOptions, 
    TimelineTimeChangedEvent 
  } from "animation-timeline-js";

  const dispatch = createEventDispatcher();

  export let options: TimelineOptions = {};
  export let model: TimelineModel = { rows: [] };
  export let interactionMode: TimelineInteractionMode = TimelineInteractionMode.None;
  export let time: number = 0;

  let prevModel: TimelineModel = model;
  let prevTime: number = time;

  let timelineContainerElement: HTMLDivElement;
  let timeline: Timeline;

  $: {
    if (model !== prevModel) {
      timeline.setModel(model);
      prevModel = model;
    }
  }

  $: {
    if (time !== prevTime) {
      timeline.setTime(time);
      prevTime = time;
    }
  }

  onMount(() => {
    timeline = new Timeline({ ...options, id: options.id || timelineContainerElement }, model);
    timeline.setInteractionMode(interactionMode);

    timeline.onMouseDown((event: TimelineClickEvent) => {
      const mouseUpListener = () => dispatch("mouseUp", { ...event, val: timeline.getTime() });
      const mouseUpListenerSelfDisposed = () => {
        mouseUpListener()
        window.removeEventListener("mouseup", mouseUpListenerSelfDisposed)
      }

      window.addEventListener("mouseup", mouseUpListenerSelfDisposed)
      dispatch("mouseDown", event)
    });

    timeline.onTimeChanged((event: TimelineTimeChangedEvent) => dispatch("timeChanged", event));
  });

</script>

{#if !["object", "string"].includes(typeof options.id)}
  <div id="timelineCanvas" bind:this={timelineContainerElement} />
{/if}

<style lang="scss">
  #timelineCanvas {
    width: 100%;
    height: 200px;
  }
</style>