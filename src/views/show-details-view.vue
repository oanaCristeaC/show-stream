<script setup lang="ts">

import {computed, onMounted, ref} from "vue";
import type {ShowModel} from "@/models/show-model";
import {useRoute} from "vue-router";
import {useShowDetailsStore} from "@/stores/show-detail-store";
import StarRating from "@/components/star-rating.vue";
import type {EpisodeModel} from "@/models/episode-model";

const {
  params: {showId},
} = useRoute()

const store = useShowDetailsStore()

const showDetails = computed(() => store.showDetails as ShowModel)
const showEpisodeList = computed<EpisodeModel[]>(() => store.showEpisodeList ?? [])

onMounted(async () => {
  await store.getShowInfoById(Number(showId))
  await store.getShowEpisodeList(Number(showId))
})

</script>

<template>
  <!-- todo: if error: check the error type and show the appropriated error message or component -->
  <!-- todo:  create placeholders for the images and the summary when date is not yet available -->
    <div class="container mx-auto p-4">
      <div class="flex flex-col lg:flex-row">

        <!-- Main Info -->
        <div class="flex-1 lg:w-2/3 p-4">
          <h1 class="text-4xl font-bold mb-4">{{ showDetails?.name }}</h1>
          <div class="flex">

            <img v-if="showDetails?.image.original"
                 :src="showDetails?.image.original" alt="The Boys" class="w-1/3 h-auto mr-4"/>

            <img v-else-if="showDetails?.image.medium"
                 :src="showDetails?.image.medium" alt="The Boys" class="w-1/3 h-auto mr-4"/>

            <img v-else
                 src="@/assets/images/image-placeholder.jpeg"
                 alt="Image placeholder" class="w-1/3 h-auto mr-4">


            <div>
              <div class="text-lg mb-4" v-html="showDetails?.summary">

              </div>
              <a
                  target="blank"
                  :href="showDetails?.url"
                  class="bg-red-600 text-white py-2 px-4 rounded">Watch now</a>
            </div>
          </div>
        </div>

<!--        todo: refactor this part to a component-->

        <!-- Show Info -->
        <div class="lg:w-1/3 p-4 bg-gray-100 rounded-lg shadow-lg">
          <h2 class="text-2xl font-bold mb-4">Show Info</h2>
          <p v-if="showDetails?.webChannel"><strong>Web channel:</strong> {{ showDetails.webChannel }}</p>
          <p v-if="showDetails?.schedule"><strong>Schedule:</strong>
            {{ showDetails.schedule?.days[0] }} at {{ showDetails.schedule?.time }}
          </p>
          <p v-if="showDetails?.status"><strong>Status:</strong> {{ showDetails.status }}</p>
          <p v-if="showDetails?.type"><strong>Show Type:</strong> {{ showDetails?.type }}</p>
          <p v-if="showDetails?.genres?.length"><strong>Genres:</strong> {{ showDetails?.genres.join(' | ') }}</p>
          <p v-if="showEpisodeList?.length > 0"><strong>Episodes ordered:</strong> {{ showEpisodeList?.length }} episodes</p>
          <p v-if="showDetails?.officialSite"><strong>Official site:</strong> <a href="https://www.amazon.com" class="text-blue-500">www.amazon.com</a>
          </p>
          <div class="mt-4">
            <div v-if="showDetails?.rating.average" class="flex mt-2">
              <star-rating
                  :average=" showDetails?.rating?.average"
                  :votes="showDetails?.rating?.votes"
                  class="mr-2"></star-rating>
            </div>
          </div>
        </div>
      </div>

      <!--        todo: refactor this part to a component-->
      <!-- Previous Episodes -->
      <div class="mt-8" v-if="showEpisodeList?.length > 0">
        <h2 class="text-2xl font-bold mb-4">Previous Episodes</h2>
        <table class="min-w-full bg-white">
          <thead class="bg-gray-200 text-gray-600">
          <tr>
            <th class="text-left py-2 px-4 ">Episode Name</th>
            <th class="text-left py-2 px-4">Airdate</th>
            <th class="text-left py-2 px-4">Trailer</th>
          </tr>
          </thead>
          <tbody>
          <tr
              v-for="(episode, index) in showEpisodeList" :key="index"
              class="border-t" >
            <td class="py-2 px-4">
              <a :href="episode?.url ?? ''" class="text-blue-500">{{ episode?.name }}</a>
            </td>
            <td class="py-2 px-4">{{ episode?.airdate }}</td>
            <td class="py-2 px-4">{{ episode?.trailer  }}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
</template>