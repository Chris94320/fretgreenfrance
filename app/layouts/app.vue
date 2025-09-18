<script setup lang="ts">
import { LDashboardRoutes } from '@layers/dashboard'

const asideNavItems = [{
  label: 'test',
  to: LDashboardRoutes.pagename.dashboard
}]
</script>

<template>
  <UDashboardGroup>
    <UDashboardSidebar resizable>
      <UNavigationMenu
        orientation="vertical"
        :items="asideNavItems"
      />
    </UDashboardSidebar>
    <UContainer>
      <slot />
    </UContainer>
  </UDashboardGroup>
</template>
