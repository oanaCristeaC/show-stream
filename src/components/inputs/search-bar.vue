<script setup lang="ts">
import * as yup from 'yup'
import { ref } from 'vue'
import { debounce } from '@/utilities/debounce'
import router from '@/router'

const suggestions = ref<yup.InferType<any>>([])
const query = ref<string>('')

const fetchSuggestions = async (event: Event) => {
  const query = (event.target as HTMLInputElement).value
  const response = await fetch(`https://api.tvmaze.com/search/shows?q=${query}`)
  suggestions.value = await response.json()
}

const onInput = (event: Event) => {
  if (query.value.length > 1) {
    fetchSuggestions(event)
  } else {
    suggestions.value = []
  }
}

const selectSuggestion = (suggestion: any) => {
  query.value = suggestion.name
  suggestions.value = []

  router.push({ name: 'show-details', params: { showId: suggestion?.show?.id } })
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
