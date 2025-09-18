import { LAuthModels } from '..'
import { getCookie, deleteCookie, type H3Event } from 'h3'

export default function useAuthServer(event: H3Event) {
  const accessToken = getCookie(event, LAuthModels.AuthCookie.access)
  const refreshToken = getCookie(event, LAuthModels.AuthCookie.refresh)

  function disconnect() {
    deleteCookie(event, LAuthModels.AuthCookie.access)
    deleteCookie(event, LAuthModels.AuthCookie.refresh)
  }

  return {
    accessToken,
    refreshToken,
    disconnect
  }
}
