<script setup lang="ts">
import {usePaymentTaxStore} from "@/stores/PaymentTaxStore";
import CtiButton from "@/components/ui/CtiButton.vue";
import {ref} from "vue";
import SelectTaxesForPayComponent from "@/components/SelectTaxesForPayComponent.vue";
import ResultPaidTaxesComponent from "@/components/ResultPaidTaxesComponent.vue";

const paymentTaxStore = usePaymentTaxStore()

const paid = ref(false)

</script>

<template>
  <div class="flex flex-col justify-between gap-6 h-full">
    <SelectTaxesForPayComponent v-if="!paid" />
    <ResultPaidTaxesComponent v-else />

    <cti-button v-if="!paid" @click="paid = true" :disabled="!paymentTaxStore.sumAllTaxes" class="w-full">Оплатить</cti-button>
    <router-link v-else :to="{ name: 'home' }">
      <div class="text-xl italic text-center">Вернуться на главную</div>
    </router-link>
  </div>
</template>

<style scoped>

</style>