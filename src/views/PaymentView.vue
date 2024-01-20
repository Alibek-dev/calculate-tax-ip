<script setup lang="ts">

import CtiIcon from "@/components/ui/CtiIcon.vue";
import CtiChevronIcon from "@/components/icons/CtiChevronIcon.vue";
import {useRouter} from "vue-router";
import {usePaymentTaxStore} from "@/stores/PaymentTaxStore";
import TaxCardSelectorComponent from "@/components/TaxCardSelectorComponent.vue";
import TotalLineComponent from "@/components/LineComponent.vue";
import CtiButton from "@/components/ui/CtiButton.vue";
import LineComponent from "@/components/LineComponent.vue";
import {formatCurrencyUtils} from "@/utrils/currency.utils";
import {computed, ref} from "vue";

const router = useRouter()
const paymentTaxStore = usePaymentTaxStore()

const paid = ref(false)

const getTaxType = computed(() => paymentTaxStore.taxTypes.find(item => item.value === paymentTaxStore.paymentTaxForm.taxType))
const selectedTaxes = computed(() => paymentTaxStore.taxes.filter(tax => tax.selected))

</script>

<template>
  <div v-if="!paid">
    <div @click="router.back()" class="inline-flex gap-3 items-center cursor-pointer mb-8">
      <cti-icon class="-rotate-90"><cti-chevron-icon /></cti-icon>
      <div class="title">Заплатить налоги за ИП</div>
    </div>

    <TotalLineComponent
      class="mb-9"
      text="Ваш доход за полугодие:"
      :value="formatCurrencyUtils(paymentTaxStore.paymentTaxForm.income)"
    />

    <div class="flex flex-col gap-4 mb-[125px]">
      <TaxCardSelectorComponent
        v-for="(tax, i) of paymentTaxStore.taxes"
        :key="i"
        :tax-description="tax.taxDescription"
        :tax-name="tax.taxName"
        :tax-sum="tax.taxSum()"
        v-model:checked="tax.selected"
      />
    </div>

    <LineComponent
      class="mb-8"
      text="Итого к оплате за полугодие:"
      :value="formatCurrencyUtils(paymentTaxStore.sumAllTaxes)"
    />

    <div>
      <CtiButton @click="paid = true" :disabled="!paymentTaxStore.sumAllTaxes" class="w-full">Оплатить</CtiButton>
    </div>
  </div>

  <div v-else class="flex flex-col justify-between gap-6 h-full">
    <div>
      <div class="flex flex-col items-center title mb-20">
        <div class="mb-4">Спасибо!</div>
        <div class="mb-2">Налоги успешно оплачены!</div>
        <div>
          <img class="w-[50px]" src="@/assets/svg/checked.svg" alt="">
        </div>
      </div>
      <div class="flex flex-col gap-1 mb-16">
        <LineComponent text-size="small" text="Имя" :value="paymentTaxStore.paymentTaxForm.firstName" />
        <LineComponent text-size="small" text="Фамилия" :value="paymentTaxStore.paymentTaxForm.lastName" />
        <LineComponent text-size="small" text="ИИН" :value="paymentTaxStore.paymentTaxForm.iin" />
        <LineComponent v-if="getTaxType" text-size="small" text="Режим налогообложения" :value="getTaxType.text" />
        <LineComponent text-size="small" text="Ваш доход за пол года" :value="formatCurrencyUtils(paymentTaxStore.paymentTaxForm.income)" />
        <LineComponent
          v-for="(tax, i) of selectedTaxes"
          :key="i"
          text-size="small"
          :text="tax.taxName"
          :value="formatCurrencyUtils(tax.taxSum())"
        />
      </div>
      <LineComponent :value="formatCurrencyUtils(paymentTaxStore.sumAllTaxes)" text="Итого оплачено за полугодие:" />
    </div>

    <router-link :to="{ name: 'home' }">
      <div class="text-xl italic text-center">Вернуться на главную</div>
    </router-link>
  </div>
</template>

<style scoped>

</style>