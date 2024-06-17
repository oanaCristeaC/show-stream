<script setup lang="ts">
import SearchBar from '@/components/inputs/search-bar.vue'
</script>

<template>
  <nav
    class="bg-primary-light dark:bg-primary-dark p-3 flex justify-between items-center border-b shadow-lg"
  >
    <a href="/">
      <img src="/src/assets/images/logo.svg" alt="logo" class="max-w-36" />
    </a>
    <div>
      <div>
        <search-bar />
      </div>
    </div>
  </nav>
</template>
