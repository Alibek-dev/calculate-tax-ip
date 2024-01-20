<script setup lang="ts">

import {formatCurrencyUtils} from "@/utrils/currency.utils";
import {useRouter} from "vue-router";
import {usePaymentTaxStore} from "@/stores/PaymentTaxStore";
import CtiIcon from "@/components/ui/CtiIcon.vue";
import CtiChevronIcon from "@/components/icons/CtiChevronIcon.vue";
import LineComponent from "@/components/LineComponent.vue";
import TaxCardSelectorComponent from "@/components/TaxCardSelectorComponent.vue";

const router = useRouter()
const paymentTaxStore = usePaymentTaxStore()
</script>

<template>
  <div>
    <div @click="router.back()" class="inline-flex gap-3 items-center cursor-pointer mb-8">
      <cti-icon class="-rotate-90"><cti-chevron-icon /></cti-icon>
      <div class="title">Заплатить налоги за ИП</div>
    </div>

    <LineComponent
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
  </div>
</template>

<style scoped>

</style>