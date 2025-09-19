import { defineNuxtRouteMiddleware, navigateTo } from 'nuxt/app'
import useAuthClient from '../composables/useAuthClient'
import { LAuthRoutes } from '..'

const authentificate = defineNuxtRouteMiddleware(async () => {
  console.info('[middleware][authentificate] start')
  const { isAuthentificate } = useAuthClient()

  if (isAuthentificate.value) {
    console.info('[middleware][authentificate] user allowed !')
  } else {
    console.info('[middleware][authentificate] user denied !')
    return await navigateTo({ name: LAuthRoutes.pagename.authentificate })
  }
})

export default authentificate
