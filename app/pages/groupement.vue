<script setup lang="ts">
const { data: page } = await useAsyncData('groupement', () => queryCollection('groupement').first())

const title = page.value?.seo?.title || page.value?.title
const description = page.value?.seo?.description || page.value?.description

useSeoMeta({
  title,
  ogTitle: title,
  description,
  ogDescription: description
})
</script>

<template>
  <div v-if="page" class="max-w-(--ui-container) mx-auto p-16">

    <ContentRenderer v-if="page" :value="page" />

    <!-- <UContainer>
      <UPricingPlans scale>
        <UPricingPlan
          v-for="(plan, index) in page.plans"
          :key="index"
          v-bind="plan"
          :price="isYearly === '1' ? plan.price.year : plan.price.month"
          :billing-cycle="isYearly === '1' ? '/year' : '/month'"
        />
      </UPricingPlans>
    </UContainer> -->

  </div>
</template>
