<template>
  <div class="flex flex-col min-h-screen" :class="{ dark: isDarkMode }">
    <nav class="bg-primary-light dark:bg-primary-dark p-3 flex justify-between items-center border-b
      shadow-lg
    ">
      <img
          v-if="isDarkMode"
          src="/src/assets/logo-dark.svg"
          alt="logo" class="max-w-36">
      <img
          v-else
          src="/src/assets/logo.svg"
          alt="logo" class="max-w-36">

      <!-- Search Bar -->
      <div>
        <div>
          <search-bar/>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="flex-grow">
      <router-view/>
    </main>

    <!-- Footer -->
<div class="p-y-3 p-x-4 border-t">
  <footer class="p-4">
    <div class="social-link flex">
      <a class="social-link pr-3"
         href="https://www.facebook.com"
         target="_blank"
         aria-label="facebook">
        <img src="/src/assets/social-media/facebook.svg" alt="facebook">
      </a>
      <a class="social-link pr-3"
         href="https://www.instagram.com"
         target="_blank"
         aria-label="instagram">
        <img src="/src/assets/social-media/instagram.svg" alt="instagram">
      </a>
      <a class="social-link pr-3"
         href="https://www.twitter.com"
         target="_blank"
         aria-label="twitter">
        <img src="/src/assets/social-media/twitter.svg" alt="twitter">
      </a>
      <a class="social-link"
         href="https://www.youtube.com"
         target="_blank"
         aria-label="youtube">
        <img src="/src/assets/social-media/youtube.svg" alt="youtube">
      </a>
    </div>
    <div class="text-center text-sm py-4">
      <span>© 2003-{{fullYear}} Steam Show, Inc.</span>
    </div>

  </footer>
</div>
  </div>
</template>

<script setup lang="ts">

import {ref} from "vue";
import SearchBar from "@/components/inputs/search-bar.vue";
import {date} from "yup";

// use .env
const isDarkMode = ref(false)
const fullYear = new Date().getFullYear()
</script>
