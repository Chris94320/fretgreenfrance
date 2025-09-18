<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui'
import { useRouter, useSeoMeta } from 'nuxt/app'
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

async function onSubmit(payload: FormSubmitEvent<{
  phoneNumber: string
  password: string
}>) {
  console.log('Submitted', payload)
  const body: LAuthModels.AuthPayloadPost = {
    phoneNumber: phoneNumber.value.e164,
    password: password.value.join('')
  }
  const user = await $fetch<LAuthModels.UserRecord>('http://localhost:3000' + LAuthRoutes.api.authentificate, { method: 'POST', body })
  console.log(user)
  if (user.id) {
    authStore.setUser(user)
    router.push({ name: LDashboardRoutes.pagename.dashboard })
  }
}
</script>

<template>
  <UCard icon="i-lucide-lock">
    <div class="grid gap-8">
      <h1 class="text-2xl text-center">
        <UIcon name="lucide-lock" />
        Authenfication
      </h1>
      <form
        class="flex flex-col justify-center gap-4"
        @submit.prevent="onSubmit"
      >
        <InputPhoneNumber
          v-model="phoneNumber"
          name="phoneNumber"
          size="xl"
        />
        <UPinInput
          v-model="password"
          name="password"
          type="number"
          length="6"
          size="xl"
          mask
          class="justify-center"
        />
        <UButton
          type="submit"
          block
        >
          Se connecter
        </UButton>
      </form>
      <hr class="text-dimmed">
      <div class="grid gap-2 text-center text-xs font-bold">
        <p>
          Vous souhaitez créer un compte ?
        </p>
        <UButton
          to="/contact"
          color="primary"
          variant="link"
          size="sm"
          block
        >
          Rejoingnez le groupement
        </UButton>
      </div>
    </div>
  </UCard>
</template>
