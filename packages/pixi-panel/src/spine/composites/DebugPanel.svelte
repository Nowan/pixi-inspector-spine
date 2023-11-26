<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import Panel from "blender-elements/src/Panel/Panel.svelte";
  import Property from "blender-elements/src/Property/Property.svelte";
  import SelectMenu from "blender-elements/src/SelectMenu/SelectMenu.svelte";
  import type { NodeProperties } from "../../types";

  export let props: NodeProperties;
  export let expanded: boolean;
  export let animationsNames: string[] = [];

  const dispatch = createEventDispatcher();
  const ANIMATION_NAME = Object.freeze({ NONE: "" })

  let spineTracksSnapshot = props.spineTracks;
  let selectedAnimationName = ANIMATION_NAME.NONE as string;

  const onDebugAnimationChange = (event: CustomEvent<string>) => {
    const nextSelectedAnimationName = event.detail;

    if (nextSelectedAnimationName === ANIMATION_NAME.NONE) {
      dispatch("change", { property: "spineTracks", value: spineTracksSnapshot });
    }
    else {
      if (selectedAnimationName === ANIMATION_NAME.NONE) spineTracksSnapshot = props.spineTracks;
      dispatch("change", { property: "spineTracks", value: [[ { animation: { name: nextSelectedAnimationName, duration: props.spineAnimations?.find(animation => animation.name === nextSelectedAnimationName) }, loop: true } ]] });
    }

    selectedAnimationName = nextSelectedAnimationName;
  };
</script>

<Panel title="Debug" bind:expanded>
  <Property label="Animation">
    <SelectMenu
      value={selectedAnimationName}
      options={[ ANIMATION_NAME.NONE, ...animationsNames ]}
      on:change={onDebugAnimationChange}
    />
  </Property>
</Panel>