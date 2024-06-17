<script setup lang="ts">
import ImageSlider from '@/components/carousels/image-slider.vue'
import { computed, onMounted, ref } from 'vue'
import { useShowsInfoStore } from '@/stores/show-store'
import NoDataShows from '@/views/show-list/components/no-data-shows.vue'
import type { ShowInfo, ShowsByGenreModel } from '@/models/show-model'
import ShowSlider from '@/views/show-list/components/show-slider.vue'

const store = useShowsInfoStore()

const showsByGenera = computed(() => (store.showsByGenre as ShowsByGenreModel) ?? {})
const hasAllShowsInfoData = computed(() => store.hasAllShowsInfoData)
const getRemainingGeneraWithShows = computed(() => store.remainingGeneraWithShows)

// hard coded hide button after one click but this should be dynamic
// the toggle should be based on the remaining data: if there is no more data to show, hide the button
const hideButton = ref(false)

const showReamingGenera = async () => {
  await store.getRemainingGeneraWithShows()
  hideButton.value = true
}
onMounted(async () => {
  await store.getShowsByGenre()
})
</script>

<template>
  <!-- todo: if error: check the error type and show the appropriated error message or component -->
  <div v-if="Object.keys(showsByGenera).length > 0">
    <show-slider :has-all-shows-info-data="hasAllShowsInfoData" :shows-by-genera="showsByGenera" />
    <div v-if="Object.keys(showsByGenera).length > 0">
      <div class="flex justify-center p-3">
        <button
          v-if="!hideButton && hasAllShowsInfoData"
          @click="showReamingGenera"
          class="border py-2 px-4 rounded cursor-pointer bg-slate-200 hover:bg-slate-300"
        >
          Load More
        </button>
      </div>
      <!-- todo: add some loading-->
      <show-slider
        :has-all-shows-info-data="hasAllShowsInfoData"
        :shows-by-genera="getRemainingGeneraWithShows"
      />
    </div>
  </div>

  <no-data-shows v-else />
</template>
