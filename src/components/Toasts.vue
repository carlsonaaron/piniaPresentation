<template>
    <div class="container">
        <div v-for="toast in toasts" :key="toast.id" class="toast">
            <div>{{ toast.message }}</div>
            <button class="close" @click="mainStore.removeToast(toast.id)">X</button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import useMainStore from '../stores/main.store'
const mainStore = useMainStore();

const toasts = computed(() => mainStore.visibleToasts);
</script>

<style scoped>
.container {
    position: fixed;
    top: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
}

.container .toast {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    padding-right: 1.4rem;
    background: #333;
    color: #fff;
    border-radius: 5px;
    width: 300px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}

.toast button.close {
    background-color: #222;
    color: white;
}
</style>