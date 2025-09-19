import { LAuthModels, LAuthRoutes } from '..'
import { computed } from 'vue'
import { useAuthStore } from '../stores/useAuthStore'

export default function useAuthClient() {
  const refreshCookie = useCookie(LAuthModels.AuthCookie.refresh)
  const authStore = useAuthStore()
  const runtimeConfig = useRuntimeConfig()

  const isAuthentificate = computed<boolean>(() => {
    return !!refreshCookie.value && !!authStore.user.id
  })

  async function refresh() {
    const body: LAuthModels.RefreshPayloadPost = {
      phoneNumber: authStore.user.phoneNumber
    }

    await $fetch(runtimeConfig.public.baseUrl + LAuthRoutes.api.refresh, { method: 'POST', credentials: 'include', body })
  }

  async function disconnect() {
    await $fetch(runtimeConfig.public.baseUrl + LAuthRoutes.api.disconnect, { method: 'POST', credentials: 'include' })
    authStore.resetUser()
    navigateTo({ name: LAuthRoutes.pagename.authentificate })
  }

  async function validate() {
    const body: LAuthModels.RefreshPayloadPost = {
      phoneNumber: authStore.user.phoneNumber
    }

    await $fetch(runtimeConfig.public.baseUrl + LAuthRoutes.api.validate, { method: 'POST', credentials: 'include', body })
  }

  return {
    refresh,
    disconnect,
    validate,
    isAuthentificate
  }
}
