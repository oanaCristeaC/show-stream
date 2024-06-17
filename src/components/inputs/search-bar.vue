<script setup lang="ts">
import { ref } from 'vue'
import { debounce } from '@/utilities/debounce'
import router from '@/router'
import type { ShowModel } from '@/models/show-model'

const suggestions = ref<{ show: ShowModel }[]>([])
const query = ref<string | null>()

const fetchSuggestions = async (event: Event) => {
  const query = (event.target as HTMLInputElement).value

  //todo: move this to the parent component and use the existing fetcher
  const response = await fetch(`https://api.tvmaze.com/search/shows?q=${query}`)
  suggestions.value = await response.json()
}

const onInput = (event: Event) => {
  if (query.value !== null) {
    fetchSuggestions(event)
  } else {
    suggestions.value = []
  }
}

const navigateToShow = async (showId: any) => {
  await router.replace({ name: 'show-details', params: { showId: showId } })
  window.location.reload()
  //router.go(0) // force reload the page since the route is the same
}

const selectSuggestion = (suggestion: { show: ShowModel }) => {
  query.value = null
  suggestions.value = []

  navigateToShow(suggestion.show.id)
}

const debouncedOnInput = debounce(onInput, 100)
</script>

<template>
  <!--  todo: implement input validations -->
  <!--  todo: implement loading on search -->
  <input
    type="text"
    v-model="query"
    @input="debouncedOnInput"
    placeholder="Search..."
    class="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-primary-dark dark:text-primary-light"
  />
  <ul v-if="suggestions?.length">
    <li
      v-for="(suggestion, index) in suggestions"
      :key="index"
      @click="selectSuggestion(suggestion)"
    >
      {{ suggestion?.show?.name }}
    </li>
  </ul>
</template>
<style scoped>
/*
due to time constraints, I have implemented the styles here
 */
ul {
  list-style-type: none;
  padding-left: 0;
  margin: 0;
  position: absolute;
  background-color: white;
  z-index: 10;
  min-width: 200px;
}

li {
  padding: 0.5rem;
  cursor: pointer;
}

li:hover {
  background-color: #f9f9f9;
}
</style>
