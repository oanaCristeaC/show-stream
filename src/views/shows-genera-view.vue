<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useShowsInfoStore } from '@/stores/show-store'
import NoDataShows from '@/views/show-list/components/no-data-shows.vue'
import type { ShowInfo, ShowInfoDBModel } from '@/models/show-model'
import { ShowGenresEnum } from '@/enums/show-enum'
import StarRating from '@/components/star-rating.vue'
import ImageNotAvailable from '@/components/image-not-available.vue'
import router from '@/router'

const store = useShowsInfoStore()

const page = ref(1)
const limit = ref(24)

const allShowsByGenre = computed(() => (store.allShowsInfoByGenera as ShowInfo[]) ?? [])
const getGenera = router.currentRoute.value.params.genera

onMounted(async () => {
  await store.getAllShowsInfo(getGenera as ShowGenresEnum, page.value, limit.value)
})

const redirectToShowDetails = (showId: number) => {
  router.push({ name: 'show-details', params: { showId } })
}

const loadMore = async () => {
  page.value++
  await store.getAllShowsInfo(getGenera as ShowGenresEnum, page.value, limit.value)
}
</script>

<template>
  <!-- todo: if error: check the error type and show the appropriated error message or component -->

  <div v-if="allShowsByGenre && allShowsByGenre.length > 0" class="mb-3 ml-4">
    <div class="my-3">
      <h2 class="text-xl font-bold text-slate-800">{{ getGenera.toString().toUpperCase() }}</h2>
    </div>

    <!-- Add flex container here -->
    <div class="flex flex-wrap -mx-2">
      <div
        class="mr-2 mb-4 p-2"
        style="max-width: 210px"
        v-for="show in allShowsByGenre"
        :key="show.id"
      >
        <!-- todo: refactor this to a reusable component -->
        <a
          @click="redirectToShowDetails(show.id)"
          class="hover:cursor-pointer"
          style="max-height: 400px; max-width: 210px"
        >
          <div style="max-height: 295px; max-width: 210px">
            <image-not-available
              v-if="!show.image || !show.image?.medium"
              class="w-full h-full object-cover rounded"
            />

            <img
              v-else
              :src="show.image?.['medium']"
              :alt="show.name"
              class="w-full h-full object-cover rounded"
            />
          </div>
          <div class="my-1 h-10 p-2 bg-slate-200 rounded">
            <p class="font-bold text-center">{{ show.name }}</p>
          </div>
          <div class="h-8 p-2 bg-slate-200 rounded">
            <star-rating :average="show.rating?.average ?? null" class="text-sm" />
          </div>
        </a>
      </div>
    </div>
  </div>

  <div v-if="allShowsByGenre && allShowsByGenre.length > 0" class="flex justify-center p-3">
    <button
      @click="loadMore"
      class="border py-2 px-4 rounded cursor-pointer bg-slate-200 hover:bg-slate-300"
    >
      Load More
    </button>
  </div>

  <!--  todo: slice allShowsByGenre to get only a few items and add an load more button-->
  <no-data-shows v-if="!allShowsByGenre || allShowsByGenre?.length === 0" />
</template>
