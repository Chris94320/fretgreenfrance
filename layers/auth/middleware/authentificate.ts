import { defineNuxtRouteMiddleware, navigateTo } from 'nuxt/app'
import useAuthClient from '../composables/useAuthClient'
import { LAuthRoutes } from '..'
import { useAuthStore } from '../stores/useAuthStore'

const authentificate = defineNuxtRouteMiddleware(async () => {
  console.info('[middleware][authentificate] start')
  const authClient = useAuthClient()
  const authStore = useAuthStore()
  if (authClient.isAuthentificate.value && authStore.user.id) {
    console.info('[middleware][authentificate] user allowed !')
  } else {
    console.info('[middleware][authentificate] user denied !')
    return await navigateTo({ name: LAuthRoutes.pagename.authentificate }, { redirectCode: 401 })
  }
})

export default authentificate
