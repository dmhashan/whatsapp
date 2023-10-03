<template>
    <div class="flex bg-[#0a1014]">
        <div v-if="isLeftDivVisible" :class="leftDivClass">
            <Header />
            <FindFriendsView />
        </div>

        <div v-if="isRighDivVisible" :class="righDivClass">
            <MessageView v-if="!isEmpty(selectedUser)" />
            <WelcomeView v-else />
        </div>
    </div>
</template>

<script setup lang="ts">
import MessageView from '../components/MessageView.vue';
import FindFriendsView from '../components/FindFriendsView.vue';
import Header from '../components/Header.vue';
import WelcomeView from '../components/WelcomeView.vue';

import { computed, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { isEmpty } from 'lodash';

import { useAppStore } from '../store/app-store';
import { useUserStore } from '../store/user-store';
import { useChatStore } from '../store/chat-store';
const appStore = useAppStore();
const userStore = useUserStore();
const chatStore = useChatStore();
const { isMobileDevice } = storeToRefs(appStore);
const { selectedUser } = storeToRefs(userStore);

const leftDivClass = computed(() => isMobileDevice.value ? 'fixed w-[100vw] z-10' : 'fixed w-[420px] z-10');
const righDivClass = computed(() => isMobileDevice.value ? 'fixed w-[100vw] z-10' : 'fixed ml-[420px] w-[calc(100vw-420px)] z-10');
const isLeftDivVisible = computed(() => !isMobileDevice.value || isEmpty(selectedUser.value));
const isRighDivVisible = computed(() => !isMobileDevice.value || !isEmpty(selectedUser.value));

onMounted(async () => {
    try {
        await userStore.getAllUsers();
        await chatStore.fetchUserChat();
        userStore.selectUser({});
    } catch (error) {
        console.log(error);
    }
})
</script>

<style lang="scss" scoped></style>
