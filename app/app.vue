<script setup lang="ts">
const colorMode = useColorMode()

const color = computed(() => colorMode.value === 'dark' ? '#020618' : 'white')

onMounted(() => colorMode.preference = 'dark' )

useHead({
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { key: 'theme-color', name: 'theme-color', content: color }
  ],
  link: [
    { rel: 'icon', href: '/favicon.ico' }
  ],
  htmlAttrs: {
    lang: 'en'
  }
})

useSeoMeta({
  titleTemplate: '%s - Fret Green France',
  ogImage: 'https://ui4.nuxt.com/assets/templates/nuxt/saas-light.png',
  twitterImage: 'https://ui4.nuxt.com/assets/templates/nuxt/saas-light.png',
  twitterCard: 'summary_large_image'
})

const links = [{
  label: 'Devis',
  icon: 'i-lucide-book',
  to: '/'
}, {
  label: 'Histoire',
  icon: 'i-lucide-rocket',
  to: '/histoire'
}, {
  label: 'Groupement',
  icon: 'i-lucide-credit-card',
  to: '/groupement'
}, {
  label: 'Actualités',
  icon: 'i-lucide-pencil',
  to: '/actualites'
}]

</script>

<template>
  <UApp>
    <NuxtLoadingIndicator />

    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>

    <ClientOnly>
      <LazyUContentSearch
        shortcut="meta_k"
        :links="links"
        :fuse="{ resultLimit: 42 }"
      />
    </ClientOnly>
  </UApp>
</template>
