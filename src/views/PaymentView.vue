<script setup lang="ts">

import CtiIcon from "@/components/ui/CtiIcon.vue";
import CtiChevronIcon from "@/components/icons/CtiChevronIcon.vue";
import {useRouter} from "vue-router";
import {formatCurrencyUtils} from "@/utrils/currency.utils";
import {usePaymentTaxStore} from "@/stores/PaymentTaxStore";

const router = useRouter()
const paymentTaxStore = usePaymentTaxStore()
</script>

<template>
  <div @click="router.back()" class="inline-flex gap-3 items-center cursor-pointer mb-8">
    <cti-icon class="-rotate-90"><cti-chevron-icon /></cti-icon>
    <div class="title">Заплатить налоги за ИП</div>
  </div>

  <div class="flex items-end justify-between gap-12">
    <div class="title">Ваш доход за полугодие:</div>
    <div class="title text-end whitespace-nowrap">{{ formatCurrencyUtils(paymentTaxStore.paymentTaxForm.income) }}</div>
  </div>
</template>

<style scoped>

</style>