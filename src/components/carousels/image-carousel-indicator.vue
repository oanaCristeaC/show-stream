<script setup lang="ts">
import {DirectionEnum} from "@/enums/direction-enum";

defineProps<{
  direction: DirectionEnum.Right | DirectionEnum.Left
}>()
const emit = defineEmits(['navigate-direction'])
</script>
<template>
  <button
    class="absolute z-10 h-full hover:bg-gray-800 hover:bg-opacity-35"
    :class="direction === DirectionEnum.Right ? 'right-0' : 'left-0'"
    @click="emit('navigate-direction')"
  >
    <img
      v-if="direction === DirectionEnum.Right"
      src="@/assets/images/caret-right.svg"
      alt="Right indicator"
      class="indicator-icon"
    />
    <img v-else src="@/assets/images/caret-left.svg" alt="Left indicator" class="indicator-icon" />
  </button>
</template>
