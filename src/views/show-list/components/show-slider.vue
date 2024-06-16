<script setup lang="ts">
import type { ShowsByGenreDBModel, ShowsByGenreModel } from '@/models/show-model'
import router from '@/router'
import ImageSlider from '@/components/carousels/image-slider.vue'

defineProps<{
  showsByGenera: ShowsByGenreModel
  hasAllShowsInfoData: boolean
}>()
</script>

<template>
  <div v-for="(showsInfo, genera) in showsByGenera" class="py-8">
    <div class="mb-3 ml-4 flex items-center">
      <h2 class="text-xl font-bold text-slate-800">{{ genera }}</h2>
      <a
        :class="{ 'cursor-not-allowed': !hasAllShowsInfoData }"
        class="ml-2 text-sm text-slate-500 hover:text-slate-800 max-height-17 inline-flex items-center"
        :aria-disabled="!hasAllShowsInfoData"
        :href="
          router.resolve({
            name: 'shows-genera',
            params: { genera: genera.toString().toLowerCase() }
          }).href
        "
      >
        View all
        <svg
          class="w-4 h-4 ml-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 5l7 7-7 7"
          ></path>
        </svg>
      </a>
    </div>
    <image-slider :data="showsInfo" />
  </div>
</template>
<style scoped>
.max-height-17 {
  max-height: 17px;
}
</style>
