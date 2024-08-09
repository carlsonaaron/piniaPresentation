import type { Toast } from '@/models/toast.model'
import { defineStore } from 'pinia'

type MainStoreState = {
  isLoadingArray: Array<boolean>
  toasts: Array<Toast>
}

const useMainStore = defineStore({
  id: 'mainStore',
  state: () =>
    ({
      isLoadingArray: [],
      toasts: []
    }) as MainStoreState,
  getters: {
    itemsLoading: (state) => state.isLoadingArray.length,
    isLoading: (state) => state.isLoadingArray.length > 0,
    visibleToasts: (state) => state.toasts.filter((x) => !x.isRead),
    readToasts: (state) => state.toasts.filter((x) => x.isRead)
  },
  actions: {
    startLoading() {
      this.isLoadingArray.push(true)
    },
    doneLoading() {
      this.isLoadingArray.pop()
    },
    addToast(message: string) {
      const uid = Date.now().toString(36) + Math.random().toString(36).substr(2)
      this.toasts.push({ id: uid, message, isRead: false })
    },
    removeToast(toastId: string) {
      const match = this.toasts.find((x) => x.id === toastId)
      if (!match) {
        return
      }
      match.isRead = true
    }
  }
})

export default useMainStore
