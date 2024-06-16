<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import type { ShowModel } from '@/models/show-model'
import { useRoute } from 'vue-router'
import { useShowDetailsStore } from '@/stores/show-detail-store'
import StarRating from '@/components/star-rating.vue'
import type { EpisodeModel } from '@/models/episode-model'
import router from '@/router'
import type { ApiResponseModel } from '@/models/api-response-model'
import { type ErrorModel } from '@/models/errors-model'
import ShowDetailsNoData from '@/views/show-details/components/show-details-no-data.vue'

const {
  params: { showId }
} = useRoute()

const store = useShowDetailsStore()

const showDetails = computed<ApiResponseModel<ShowModel, ErrorModel>>(() => {
  const response = store.showDetails

  if (response.error) {
    redirectToNotFound()
  }

  return response
})
const showEpisodeList = computed<ApiResponseModel<EpisodeModel[], ErrorModel>>(
  () => store.showEpisodeList ?? []
)

const redirectToNotFound = () => {
  router.push({ name: 'not-found' })
}

onMounted(async () => {
  await store.getShowInfoById(Number(showId))

  await store.getShowEpisodeList(Number(showId))
})
</script>

<template>
  <div v-if="showDetails.loading">
    <show-details-no-data />
  </div>
  <div class="container mx-auto p-4" v-else-if="showDetails.data">
    <div class="flex flex-col lg:flex-row">
      <!-- Main Info -->
      <div class="flex-1 lg:w-2/3 p-4">
        <h1 class="text-4xl font-bold mb-4">{{ showDetails.data?.name }}</h1>
        <div class="flex">
          <img
            v-if="showDetails.data?.image?.original"
            :src="showDetails.data?.image.original"
            :alt="showDetails.data?.name ?? ''"
            class="w-1/3 h-auto mr-4"
          />

          <img
            v-else-if="showDetails.data?.image?.medium"
            :src="showDetails.data?.image.medium"
            alt="The Boys"
            class="w-1/3 h-auto mr-4"
          />

          <img
            v-else
            src="../../assets/images/image-placeholder.jpeg"
            alt="Image placeholder"
            class="w-1/3 h-auto mr-4"
          />

          <div>
            <div class="text-lg mb-4" v-html="showDetails.data?.summary"></div>
            <a
              target="blank"
              :href="showDetails.data?.url"
              class="bg-red-600 text-white py-2 px-4 rounded"
              >Watch now</a
            >
          </div>
        </div>
      </div>

      <!--        todo: refactor this part to a component-->

      <!-- Show Info -->
      <div
        class="lg:w-1/3 p-4 bg-gray-100 rounded-lg shadow-lg"
        v-if="showDetails.data && !showDetails.loading"
      >
        <h2 class="text-2xl font-bold mb-4">Show Info</h2>
        <p v-if="showDetails.data?.webChannel?.name">
          <strong>Web channel:</strong> {{ showDetails.data.webChannel.name }}
        </p>
        <p v-if="showDetails.data?.schedule?.days[0] && showDetails.data?.schedule?.time">
          <strong>Schedule:</strong> {{ showDetails.data.schedule.days[0] }} at
          {{ showDetails.data.schedule.time }}
        </p>
        <p v-if="showDetails.data?.status">
          <strong>Status:</strong> {{ showDetails.data.status }}
        </p>
        <p v-if="showDetails.data?.type"><strong>Show Type:</strong> {{ showDetails.data.type }}</p>
        <p v-if="showDetails.data?.genres?.length">
          <strong>Genres:</strong> {{ showDetails.data?.genres.join(' | ') }}
        </p>
        <p v-if="showEpisodeList.data">
          <strong>Episodes ordered:</strong> {{ showEpisodeList.data.length }} episodes
        </p>
        <p v-if="showDetails.data?.officialSite">
          <strong>Official site:</strong>
          <a href="https://www.amazon.com" class="text-blue-500">{{
            showDetails.data.officialSite
          }}</a>
        </p>
        <div class="mt-4">
          <div v-if="showDetails.data?.rating.average" class="flex mt-2">
            <star-rating
              :average="showDetails.data?.rating?.average"
              :votes="showDetails.data?.rating?.votes"
              class="mr-2"
            ></star-rating>
          </div>
        </div>
      </div>
    </div>

    <!--        todo: refactor this part to a component-->
    <!-- Previous Episodes -->
    <div class="mt-8" v-if="showEpisodeList.data">
      <h2 class="text-2xl font-bold mb-4">Previous Episodes</h2>
      <table class="min-w-full bg-white">
        <thead class="bg-gray-200 text-gray-600">
          <tr>
            <th class="text-left py-2 px-4">Episode Name</th>
            <th class="text-left py-2 px-4">Airdate</th>
            <th class="text-left py-2 px-4">Trailer</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(episode, index) in showEpisodeList.data" :key="index" class="border-t">
            <td class="py-2 px-4">
              <a :href="episode?.url ?? ''" class="text-blue-500">{{ episode?.name }}</a>
            </td>
            <td class="py-2 px-4">{{ episode?.airdate }}</td>
            <td class="py-2 px-4">{{ episode?.trailer }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
