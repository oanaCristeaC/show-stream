<script setup lang="ts">
import ImageSlider from '@/components/carousels/image-slider.vue'
import {onMounted, ref} from "vue";
import type {ShowInfo} from "@/models/show-model";
import {useShowsInfoStore} from "@/stores/show-store";

const store = useShowsInfoStore()

const shows = ref<ShowInfo[] | null>([])

onMounted(async () => {
  shows.value = await store.getShowsInfo
})


</script>

<template>
  <div
      class="py-8">
    <div class="mb-3 ml-4">
      <h2 class="text-xl font-bold text-slate-800">Show genera</h2>
    </div>
    <image-slider/>
        {{ shows }}
  </div>

</template>
