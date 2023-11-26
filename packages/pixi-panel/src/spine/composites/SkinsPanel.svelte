<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import Panel from "blender-elements/src/Panel/Panel.svelte";
  import Checkbox from "blender-elements/src/Checkbox/Checkbox.svelte";
  import type { SpineSerializableSkinData } from "../types";

  export let expanded: boolean;
  export let skins: SpineSerializableSkinData[] = [];
  export let activeSkin: SpineSerializableSkinData = null;

  const dispatch = createEventDispatcher();
</script>

<Panel title="Skins" bind:expanded>
  {#each skins as skin}
    <Checkbox
      value={skin === activeSkin}
      on:change={(e) =>
      dispatch("change", { property: "spineActiveSkin", value: e.detail ? skin : null })}
    >
      {skin}
    </Checkbox>
  {/each}
</Panel>