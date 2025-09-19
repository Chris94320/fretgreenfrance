<script setup lang="ts">
import { useAuthClient } from '#imports'
import { LAuthRoutes } from '~~/layers/auth';
import { LDashboardRoutes } from '~~/layers/dashboard';

const { isAuthentificate } = useAuthClient()

const items = computed(() => [
  {
    label: 'Devis',
    to: '/'
  }, {
    label: 'Services',
    to: '/services'
  }, {
    label: 'Groupement',
    to: '/groupement'
  }, {
    label: 'Actualités',
    to: '/actualites'
  },
  {
    label: 'Histoire',
    to: '/histoire'
  }
])
</script>

<template>
  <UHeader>
    <template #left>
      <NuxtLink to="/">
        <AppLogo class="w-auto h-6 shrink-0" />
      </NuxtLink>
    </template>

    <UNavigationMenu
      :items="items"
      variant="link"
    />

    <template #right>
      <UButton
        icon="i-lucide-log-in"
        color="neutral"
        variant="ghost"
        :to="{ name: isAuthentificate ? LDashboardRoutes.pagename.dashboard : LAuthRoutes.pagename.authentificate }"
        class="lg:hidden"
      />

      <UButton
        label="Espace pro"
        color="neutral"
        variant="outline"
        :to="{ name: isAuthentificate ? LDashboardRoutes.pagename.dashboard : LAuthRoutes.pagename.authentificate }"
        class="hidden lg:inline-flex"
      />
    </template>

    <template #body>
      <UNavigationMenu
        :items="items"
        orientation="vertical"
        class="-mx-2.5"
      />

      <USeparator class="my-6" />

      <UButton
        label="Espace pro"
        color="neutral"
        variant="outline"
        :to="{ name: isAuthentificate ? LDashboardRoutes.pagename.dashboard : LAuthRoutes.pagename.authentificate }"
      />
    </template>
  </UHeader>
</template>
