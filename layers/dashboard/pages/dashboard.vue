<script setup lang="ts">
import { LDashboardRoutes } from '..'
import useAuthClient from '@layers/auth/composables/useAuthClient'
import authentificate from '@layers/auth/middleware/authentificate'
import { useAuthStore } from '../../auth/stores/useAuthStore'

definePageMeta({
  layout: 'app',
  name: LDashboardRoutes.pagename.dashboard,
  middleware: [
    authentificate
  ]
})

const authClient = useAuthClient()
const authStore = useAuthStore()
</script>

<template>
  <div class="grid gap-4">
    <p>Vous êtes connecté</p>
    <pre>
      {{ authStore.user }}
    </pre>
    <UButton
      @click="authClient.refresh"
      label="Refresh token"
    />
    <UButton
      @click="authClient.disconnect"
      label="Disconnect"
    />
  </div>
</template>
