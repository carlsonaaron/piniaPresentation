<template>
  <header>
    <Toasts />
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>

        <div class="demo-container">
          <div class="demo">
            <div class="title">Loader Demo</div>
            <div class="buttons-group">
              <button @click="asyncCall1()" :disabled="isLoading1">{{ asyncCall1Label }}</button>
              <button @click="asyncCall2()" :disabled="isLoading2">{{ asyncCall2Label }}</button>
              <button @click="asyncCall3()" :disabled="isLoading3">{{ asyncCall3Label }}</button>
            </div>

            <Loader />
          </div>

          <div class="demo">
            <div class="title">Toast Demo</div>
            <form class="toast-form" @submit.prevent="sendToast()">
              <input type="text" v-model="toastMessage" placeholder="Enter a message" />
              <button type="submit">Send</button>
            </form>
            <div>{{ toastsSummary }}</div>
          </div>

        </div>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import Loader from './components/Loader.vue';
import Toasts from './components/Toasts.vue';

import useMainStore from './stores/main.store'

const mainStore = useMainStore();
const toastsSummary = ref('');

// Loader Demo
const isLoading1 = ref(false);
const asyncCall1Label = computed(() => isLoading1.value ? 'Loading...' : 'Start Loader Test');
const asyncCall1 = () => {
  isLoading1.value = true;
  mainStore.startLoading()

  setTimeout(() => {
    isLoading1.value = false;
    mainStore.doneLoading();
  }, 2000)
}

const isLoading2 = ref(false);
const asyncCall2Label = computed(() => isLoading2.value ? 'Loading...' : 'Start Loader Test');
const asyncCall2 = () => {
  isLoading2.value = true;
  mainStore.startLoading()

  setTimeout(() => {
    isLoading2.value = false;
    mainStore.doneLoading();
  }, 2000)
}

const isLoading3 = ref(false);
const asyncCall3Label = computed(() => isLoading3.value ? 'Loading...' : 'Start Loader Test');
const asyncCall3 = () => {
  isLoading3.value = true;
  mainStore.startLoading();

  setTimeout(() => {
    isLoading3.value = false;
    mainStore.doneLoading();
  }, 2000)
}

// Toast Demo
const toastMessage = ref('Example toast message...');
const sendToast = () => {
  mainStore.addToast(toastMessage.value);
}

// OnAction Demo
mainStore.$onAction(({ after, name }) => {
  after(() => {
    if (name == 'addToast' || name == 'removeToast') {
      toastsSummary.value = `${mainStore.readToasts.length} read - ${mainStore.visibleToasts.length} unread`;
    }
  })
});
</script>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}

.demo-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  margin-top: 2rem;
}

.demo {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  width: 440px;
  border: 1px solid #ccc;
  padding: 1rem;
}

.buttons-group {
  display: flex;
  justify-content: start;
  gap: 1rem;
  width: 100%;
  margin-top: 2rem;
}

.buttons-group button {
  width: 140px;
}

button {
  padding: 6px 12px;
}

.toast-form {
  display: flex;
  gap: 1rem;
  width: 100%;
  justify-content: center;
}

.toast-form input {
  padding: 6px 12px;
  flex-grow: 1;
}
</style>
