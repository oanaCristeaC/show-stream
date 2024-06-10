<script setup lang="ts">
const fullYear = new Date().getFullYear()
</script>

<template>
  <footer class="p-4">
    <div class="social-link flex">
      <a
        class="social-link pr-3"
        href="https://www.facebook.com"
        target="_blank"
        aria-label="facebook"
      >
        <img src="/src/assets/social-media/facebook.svg" alt="facebook" />
      </a>
      <a
        class="social-link pr-3"
        href="https://www.instagram.com"
        target="_blank"
        aria-label="instagram"
      >
        <img src="/src/assets/social-media/instagram.svg" alt="instagram" />
      </a>
      <a
        class="social-link pr-3"
        href="https://www.twitter.com"
        target="_blank"
        aria-label="twitter"
      >
        <img src="/src/assets/social-media/twitter.svg" alt="twitter" />
      </a>
      <a class="social-link" href="https://www.youtube.com" target="_blank" aria-label="youtube">
        <img src="/src/assets/social-media/youtube.svg" alt="youtube" />
      </a>
    </div>

    <div class="text-center text-sm py-4">
      <span>© 2003-{{ fullYear }} Stream Show, Inc.</span>
    </div>
  </footer>
</template>
