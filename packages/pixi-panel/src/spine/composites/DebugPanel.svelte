<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import Panel from "blender-elements/src/Panel/Panel.svelte";
  import Property from "blender-elements/src/Property/Property.svelte";
  import SelectMenu from "blender-elements/src/SelectMenu/SelectMenu.svelte";
  import type { SpineProperties } from "../types";

  export let props: SpineProperties;
  export let expanded: boolean;

  const dispatch = createEventDispatcher();
</script>

<Panel title="Debug" bind:expanded>
  <Property label="Animation">
    <SelectMenu
      value={props.spineAnimationName || ""}
      options={[ "", ...(props.spineAnimationNames || []) ]}
      on:change={(e) => dispatch("change", { property: "spineAnimationName", value: e.detail })}
    />
  </Property>
</Panel>