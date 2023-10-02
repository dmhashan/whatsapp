<template>
    <div class="flex bg-[#0a1014]">
        <div :class="leftDivClass">
            <Header />
            <FindFriendsView />
        </div>

        <div class="fixed ml-[420px] w-[calc(100vw-420px)] z-10">
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

import { useUserStore } from '../store/user-store';
import { useChatStore } from '../store/chat-store';
const userStore = useUserStore();
const chatStore = useChatStore();
const { selectedUser } = storeToRefs(userStore);

const isMobileView = computed(window.innerWidth > 480);
const leftDivClass = computed(() => isMobileView ? 'fixed w-[100vw] z-10' : 'fixed w-[420px] z-10');
console.log('window.innerWidth', isMobileView);

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
