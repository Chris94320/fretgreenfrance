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

  async function register(body: LAuthModels.RefreshPayloadPost) {
    await $fetch<LAuthModels.UserRecord>(runtimeConfig.public.baseUrl + LAuthRoutes.api.register, { method: 'POST', body })
  }

  async function authentificate(body: LAuthModels.AuthPayloadPost) {
    return await $fetch<LAuthModels.UserRecord>(runtimeConfig.public.baseUrl + LAuthRoutes.api.authentificate, { method: 'POST', body })
  }

  async function refresh() {
    const body: LAuthModels.RefreshPayloadPost = {
      phone: authStore.user.phone
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
      phone: authStore.user.phone
    }
    await $fetch(runtimeConfig.public.baseUrl + LAuthRoutes.api.validate, { method: 'POST', credentials: 'include', body })
  }

  return {
    register,
    authentificate,
    refresh,
    validate,
    isAuthentificate,
    disconnect
  }
}
