<script setup lang="ts">
import ImageNotAvailable from "@/components/image-not-available.vue";

</script>
<template>
  <div v-for="x in 5" :key="x" class="py-8">
    <div class="mb-3 ml-4">
        <div class="bg-gray-200 border border-gray-200 w-60 h-4 animate-pulse"></div>
    </div>
    <div class="relative flex items-center">
      <div class="flex overflow-x-auto scroll-smooth scrollbar-hide" ref="carouselContainer">

        <div class="flex-none mr-2 flex-shrink-0" v-for="y in 10"
             :key="y">
            <div style="max-height: 295px; max-width: 210px">
              <image-not-available
                  style="min-height: 295px; min-width: 210px"
                  class="w-full h-full object-cover rounded animate-pulse"/>
            </div>
            <div class="my-1 h-10 p-2 bg-slate-200 rounded">
              <div class="bg-gray-300 border border-gray-200 w-20 h-3 animate-pulse"></div>
            </div>
            <div class="h-8 p-2 bg-slate-200 rounded">
              <div class="bg-gray-300 border border-gray-200 w-20 h-3 animate-pulse"></div>
            </div>

        </div>

      </div>
    </div>
  </div>
</template>