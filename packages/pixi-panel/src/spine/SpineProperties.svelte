<script lang="ts">
  import type { NodeProperties } from "../types";
  import PlaybackPanel from "./composites/PlaybackPanel.svelte";
  import DebugPanel from "./composites/DebugPanel.svelte";

  export let props: NodeProperties;
  export let expanded: Record<string, boolean>;

  $: animationsNames = props.spineAnimations ? props.spineAnimations.map(animation => animation.name) : [];
</script>

<PlaybackPanel 
  props={props}
  bind:expanded={expanded.spinePlaybackPanel} 
  on:change 
/>
<DebugPanel 
  props={props}
  animationsNames={animationsNames}
  bind:expanded={expanded.spineDebugPanel} 
  on:change 
/>