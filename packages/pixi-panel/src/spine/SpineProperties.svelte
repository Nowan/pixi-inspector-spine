<script lang="ts">
  import type { SpineProperties } from "./types";
  import PlaybackPanel from "./composites/PlaybackPanel.svelte";
  import DebugPanel from "./composites/DebugPanel.svelte";

  export let props: SpineProperties;
  export let expanded: Record<string, boolean>;
</script>

<PlaybackPanel props={props} bind:expanded={expanded.spinePlaybackPanel} on:change />
<DebugPanel props={props} bind:expanded={expanded.spineDebugPanel} on:change />