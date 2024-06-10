<script setup lang="ts">
import SearchBar from '@/components/inputs/search-bar.vue'

defineProps<{
  isDarkMode: boolean
}>()
</script>

<template>
  <nav
    class="bg-primary-light dark:bg-primary-dark p-3 flex justify-between items-center border-b shadow-lg"
  >
    <img v-if="isDarkMode" src="/src/assets/logo-dark.svg" alt="logo" class="max-w-36" />
    <img v-else src="/src/assets/logo.svg" alt="logo" class="max-w-36" />

    <div>
      <div>
        <search-bar />
      </div>
    </div>
  </nav>
</template>
