// https://nuxt.com/docs/api/configuration/nuxt-config
import { fileURLToPath } from 'node:url'

export default defineNuxtConfig({
  extends: [
    './layers/dashboard',
    './layers/auth'
  ],

  modules: [
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt',
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/ui',
    '@nuxt/content',
    '@vueuse/nuxt',
    'nuxt-og-image',
    '@nuxt/test-utils',
    '@nuxthub/core'
  ],

  hub: {
    database: true,
    blob: true,
  },

  runtimeConfig: {
    secretKey: process.env.SECRET_KEY || 'secretpasskey',
    public: {
      baseUrl: process.env.NUXT_BASE_URL
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
      autoSubfolderIndex: false,
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