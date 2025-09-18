import type { H3Error } from 'h3'
import { LAuthModels } from '../../index'
import useAuthServer from '../../composables/useAuthServer'
import useAuthToken from '../../composables/useAuthToken'

export default defineEventHandler(async (event) => {
  try {
    const { accessToken, refreshToken } = useAuthServer(event)
    const authToken = useAuthToken()

    if (!refreshToken || !accessToken) throw createError({ statusCode: 401, statusMessage: 'No token' })

    const body = (await readBody<LAuthModels.RefreshPayloadPost>(event)) || {}
    const { phoneNumber } = body

    if (!phoneNumber) {
      throw createError({ statusCode: 400, statusMessage: 'phone number are required' })
    }

    if (authToken.decodeToken(accessToken) !== authToken.buildToken(phoneNumber, 'access')) {
      throw createError({ statusCode: 401, statusMessage: 'token unvalid' })
    }

    return { ok: true }
  } catch (error: unknown) {
    console.error(error)
    const err = error as H3Error
    throw createError({ statusCode: err.statusCode, message: err.message, statusMessage: 'Invalid refresh token' })
  }
})
