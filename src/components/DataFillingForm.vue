<script setup lang="ts">
import CtiButton from "@/components/ui/CtiButton.vue";
import CtiTextField from "@/components/ui/CtiTextField.vue";
import CtiSelect from "@/components/ui/CtiSelect.vue";
import {ref} from "vue";
import type { Ref } from "vue";
import {TaxRegimesEnum} from "@/@types/index.types";
import {usePaymentTaxStore} from "@/stores/PaymentTaxStore";
import {useRouter} from "vue-router";
import type {PaymentForm} from "@/@types/payment-tax.types";

const paymentTaxStore = usePaymentTaxStore()
const router = useRouter()

const form: Ref<PaymentForm> = ref({
  firstName: "",
  lastName: "",
  iin: "",
  taxType: TaxRegimesEnum.LITE,
  income: "",
})

const submit = () => {
  paymentTaxStore.setPaymentTaxForm(form.value)
  router.push({ name: "payment" })
}
</script>

<template>
  <div class="flex flex-col gap-6 mb-28">
    <div class="text-1">
      Теперь ИП на упрощенке обязан уплачивать за себя ИПН и социальный налог. В связи с этими изменениями ИП должен платить за себя:
    </div>

    <div class="grid grid-cols-2 gap-5">
      <CtiTextField
        v-model="form.firstName"
        placeholder="Имя"
        label="Имя"
        max-length="30"
      />
      <CtiTextField
        v-model="form.lastName"
        placeholder="Фамилия"
        label="Фамилия"
        max-length="30"
      />
    </div>

    <CtiTextField
      v-model="form.iin"
      placeholder="ИИН"
      label="ИИН"
      max-length="12"
    />

    <CtiSelect
      label="Режим налогообложения"
      :items="paymentTaxStore.taxTypes"
      item-text="text"
      item-value="value"
      v-model="form.taxType"
    />

    <CtiTextField
      v-model="form.income"
      placeholder="0 Т"
      label="Ваш доход за пол года"
      max-length="12"
    />
  </div>
  <CtiButton @click="submit" class="w-full">Рассчитать</CtiButton>
</template>

<style scoped>

</style>