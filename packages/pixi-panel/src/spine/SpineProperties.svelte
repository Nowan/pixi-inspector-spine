<script lang="ts">
  import type { NodeProperties } from "../types";
  import PlaybackPanel from "./composites/PlaybackPanel.svelte";
  import DebugPanel from "./composites/DebugPanel.svelte";
  import SkinsPanel from "./composites/SkinsPanel.svelte";

  export let props: NodeProperties;
  export let expanded: Record<string, boolean>;

  $: animationsNames = props.spineAnimations ? props.spineAnimations.map(animation => animation.name) : [];
</script>

<PlaybackPanel 
  props={props}
  bind:expanded={expanded.spinePlaybackPanel} 
  on:change 
/>
<SkinsPanel 
  skins={props.spineSkins}
  activeSkin={props.spineActiveSkin}
  bind:expanded={expanded.spineSkinsPanel} 
  on:change
/>
<DebugPanel 
  props={props}
  animationsNames={animationsNames}
  bind:expanded={expanded.spineDebugPanel} 
  on:change 
/>