import type { H3Error } from 'h3'
import { LAuthModels } from '../../index'
import useAuthToken from '../../composables/useAuthToken'

export default defineEventHandler(async (event) => {
  try {
    const authToken = useAuthToken()

    const body = (await readBody<LAuthModels.AuthPayloadPost>(event)) || {}
    const { phone, password } = body

    if (!phone || !password) {
      throw createError({ statusCode: 400, statusMessage: 'phone number and password are required' })
    }

    const db = hubDatabase()
    const userDB = await db.prepare('SELECT * FROM users WHERE phone = ?').bind(phone).run()
    const users = userDB.results || []

    const matched = users.find(u => u.phone === phone && u.password === password)

    if (!matched) {
      throw createError({ statusCode: 401, statusMessage: 'Invalid credentials' })
    }

    const token = authToken.encodeTokens(phone)

    setCookie(event, LAuthModels.AuthCookie.access, token.access, { httpOnly: true, sameSite: true })
    setCookie(event, LAuthModels.AuthCookie.refresh, token.refresh, { httpOnly: false, sameSite: true })

    const { password: _removed, ...safeUser } = matched
    return safeUser
  } catch (error: unknown) {
    const err = error as H3Error
    if (err.statusCode) throw err
    throw createError({ statusCode: 500, statusMessage: 'Authentication error', data: String(err?.message || err) })
  }
})
