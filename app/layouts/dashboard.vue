<script setup lang="ts">
import { LDashboardRoutes } from '@layers/dashboard'
import useAuthClient from '@layers/auth/composables/useAuthClient'
import type { NavigationMenuItem } from '@nuxt/ui'

const authClient = useAuthClient()

const asideNavItems = [{
  label: 'Dashboard',
  icon: 'lucide-home',
  to: LDashboardRoutes.pagename.dashboard
}, {
  label: 'Missions',
  icon: 'lucide-rocket',
  to: LDashboardRoutes.pagename.missions
}, {
  label: 'Offres',
  icon: 'lucide-star',
  to: LDashboardRoutes.pagename.offers
}]

const asideNavItemsBottom: NavigationMenuItem[] = [{
  label: 'Session',
  icon: 'lucide-cookie',
  children: [
    {
      label: 'Validate token',
      onClick: authClient.validate
    },
    {
      label: 'Refresh token',
      color: 'warning',
      onClick: authClient.refresh
    },
    {
      label: 'Disconnect',
      color: 'error',
      onClick: authClient.disconnect
    }
  ]
}]
</script>

<template>
  <UDashboardGroup>
    <UDashboardSidebar
      resizable
      :min-size="20"
      :max-size="44"
    >
      <div class="flex-1 flex flex-col justify-between">
        <div class="grid gap-4">
          <div class="text-center">
            <AppLogo />
          </div>
          <UNavigationMenu
            orientation="vertical"
            :items="asideNavItems"
          />
        </div>
        <UNavigationMenu
          orientation="vertical"
          :items="asideNavItemsBottom"
        />
      </div>
    </UDashboardSidebar>
    <UDashboardPanel resizable>
      <slot />
    </UDashboardPanel>
  </UDashboardGroup>
</template>
