<script setup lang="ts">
import { LDashboardRoutes } from '..'
import authentificate from '@layers/auth/middleware/authentificate'
import { useAuthStore } from '../../auth/stores/useAuthStore'
import type { TabsItem } from '@nuxt/ui'
import { useSeoMeta } from 'nuxt/app'

definePageMeta({
  layout: 'dashboard',
  ssr: false,
  name: LDashboardRoutes.pagename.dashboard,
  middleware: [
    authentificate
  ]
})

useSeoMeta({
  title: 'Contact',
  description: 'Contact Fret Green France'
})

const authStore = useAuthStore()

const items: TabsItem[] = [
  {
    label: 'All',
    value: 'all'
  },
  {
    label: 'Unread',
    value: 'unread'
  }
]
</script>

<template>
  <div>
    <UDashboardNavbar title="Dashboard">
      <template #trailing>
        <UBadge label="4" variant="subtle" />
      </template>

      <template #right>
        <UTabs :items="items" default-value="all" size="sm" class="w-40" :content="false" />
      </template>
    </UDashboardNavbar>
    <UContainer class="grid gap-4">
      <p>Vous êtes connecté</p>
      <pre>
        {{ authStore.user }}
      </pre>
    </UContainer>
  </div>
</template>
