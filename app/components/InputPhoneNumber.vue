<template>
  <UFormField
    :error="!results.isValid && phone.length > 0"
    label="Téléphone"
    name="phone"
  >
    <UFieldGroup class="w-full flex">
      <USelectMenu
        v-model="selectedCountry"
        clear-search-on-close
        searchable
        disabled
        :size
        searchable-placeholder="Search a country..."
        :items="countries"
        value-attribute="id"
      >
        <template #leading>
          <span
            class="relative inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full text-[10px]"
          >
            <span class="grey-text text-xs">+{{ selectedCountryDialcode?.dialCode }}</span>
          </span>
        </template>
        <template #default>
          <span class="grey-text text-xs">{{ selectedCountryDialcode?.id }}</span>
        </template>
        <template #item="{ item: country }">
          <span
            class="relative inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full text-[10px]"
          >
            <span class="grey-text text-xs">+{{ country?.dialCode }}</span>
          </span>
          <div class="inline truncate">
            {{ country.label }}
          </div>
        </template>
      </USelectMenu>
      <UInput
        type="tel"
        class="w-full"
        :trailing-icon="
          modelValue && !results.isValid
            ? ''
            : 'i-heroicons-check-20-solid'
        "
        :model-value="phone"
        placeholder="06 11 22 33 44"
        :size
        :required
        @update:model-value="
          onPhoneNumberChanged({
            newPhoneNumber: $event,
            autoFormat,
            noFormattingAsYouType: false
          })
        "
      />
    </UFieldGroup>
  </UFormField>
</template>

<script lang="ts" setup>
import {
  type CountryCode,
  getCountries,
  getCountryCallingCode
} from 'libphonenumber-js'
import { maxLength } from 'zod/v4';
import { usePhonenumber } from '~/composables/usePhoneNumber'

defineProps<{
  modelValue: { e164?: string }
  size?: 'xl' | 'lg' | 'md' | 'sm' | 'xs'
  required?: boolean
}>()

const emit = defineEmits(['update:modelValue'])

const {
  getPhoneNumberResults,
  sanitizePhoneNumber
} = usePhonenumber()

const locale = ref('en')
const phone = ref<string>('')
const autoFormat = ref<boolean>(true)
const selectedCountry = ref<{ id: CountryCode, dialCode: string, label: string }>({ id: 'FR', dialCode: '33', label: 'France' })
const results = ref<{ isValid: boolean, countryCode?: CountryCode }>({
  isValid: false,
  countryCode: undefined
})

const selectedCountryDialcode = computed(
  () => countries.value?.find(country => country.id === selectedCountry.value.id)
)

let displayNamesInstance: Intl.DisplayNames | undefined = undefined
let displayNamesLocale: string | undefined = undefined

const getCountryName = (
  locale: string,
  code: CountryCode | string,
  customCountriesNameListByIsoCode?: Record<CountryCode | string, string>
): string | undefined => {
  if (customCountriesNameListByIsoCode?.[code]) {
    return customCountriesNameListByIsoCode[code]
  }

  if (displayNamesLocale !== locale || !displayNamesInstance) {
    displayNamesLocale = locale
    displayNamesInstance = new Intl.DisplayNames([locale], { type: 'region' })
  }

  return displayNamesInstance.of(code)
}

const { data: countries } = await useAsyncData(async () => {
  const isoList = getCountries()
  const countriesList: { id: string, dialCode: string, label: string }[] = []
  for (const iso2 of isoList) {
    const label = getCountryName(locale.value, iso2)
    if (label) {
      const dialCode = getCountryCallingCode(iso2)
      if (dialCode && dialCode !== '1') {
        countriesList.push({
          id: iso2,
          dialCode,
          label
        })
      }
    }
  }

  return countriesList
})

watch(
  () => selectedCountry.value,
  (value, oldValue) => {
    if (value && value !== oldValue && value !== selectedCountry.value) {
      onCountryChanged({
        countryCode: value.id,
        autoFormat: autoFormat.value,
        noFormattingAsYouType: false
      })
    }
  },
  {
    immediate: true
  }
)

function onPhoneNumberChanged({
  newPhoneNumber,
  autoFormat,
  noFormattingAsYouType,
  updateResults = true
}: {
  newPhoneNumber: string
  autoFormat: boolean
  noFormattingAsYouType: boolean
  updateResults?: boolean
}) {
  const containsOnlyNumbers = /^[\d\s]*$/.test(newPhoneNumber)

  if (!containsOnlyNumbers) {
    results.value = { isValid: false, countryCode: undefined }
    emit('update:modelValue', results.value)
    return
  }

  const sanitizedPhoneNumber = sanitizePhoneNumber(newPhoneNumber)

  if (sanitizedPhoneNumber === '') {
    results.value = { isValid: false, countryCode: undefined }
    emit('update:modelValue', null)
  } else if (updateResults) {
    results.value = getPhoneNumberResults({
      phone: sanitizedPhoneNumber,
      countryCode: selectedCountry.value.id
    })
    emit('update:modelValue', results.value)
  }

  if (results.value.isValid && results.value.formatNational && autoFormat) {
    phone.value = results.value.formatNational
  } else {
    phone.value = sanitizedPhoneNumber
  }

  if (
    results.value.countryCode
    && results.value.countryCode !== selectedCountry.value.id
  ) {
    onCountryChanged({
      countryCode: results.value.countryCode,
      autoFormat,
      noFormattingAsYouType,
      updateResults: false
    })
  }
}

function onCountryChanged({
  countryCode,
  autoFormat,
  noFormattingAsYouType,
  updateResults = true,
}: {
  countryCode?: CountryCode
  autoFormat: boolean
  noFormattingAsYouType: boolean
  updateResults?: boolean
}) {
  if (updateResults) {
    results.value = getPhoneNumberResults({
      phone: phone.value,
      countryCode,
    })
  }

  onPhoneNumberChanged({
    newPhoneNumber: phone.value,
    autoFormat,
    noFormattingAsYouType,
    updateResults,
  })
}
</script>
