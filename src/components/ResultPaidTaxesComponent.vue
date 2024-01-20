<script setup lang="ts">

import {formatCurrencyUtils} from "@/utrils/currency.utils";
import LineComponent from "@/components/LineComponent.vue";
import {computed} from "vue";
import {usePaymentTaxStore} from "@/stores/PaymentTaxStore";

const paymentTaxStore = usePaymentTaxStore()

const getTaxType = computed(() => paymentTaxStore.taxTypes.find(item => item.value === paymentTaxStore.paymentTaxForm.taxType))
const selectedTaxes = computed(() => paymentTaxStore.taxes.filter(tax => tax.selected))


</script>

<template>
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
</template>

<style scoped>

</style>