<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import SelectMenu from "blender-elements/src/SelectMenu/SelectMenu.svelte";
  import Panel from "blender-elements/src/Panel/Panel.svelte";

  import type { SpineProperties } from "./types";
    import PlaybackPanel from "./composites/PlaybackPanel.svelte";

  export let props: SpineProperties;
  export let expanded: Record<string, boolean>;

  const dispatch = createEventDispatcher();

  $: animationNamesPanel =
    typeof props.spineAnimationNames === "object" &&
    Array.isArray(props.spineAnimationNames);
</script>

{#if animationNamesPanel && Array.isArray(props.spineAnimationNames) && props.spineAnimationNames.length > 0}
  <PlaybackPanel props={props} on:change />
  <Panel title="Track 0" bind:expanded={expanded.ticker}>
    <SelectMenu
      value={props.spineAnimationName || "-- setup pose --"}
      options={[ "-- setup pose --", ...props.spineAnimationNames ]}
      on:change={(e) => dispatch("change", { property: "spineAnimationName", value: e.detail })}
    />
  </Panel>
{/if}