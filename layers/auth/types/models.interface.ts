export interface UserRecord {
  id?: number
  username?: string
  phoneNumber?: string
  password?: string
}

export interface AuthPayloadPost {
  phoneNumber?: string
  password?: string
}

export interface RefreshPayloadPost {
  phoneNumber?: string
}

export enum AuthCookie {
  access = 'bdf_access',
  refresh = 'bdf_refresh'
}
