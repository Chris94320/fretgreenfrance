import type { H3Error } from 'h3'
import { LAuthModels } from '../../index'
import useAuthServer from '../../composables/useAuthServer'
import useAuthToken from '../../composables/useAuthToken'
import CryptoJS from 'crypto-js'

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

    const tokens = authToken.encodeTokens(phoneNumber)

    console.log('decode', authToken.decodeToken(refreshToken))
    // console.log('token', refreshToken)
    console.log('build', authToken.buildToken(phoneNumber, 'refresh'))

    if (authToken.decodeToken(refreshToken) !== authToken.buildToken(phoneNumber, 'refresh')) {
      throw createError({ statusCode: 401, statusMessage: 'token unvalid' })
    }

    setCookie(event, LAuthModels.AuthCookie.access, tokens.access, { httpOnly: true, sameSite: true })
    setCookie(event, LAuthModels.AuthCookie.refresh, tokens.refresh, { httpOnly: true, sameSite: true })

    return { ok: true }
  } catch (error: unknown) {
    console.error(error)
    const err = error as H3Error
    throw createError({ statusCode: err.statusCode, message: err.message, statusMessage: 'Invalid refresh token' })
  }
})
