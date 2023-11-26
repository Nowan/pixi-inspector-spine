<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import Panel from "blender-elements/src/Panel/Panel.svelte";
  import Toggle from "blender-elements/src/Toggle/Toggle.svelte";
  import type { NodeProperties } from "../../types";
  import TracksTimeline from "./TracksTimeline.svelte";

  export let props: NodeProperties;
  export let expanded: boolean;

  const dispatch = createEventDispatcher();
</script>

<Panel title="Playback" bind:expanded>
  <div class="playback-controls">
    <div class="secondary-controls">
      <Toggle
        icon="fastBackward"
        value={false}
        location="ALONE"
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
      />
    </div>
  </div>

  <TracksTimeline
    head={props.spineAnimationHead}
    speed={1}
    tracks={props.spineTracks}
    on:change
  />
</Panel>

<style lang="scss">
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