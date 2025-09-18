import CryptoJS from 'crypto-js'

export default function useAuthToken() {
  const key = 'passphrasekey'

  function buildToken(content: string, type: 'access' | 'refresh') {
    return `${content}:${type}`
  }

  function encodeTokens(token: string) {
    return {
      access: CryptoJS.AES.encrypt(buildToken(token, 'access'), key).toString(),
      refresh: CryptoJS.AES.encrypt(buildToken(token, 'refresh'), key).toString()
    }
  }

  function decodeToken(token: string) {
    return CryptoJS.AES.decrypt(token, key).toString(CryptoJS.enc.Utf8)
  }

  return {
    buildToken,
    encodeTokens,
    decodeToken
  }
}
