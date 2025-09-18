import { LAuthModels, LAuthRoutes } from '..'
import { computed } from 'vue'
import { useAuthStore } from '../stores/useAuthStore'

export default function useAuthClient() {
  const refreshCookie = useCookie(LAuthModels.AuthCookie.refresh)
  const userAuth = useAuthStore()

  const isAuthentificate = computed<boolean>(() => {
    return !!refreshCookie.value
  })

  async function refresh() {
    const body: LAuthModels.RefreshPayloadPost = {
      phoneNumber: userAuth.user.phoneNumber
    }

    await $fetch('http://localhost:3000' + LAuthRoutes.api.refresh, { method: 'POST', credentials: 'include', body })
  }

  async function disconnect() {
    await $fetch('http://localhost:3000' + LAuthRoutes.api.disconnect, { method: 'POST', credentials: 'include' })
  }

  return {
    refresh,
    disconnect,
    isAuthentificate
  }
}
