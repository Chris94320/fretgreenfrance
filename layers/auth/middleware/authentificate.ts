import { defineNuxtRouteMiddleware, navigateTo } from 'nuxt/app'
import useAuthClient from '../composables/useAuthClient'
import { LAuthRoutes } from '..'

const authentificate = defineNuxtRouteMiddleware(async () => {
  console.info('[middleware][authentificate] start')
  const authClient = useAuthClient()
  if (!authClient.isAuthentificate.value) {
    console.info('[middleware][authentificate] user deny')
    return await navigateTo({ name: LAuthRoutes.pagename.authentificate }, { redirectCode: 401 })
  } else {
    console.info('[middleware][authentificate] user allow')
  }
})

export default authentificate
