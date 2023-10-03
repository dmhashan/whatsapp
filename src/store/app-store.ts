import { defineStore } from 'pinia'
export const useAppStore = defineStore('app', {
    state: () => ({
        isMobileDevice: false,
        viewWidth: 800,
        viewHeight: 600
    }),
    actions: {
        async setup() {
            window.addEventListener("resize", () => {
                this.isMobileDevice = window.innerWidth < 600;
                this.viewWidth = window.innerWidth;
                this.viewHeight = window.innerHeight;    
            });
        },
    },
    persist: true
})