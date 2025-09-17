<script setup lang="ts">
const { data: page } = await useAsyncData('index', () => queryCollection('index').first())

const title = page.value?.title
const seoTitle = page.value?.seo?.title
const subtitle = page.value?.subtitle
const logo = page.value?.logo
const description = page.value?.description
const seoDescription = page.value?.seo.description
const hero = page.value?.hero
const heroLinks = hero?.links || []

useSeoMeta({
  titleTemplate: '',
  title,
  ogTitle: seoTitle,
  description,
  ogDescription: seoDescription
})
</script>
  
<template>
  <div v-if="page">
    <div class="p-8">
      <div class="w-full h-[calc(100vh-var(--ui-header-height))] px-16 max-w-(--ui-container) gap-4 mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center text-center">
        <h1><img :src="logo" :alt="title" class="h-30 md:h-40"></h1>
        <h2 class="text-xl md:text-2xl sm:text-4xl font-bold">{{ subtitle }}</h2>
        <p class="text-l md:text-xl mb-4">{{ description }}</p>
        <UButton
          v-for="(link, index) in heroLinks"
          :key="index"
          :variant="link.variant"
          :to="link.to"
        >
          {{ link.label }}
        </UButton>
      </div>
    </div>

    <!-- <UPageSection
      v-for="(section, index) in page.sections"
      :key="index"
      :title="section.title"
      :description="section.description"
      :orientation="section.orientation"
      :reverse="section.reverse"
      :features="section.features"
    >
      <ImagePlaceholder />
    </UPageSection>

    <UPageSection
      :title="page.features.title"
      :description="page.features.description"
    >
      <UPageGrid>
        <UPageCard
          v-for="(item, index) in page.features.items"
          :key="index"
          v-bind="item"
          spotlight
        />
      </UPageGrid>
    </UPageSection>

    <UPageSection
      id="testimonials"
      :headline="page.testimonials.headline"
      :title="page.testimonials.title"
      :description="page.testimonials.description"
    >
      <UPageColumns class="xl:columns-4">
        <UPageCard
          v-for="(testimonial, index) in page.testimonials.items"
          :key="index"
          variant="subtle"
          :description="testimonial.quote"
          :ui="{ description: 'before:content-[open-quote] after:content-[close-quote]' }"
        >
          <template #footer>
            <UUser
              v-bind="testimonial.user"
              size="lg"
            />
          </template>
        </UPageCard>
      </UPageColumns>
    </UPageSection>

    <USeparator />

    <UPageCTA
      v-bind="page.cta"
      variant="naked"
      class="overflow-hidden"
    >
      <LazyStarsBg />
    </UPageCTA> -->
  </div>
</template>
