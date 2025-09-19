import crypto from 'crypto'

export default function useAuthToken() {
  const ENC_KEY = 'bf3c199c2470cb477d907b1e0917c17b' // process.env.SECRET_KEY as string
  const IV = '5183666c72eec9e4'

  function encrypt(val: string) {
    try {
      const cipher = crypto.createCipheriv('aes-256-cbc', ENC_KEY, IV)
      let encrypted = cipher.update(val, 'utf8', 'base64')
      encrypted += cipher.final('base64')
      return encrypted
    } catch (error) {
      console.error(error)
      throw createError({ message: error.message })
    }
  }

  function decrypt(encrypted: string) {
    const decipher = crypto.createDecipheriv('aes-256-cbc', ENC_KEY, IV)
    const decrypted = decipher.update(encrypted, 'base64', 'utf8')
    return (decrypted + decipher.final('utf8'))
  }

  function buildToken(content: string, type: 'access' | 'refresh') {
    return `${content}:${type}`
  }

  function encodeTokens(token: string) {
    return {
      access: encrypt(buildToken(token, 'access')),
      refresh: encrypt(buildToken(token, 'refresh'))
    }
  }

  function decodeToken(token: string) {
    return decrypt(token)
  }

  return {
    buildToken,
    encodeTokens,
    decodeToken
  }
}
