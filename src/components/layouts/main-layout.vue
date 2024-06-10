<template>
  <div class="flex flex-col min-h-screen" :class="{ dark: isDarkMode }">
    <main-navbar :is-dark-mode="isDarkMode" />

    <main class="flex-grow">
      <router-view />
    </main>

    <div class="p-y-3 p-x-4 border-t">
      <main-footer />
    </div>
  </div>
</template>

<script setup lang="ts">
import MainFooter from '@/components/main-footer.vue'
import MainNavbar from '@/components/main-navbar.vue'
import { ref } from 'vue'

/**
 * Note: this is for demonstration purpose and it is not fully implemented due to time constrains.
 *
 * Todo:
 * - create function that will toggle the dark mode, and save the state to local storage.
 * - implement rest of the dark mode style.
 */
const isDarkMode = ref(false)
</script>
