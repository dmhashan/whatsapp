<template>
    <div class="h-[100vh]">
        <div class="w-full bg">
            <div class="w-full">
                <div :class="headerClass">
                    <div class="flex items-center">
                        <ArrowBackIcon @click="userStore.selectUser({})" class="cursor-pointer mx-2" fillColor="#515151" />
                        <img class="rounded-full ml-1 w-10" src="https://random.imagecdn.app/100/100" alt="">
                        <div class="text-gray-900 ml-4">
                            {{ selectedUser.name }}
                        </div>
                    </div>

                    <div class="flex items-center justify-center">
                        <MagnifyIcon class="mr-6" fillColor="#515151" />
                        <DotsVerticalIcon class="mr-6" fillColor="#515151" />
                    </div>
                </div>
            </div>

            <div id="MessagesSection" :class="bodyClass">
                <MessageRowComponent v-for="chat in chats" :isReceiveMessage="chat.senderId == currentUser.id" :message="chat.message"/>
            </div>

            <div :class="footerClass">
                <div class="flex items-center justify-center">
                    <EmoticonExcitedOutlineIcon :size="27" fillColor="#515151" class="mx-1.5" />
                    <PaperclipIcon :size="27" fillColor="#515151" class="mx-1.5 mr-3" />
                    <input v-model="messageRef" @keyup.enter="sendMessage" class="
                        mr-1
                        shadow
                        apperance-none
                        rounded-lg
                        w-full
                        py-3
                        px-4
                        text-gray-700
                        leading-tight
                        focus:outline-none 
                        focus:shadow-outline
                    " autocomplete="off" type="text" placeholder="Message">
                    <button @click="sendMessage" class="ml-3 p-2 w-12 flex items-center justify-center">
                        <SendIcon fillColor="#515151" />
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import DotsVerticalIcon from 'vue-material-design-icons/DotsVertical.vue';
import MagnifyIcon from 'vue-material-design-icons/Magnify.vue';
import EmoticonExcitedOutlineIcon from 'vue-material-design-icons/EmoticonExcitedOutline.vue';
import PaperclipIcon from 'vue-material-design-icons/Paperclip.vue';
import SendIcon from 'vue-material-design-icons/Send.vue';
import ArrowBackIcon from 'vue-material-design-icons/ArrowLeft.vue';
import moment from 'moment';
import { useUserStore } from '../store/user-store';
import { useChatStore } from '../store/chat-store';
import { storeToRefs } from 'pinia';
import { ref, computed } from 'vue';
import { isEmpty } from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../firebase-init'
import {
    setDoc,
    doc,
} from 'firebase/firestore';
import MessageRowComponent from './MessageRowComponent.vue';
import { useAppStore } from '../store/app-store';

let messageRef = ref('')
const appStore = useAppStore();
const userStore = useUserStore();
const chatStore = useChatStore();
const { isMobileDevice } = storeToRefs(appStore);
const { selectedUser, currentUser } = storeToRefs(userStore);

const sendMessage = async () => {
    if (isEmpty(messageRef.value)) return;

    try {
        const id = uuidv4();
        const message = messageRef.value.slice();
        const createdAt = moment().unix();
        const receiverId = selectedUser.value.id;
        const senderId = currentUser.value.id;

        messageRef.value = '';

        await setDoc(doc(db, "chats", id), { id, senderId, receiverId, message, createdAt });
    } catch (error) {
        alert('Unknown error');
        throw error;
    }
}

const chats = computed(() => chatStore.userChats && chatStore.userChats.filter(chat => chat.senderId == selectedUser.value.id || chat.receiverId == selectedUser.value.id));
const headerClass = computed(() => 'bg-[#F0F0F0] fixed z-10 flex justify-between items-center px-2 py-2 ' + (isMobileDevice.value ? 'w-full' : 'min-w-[calc(100vw-420px)]'));
const bodyClass = computed(() => 'pt-20 pb-8 z-[-1] h-[calc(100vh-65px)] overflow-auto fixed touch-auto ' + (isMobileDevice.value ? 'w-full' : 'w-[calc(100vw-420px)]'));
const footerClass = computed(() => 'p-2.5 z-10 bg-[#F0F0F0] fixed bottom-0 ' + (isMobileDevice.value ? 'w-full' : 'w-[calc(100vw-420px)]'));
</script>

<style>
.bg {
    background: url('../assets/bg.jpg') no-repeat fixed;
    background-size: cover;
    /* width: 100%; */
    height: 100%;
    position: fixed;
}
</style>