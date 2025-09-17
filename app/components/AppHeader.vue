<script setup lang="ts">
const items = computed(() => [
  {
    label: 'Devis',
    to: '/',
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
  // {
  //   label: 'Histoire',
  //   to: '/histoire'
  // }
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
        to="/login"
        class="lg:hidden"
      />

      <UButton
        label="Se connecter"
        color="neutral"
        variant="outline"
        to="/login"
        class="hidden lg:inline-flex"
      />

      <UButton
        label="Rejoindre"
        color="neutral"
        trailing-icon="i-lucide-arrow-right"
        class="hidden lg:inline-flex"
        to="/contact"
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
        label="Sign in"
        color="neutral"
        variant="subtle"
        to="/login"
        block
        class="mb-3"
      />
      <UButton
        label="Sign up"
        color="neutral"
        to="/contact"
        block
      />
    </template>
  </UHeader>
</template>
