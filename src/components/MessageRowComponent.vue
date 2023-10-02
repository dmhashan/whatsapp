<template>
    <div class="px-20 text-sm">
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
defineProps(['isReceiveMessage', 'message'])

</script>
  