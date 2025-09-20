<script setup lang="ts">
import { navigateTo, useSeoMeta } from 'nuxt/app'
import { computed, ref } from 'vue'
import { type LAuthModels, LAuthRoutes } from '../'
import useAuthClient from '../composables/useAuthClient'
import InputPhoneNumber from '~/components/InputPhoneNumber.vue'

definePageMeta({
  layout: 'auth',
  name: LAuthRoutes.pagename.register
})

useSeoMeta({
  title: 'Login',
  description: 'Login to your account to continue'
})

const authClient = useAuthClient()

const phone = ref<{ e164?: string }>({ e164: undefined })
const password = ref<number[]>([])
const passwordConfirmation = ref<number[]>([])
const username = ref<string>()

const errors = computed(() => ({
  username: !!username.value,
  phone: !!phone.value,
  password: passwordConfirmation.value.length && password.value.length < 6 && 'Code pin invalide',
  passwordConfirmation: passwordConfirmation.value.length == 6 && password.value.join() !== passwordConfirmation.value.join() && 'Code pin invalide'
}))

const hasError = computed(() => !!Object.values(errors.value).filter(error => error).length)

async function onSubmit() {
  const body: LAuthModels.RegisterPayloadPost = {
    username: username.value,
    phone: phone.value.e164,
    password: password.value.join('')
  }
  await authClient.register(body)
  alert('OK')
}
</script>

<template>
  <UCard icon="i-lucide-lock">
    <template #header>
      <h1 class="text-xl text-center text-dimmed">
        <UIcon name="lucide-file" />
        Inscription
      </h1>
    </template>
    <template #default>
      <div>
        <form
          class="flex flex-col justify-center gap-4 py-6"
          @submit.prevent="onSubmit"
        >
          <UFormField label="Nom">
            <UInput
              class="block"
              size="xl"
              v-model="username"
              required
            />
          </UFormField>
          <InputPhoneNumber
            v-model="phone"
            name="phone"
            size="xl"
            required
          />
          <UFormField
            label="Code pin"
            :error="errors.password"
          >
            <UPinInput
              v-model="password"
              name="password"
              type="number"
              length="6"
              size="xl"
              mask
              required
              class="flex justify-between"
            />
          </UFormField>
          <UFormField
            label="Confirmation code pin"
            :error="errors.passwordConfirmation"
          >
            <UPinInput
              v-model="passwordConfirmation"
              name="password"
              type="number"
              length="6"
              size="xl"
              mask
              required
              class="flex justify-between"
            />
          </UFormField>
          <UButton
            type="submit"
            size="xl"
            block
          >
            Valider
          </UButton>
        </form>
      </div>
    </template>
    <template #footer>
      <div class="grid gap-2 text-center text-xs font-bold">
        <p>
          Vous avez un compte ?
        </p>
        <UButton
          :to="{ name: LAuthRoutes.pagename.authentificate }"
          color="primary"
          variant="link"
          size="sm"
          class="font-bold"
          block
        >
          Se connecter
        </UButton>
      </div>
    </template>
  </UCard>
</template>
