// https://nuxt.com/docs/api/configuration/nuxt-config
import { fileURLToPath } from 'node:url'

export default defineNuxtConfig({
  extends: [
    './layers/dashboard',
    './layers/auth'
  ],

  modules: [
    '@pinia/nuxt',
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/ui',
    '@nuxt/content',
    '@vueuse/nuxt',
    'nuxt-og-image',
    '@nuxt/test-utils'
  ],

  runtimeConfig: {
    public: {
      auth0Domain: process.env.NUXT_PUBLIC_AUTH0_DOMAIN || 'dev-mvqis1xsjh48m8nv.eu.auth0.com',
      auth0ClientId: process.env.NUXT_PUBLIC_AUTH0_CLIENT_ID || 'miDfSIByCdcd5XtMedah8IFrMCrwY6OO',
      authRedirectUri: process.env.NUXT_PUBLIC_AUTH_REDIRECT_URI || 'http://localhost:3000/dashboard'
    }
  },

  devtools: {
    enabled: true
  },

  alias: {
    '@layers': fileURLToPath(new URL('./layers', import.meta.url))
  },

  css: ['~/assets/css/main.css'],

  routeRules: {
    '/docs': { redirect: '/docs/getting-started', prerender: false }
  },

  compatibilityDate: '2024-07-11',

  nitro: {
    prerender: {
      routes: [
        '/'
      ],
      crawlLinks: true
    }
  },

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  }
})