<script setup lang="ts">
import { navigateTo, useRouter, useSeoMeta } from 'nuxt/app'
import InputPhoneNumber from '~/components/InputPhoneNumber.vue'
import { ref } from 'vue'
import { type LAuthModels, LAuthRoutes } from '../'
import { LDashboardRoutes } from '@layers/dashboard'
import { useAuthStore } from '../stores/useAuthStore'

definePageMeta({
  layout: 'auth',
  name: LAuthRoutes.pagename.authentificate
})

useSeoMeta({
  title: 'Login',
  description: 'Login to your account to continue'
})

const router = useRouter()
const authStore = useAuthStore()

const phoneNumber = ref<{ e164?: string }>({ e164: undefined })
const password = ref<number[]>([])

async function onSubmit() {
  const body: LAuthModels.AuthPayloadPost = {
    phoneNumber: phoneNumber.value.e164,
    password: password.value.join('')
  }
  const user = await $fetch<LAuthModels.UserRecord>('http://localhost:3000' + LAuthRoutes.api.authentificate, { method: 'POST', body })
  if (user.id) {
    authStore.setUser(user)
    navigateTo({ name: LDashboardRoutes.pagename.dashboard })
  }
}
</script>

<template>
  <UCard icon="i-lucide-lock">
    <template #header>
      <h1 class="text-xl text-center text-dimmed">
        <UIcon name="lucide-lock" />
        Authenfication
      </h1>
    </template>
    <template #default>
      <div class="">
        <form
          class="flex flex-col justify-center gap-4 py-6"
          @submit.prevent="onSubmit"
        >
          <InputPhoneNumber
            v-model="phoneNumber"
            name="phoneNumber"
            size="xl"
          />
          <UFormField label="Code">
            <UPinInput
              v-model="password"
              name="password"
              type="number"
              length="6"
              size="xl"
              mask
              class="flex justify-between"
            />
          </UFormField>
          <UButton
            type="submit"
            variant="outline"
            size="xl"
            block
          >
            Se connecter
          </UButton>
        </form>
      </div>
    </template>
    <template #footer>
      <div class="grid gap-2 text-center text-xs font-bold">
        <p>
          Vous souhaitez créer un compte ?
        </p>
        <UButton
          to="/contact"
          color="primary"
          variant="link"
          size="sm"
          class="font-bold"
          block
        >
          Rejoingnez le groupement
        </UButton>
      </div>
    </template>
  </UCard>
</template>
