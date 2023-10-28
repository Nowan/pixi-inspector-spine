<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import Panel from "blender-elements/src/Panel/Panel.svelte";
  import NumberField from "blender-elements/src/NumberField/NumberField.svelte";
  import Property from "blender-elements/src/Property/Property.svelte";
  import type { NodeProperties } from "./types";

  export let props: NodeProperties;
  export let expanded: Record<string, boolean>;

  const dispatch = createEventDispatcher();

  $: transformOriginPanel =
    typeof props.originX === "number" ||
    typeof props.anchorX === "number" ||
    typeof props.pivotX === "number";
</script>

{#if transformOriginPanel}
  <Panel title="Transform Origin" bind:expanded={expanded.transformOrigin}>
    {#if typeof props.pivotX === "number"}
      <Property
        label="Pivot X"
        group
        hint="The center of rotation, scaling, and skewing for this display object in its local space"
      >
        <NumberField
          value={props.pivotX}
          step={0.1}
          location="TOP"
          on:change={(e) =>
            dispatch("change", { property: "pivotX", value: e.detail })}
        />
      </Property>
      <Property label="Y">
        <NumberField
          value={props.pivotY}
          step={0.1}
          location="BOTTOM"
          on:change={(e) =>
            dispatch("change", { property: "pivotY", value: e.detail })}
        /></Property
      >
    {/if}
  </Panel>
{/if}
