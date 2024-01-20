<script setup lang="ts">
import {usePaymentTaxStore} from "@/stores/PaymentTaxStore";
import CtiButton from "@/components/ui/CtiButton.vue";
import {onBeforeMount, ref} from "vue";
import SelectTaxesForPayComponent from "@/components/SelectTaxesForPayComponent.vue";
import ResultPaidTaxesComponent from "@/components/ResultPaidTaxesComponent.vue";
import {useRouter} from "vue-router";
import {formatCurrencyUtils} from "@/utrils/currency.utils";
import LineComponent from "@/components/LineComponent.vue";

const paymentTaxStore = usePaymentTaxStore()
const router = useRouter()

const paid = ref(false)

onBeforeMount(() => {
  if (!paymentTaxStore.paymentTaxForm.income) router.push({ name: "home" })
})

</script>

<template>
  <div class="flex flex-col justify-between gap-6 h-full">
    <SelectTaxesForPayComponent v-if="!paid" />
    <ResultPaidTaxesComponent v-else />

    <div v-if="!paid">
      <LineComponent
        class="mb-8"
        text="Итого к оплате за полугодие:"
        :value="formatCurrencyUtils(paymentTaxStore.sumAllTaxes)"
      />
      <cti-button @click="paid = true" :disabled="!paymentTaxStore.sumAllTaxes" class="w-full">Оплатить</cti-button>
    </div>
    <router-link v-else :to="{ name: 'home' }">
      <div class="text-xl italic text-center">Вернуться на главную</div>
    </router-link>
  </div>
</template>

<style scoped>

</style>