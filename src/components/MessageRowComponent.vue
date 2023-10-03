<template>
    <div :class="cardClass">
        <div>
            <div v-if="isReceiveMessage" class="flex justify-end space-x-1 w-[calc(100%-50px)] float-right">
                <div class="inline-block bg-green-200 p-2 rounded-md my-1">
                    {{ message }}
                </div>
            </div>
            <div v-else class="flex w-[calc(100%-50px)]">
                <div class="inline-block bg-white p-2 rounded-md my-1">
                    {{ message }}
                </div>
            </div>
        </div>
    </div>
</template>
  
<script setup lang="ts">
import { computed } from 'vue';
import { useAppStore } from '../store/app-store';
import { storeToRefs } from 'pinia';
const appStore = useAppStore();
const { isMobileDevice } = storeToRefs(appStore);

const cardClass = computed(() => 'text-sm ' + (isMobileDevice.value ? 'px-4' : 'px-20'));

defineProps(['isReceiveMessage', 'message'])
</script>
  