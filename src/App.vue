<template>
  <router-view />
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useUserStore } from './store/user-store'
import { useAppStore } from './store/app-store'

const userStore = useUserStore();
const appStore = useAppStore();

onMounted(async () => {
  try {
    appStore.setup();
    await userStore.fetchCurrentUser();
  } catch (error) {
    console.log(error)
  }
})
</script>