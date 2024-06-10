<script setup lang="ts">
import ImageCarouselIndicator from '@/components/carousels/image-carousel-indicator.vue'
import { DirectionEnum } from '@/enums/direction-enum'
import ImageNotAvailable from '@/components/image-not-available.vue'
import { ref } from 'vue'

const items = [
  // Example data
  { id: 1, image: 'https://via.placeholder.com/150x200?text=Item+1', title: 'Item 1' },
  { id: 2, title: 'Item 2' },
  { id: 3, image: 'https://via.placeholder.com/150x200?text=Item+3', title: 'Item 3' },
  { id: 3, image: 'https://via.placeholder.com/150x200?text=Item+4', title: 'Item 4' },
  { id: 5, image: 'https://via.placeholder.com/150x200?text=Item+5', title: 'Item 5' },
  { id: 6, image: 'https://via.placeholder.com/150x200?text=Item+6', title: 'Item 6' },
  { id: 7, image: 'https://via.placeholder.com/150x200?text=Item+7', title: 'Item 7' },
  { id: 8, image: 'https://via.placeholder.com/150x200?text=Item+8', title: 'Item 8' },
  { id: 9, image: 'https://via.placeholder.com/150x200?text=Item+9', title: 'Item 9' },
  { id: 10, image: 'https://via.placeholder.com/150x200?text=Item10', title: 'Item 10' },
  { id: 12, image: 'https://via.placeholder.com/150x200?text=Item+12', title: 'Item 12' },
  { id: 13, image: 'https://via.placeholder.com/150x200?text=Item+13', title: 'Item 13' },
  { id: 14, image: 'https://via.placeholder.com/150x200?text=Item+14', title: 'Item 14' },
  { id: 15, image: 'https://via.placeholder.com/150x200?text=Item+15', title: 'Item 15' },
  { id: 3, title: 'Item 2' }
  // Add more items as needed
]

const carouselContainer = ref<null | HTMLDivElement>(null)
const windowWidth = ref(window.innerWidth)

window.addEventListener('resize', () => {
  windowWidth.value = window.innerWidth
})

const scrollRight = () => {
  console.log(windowWidth.value)
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
    <image-carousel-indicator :direction="DirectionEnum.Left" @navigate-direction="scrollLeft" />
    <div class="flex overflow-x-auto scroll-smooth scrollbar-hide" ref="carouselContainer">
      <div class="flex-none w-64 h-36 mr-2 flex-shrink-0" v-for="item in items" :key="item.id">
        <image-not-available v-if="!item.image" class="w-full h-full object-cover rounded" />
        <img :src="item.image" :alt="item.title" class="w-full h-full object-cover rounded" />
      </div>
    </div>
    <image-carousel-indicator :direction="DirectionEnum.Right" @navigate-direction="scrollRight" />
  </div>
</template>

<style scoped>
/* Hide the scrollbar
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
*/
</style>
