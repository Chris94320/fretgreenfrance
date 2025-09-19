<script setup lang="ts">
import { LDashboardRoutes } from '..'
import authentificate from '@layers/auth/middleware/authentificate'
import { TabsItem } from '@nuxt/ui'

definePageMeta({
  layout: 'dashboard',
  ssr: false,
  name: LDashboardRoutes.pagename.offers,
  middleware: [
    authentificate
  ]
})

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
    <UDashboardNavbar title="Offres">
      <template #trailing>
        <UBadge label="4" variant="subtle" />
      </template>

      <template #right>
        <UTabs :items="items" default-value="all" size="sm" class="w-40" :content="false" />
      </template>
    </UDashboardNavbar>
    <UContainer class="grid gap-4">
      <p>liste des offres</p>
    </UContainer>
  </div>
</template>
