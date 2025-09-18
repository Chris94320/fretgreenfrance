import type { H3Error } from 'h3'
import useAuthServer from '../../composables/useAuthServer'

export default defineEventHandler(async (event) => {
  try {
    const { accessToken, refreshToken, disconnect } = useAuthServer(event)

    disconnect()

    if (!refreshToken || !accessToken) throw createError({ statusCode: 401, statusMessage: 'No token' })

    return { ok: true }
  } catch (error: unknown) {
    const err = error as H3Error
    throw createError({ statusCode: err.statusCode, statusMessage: 'Invalid refresh token' })
  }
})
