<script setup lang="ts">
import ImageCarouselIndicator from '@/components/carousels/image-carousel-indicator.vue'
import {DirectionEnum} from '@/enums/direction-enum'
import ImageNotAvailable from '@/components/image-not-available.vue'
import {ref} from 'vue'
import type {ShowInfo} from "@/models/show-model";
import StarRating from "@/components/star-rating.vue";

const props = defineProps<{
  data:
      ShowInfo[]
}>()

const carouselContainer = ref<null | HTMLDivElement>(null)
const windowWidth = ref(window.innerWidth)

window.addEventListener('resize', () => {
  windowWidth.value = window.innerWidth
})

const scrollRight = () => {
  carouselContainer.value?.scrollBy({
    top: 0,
    left: windowWidth.value,
    behavior: 'smooth'
  })
}
const scrollLeft = () => {
  carouselContainer.value?.scrollBy({
    top: 0,
    left: -windowWidth.value,
    behavior: 'smooth'
  })
}
</script>

<template>
  <div class="relative flex items-center">
    <image-carousel-indicator :direction="DirectionEnum.Left" @navigate-direction="scrollLeft"/>
    <div class="flex overflow-x-auto scroll-smooth scrollbar-hide" ref="carouselContainer">
      <div class="flex-none mr-2 flex-shrink-0" v-for="show in props.data"
           :key="show.id">
        <div style="max-height: 295px; max-width: 210px">
          <image-not-available v-if="!show.image || !show.image?.medium" class="w-full h-full object-cover rounded"/>
          <img v-else :src="show.image.medium" :alt="show.name" class="w-full h-full object-cover rounded"/>
        </div>
        <div class="my-1 h-10 p-2 bg-slate-200 rounded">
          <p class="font-bold text-center">{{ show.name }}</p>
        </div>
        <div class="h-8 p-2 bg-slate-200 rounded">
          <star-rating :rating="show.rating.average ?? null" class="text-sm"/>
        </div>
      </div>

    </div>
    <image-carousel-indicator :direction="DirectionEnum.Right" @navigate-direction="scrollRight"/>
  </div>
</template>

<style scoped>

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

</style>
