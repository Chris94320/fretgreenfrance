export interface UserRecord {
  id?: number
  username?: string
  phone?: string
  password?: string
}

export interface AuthPayloadPost {
  phone?: string
  password?: string
}

export interface RegisterPayloadPost {
  username?: string
  phone?: string
  password?: string
}

export interface RefreshPayloadPost {
  phone?: string
}

export enum AuthCookie {
  access = 'bdf_access',
  refresh = 'bdf_refresh'
}
