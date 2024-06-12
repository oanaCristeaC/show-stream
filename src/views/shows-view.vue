<script setup lang="ts">
import ImageSlider from '@/components/carousels/image-slider.vue'
import {computed, onMounted, ref} from "vue";
import {useShowsInfoStore} from "@/stores/show-store";

const store = useShowsInfoStore()

const showsByGenera = computed(() => store.showsByGenre)

onMounted(async () => {
   await store.getShowsByGenre()
})

</script>

<template>
  <div v-for="(showsInfo, genera) in showsByGenera" class="py-8">
    <div class="mb-3 ml-4">
      <h2 class="text-xl font-bold text-slate-800">{{ genera }}</h2>
    </div>
    <image-slider :data="showsInfo"/>
  </div>

</template>
