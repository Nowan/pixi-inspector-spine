<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import SelectMenu from "blender-elements/src/SelectMenu/SelectMenu.svelte";
  import Panel from "blender-elements/src/Panel/Panel.svelte";
  import type { NodeProperties } from "./types";

  export let props: NodeProperties;
  export let expanded: Record<string, boolean>;

  const dispatch = createEventDispatcher();

  $: animationNamesPanel =
    typeof props.animationNames === "object" &&
    Array.isArray(props.animationNames);
</script>

{#if animationNamesPanel && Array.isArray(props.animationNames)}
  <Panel title="Track 0" bind:expanded={expanded.ticker}>
    <SelectMenu
      value={props.animationName || "-- setup pose --"}
      options={[ "-- setup pose --", ...props.animationNames ]}
      on:change={(e) => dispatch("change", { property: "animationName", value: e.detail })}
    />
  </Panel>
{/if}
