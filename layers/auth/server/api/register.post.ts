import type { H3Error } from 'h3'
import type { LAuthModels } from '../../index'

export default defineEventHandler(async (event) => {
  try {
    const body = (await readBody<LAuthModels.RegisterPayloadPost>(event)) || {}
    const { username, phone, password } = body

    if (!username || !phone || !password) {
      throw createError({ statusCode: 400, statusMessage: 'phone number and password are required' })
    }

    const id = crypto.randomUUID()
    const db = hubDatabase()

    const query = await db.prepare('INSERT INTO users (createdAt, id, username, phone, password) VALUES(CURRENT_TIMESTAMP, ?1, ?2, ?3, ?4)')
      .bind(id, username, phone, password).run()

    console.log('userInsert', query)

    return { ok: true }
  } catch (error: unknown) {
    const err = error as H3Error
    if (err.statusCode) throw err
    throw createError({ statusCode: 500, statusMessage: 'Authentication error', data: String(err?.message || err) })
  }
})
