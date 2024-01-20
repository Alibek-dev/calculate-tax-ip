<script setup lang="ts">

import CtiIcon from "@/components/ui/CtiIcon.vue";
import CtiChevronIcon from "@/components/icons/CtiChevronIcon.vue";
import {useRouter} from "vue-router";
import {usePaymentTaxStore} from "@/stores/PaymentTaxStore";
import TaxCardSelectorComponent from "@/components/TaxCardSelectorComponent.vue";
import TotalLineComponent from "@/components/TotalLineComponent.vue";
import CtiButton from "@/components/ui/CtiButton.vue";

const router = useRouter()
const paymentTaxStore = usePaymentTaxStore()


</script>

<template>
  <div @click="router.back()" class="inline-flex gap-3 items-center cursor-pointer mb-8">
    <cti-icon class="-rotate-90"><cti-chevron-icon /></cti-icon>
    <div class="title">Заплатить налоги за ИП</div>
  </div>

  <TotalLineComponent
    class="mb-9"
    title="Ваш доход за полугодие:"
    :sum="paymentTaxStore.paymentTaxForm.income"
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

  <TotalLineComponent
    class="mb-8"
    title="Итого к оплате за полугодие:"
    :sum="paymentTaxStore.sumAllTaxes"
  />

  <div>
    <CtiButton :disabled="!paymentTaxStore.sumAllTaxes" class="w-full">Оплатить</CtiButton>
  </div>
</template>

<style scoped>

</style>