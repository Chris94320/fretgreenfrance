import { defineStore } from 'pinia'
import type { UserRecord } from '../types/models.interface'

export const useAuthStore = defineStore('auth', {
  persist: {
    key: 'bdf_auth'
  },
  state: () => ({
    user: {
      id: undefined,
      username: undefined,
      phoneNumber: undefined,
      password: undefined
    } as UserRecord
  }),
  actions: {
    setUser(user: UserRecord) {
      this.user = { ...user }
    }
  }
})
