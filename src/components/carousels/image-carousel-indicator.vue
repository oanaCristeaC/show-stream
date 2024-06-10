<script setup lang="ts">
import { Direction } from '@/models/direction'

defineProps<{
  direction: Direction.Right | Direction.Left
}>()
const emit = defineEmits(['navigate-direction'])
</script>
<template>
  <button
    class="absolute z-10 h-full hover:bg-gray-800 hover:bg-opacity-35"
    :class="direction === Direction.Right ? 'right-0' : 'left-0'"
    @click="emit('navigate-direction')"
  >
    <img
      v-if="direction === Direction.Right"
      src="@/assets/caret-right.svg"
      alt="Right indicator"
      class="indicator-icon"
    />
    <img v-else src="@/assets/caret-left.svg" alt="Left indicator" class="indicator-icon" />
  </button>
</template>
