<script setup lang="ts">
import { RouterView } from 'vue-router'
import { onMounted} from "vue";

import {useShowsInfoStore} from "@/stores/show-store";

const store = useShowsInfoStore()

onMounted(async () => {
   await store.processAllShowsInfoData()
})
</script>

<template>
  <router-view />
</template>
