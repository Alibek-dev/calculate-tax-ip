<script setup lang="ts">
import CtiButton from "@/components/ui/CtiButton.vue";
import CtiTextField from "@/components/ui/CtiTextField.vue";
import CtiSelect from "@/components/ui/CtiSelect.vue";
import {computed, ref} from "vue";
import type { ComputedRef, Ref } from "vue";
import {TaxRegimesEnum} from "@/@types/index.types";
import type {SelectItemType} from "@/@types/select.types";
import type {PaymentTaxForm} from "@/@types/payment-tax.types";
import {usePaymentTaxStore} from "@/stores/PaymentTaxStore";

const paymentTaxStore = usePaymentTaxStore()

const form: Ref<PaymentTaxForm> = ref({
  firstName: "",
  lastName: "",
  iin: "",
  taxType: TaxRegimesEnum.LITE,
  income: "",
})

const options: ComputedRef<SelectItemType[]> = computed(() => [
  { text: "Упрощённый", value: TaxRegimesEnum.LITE },
  { text: "Общеустановленный", value: TaxRegimesEnum.MAIN },
])

const submit = () => {
  paymentTaxStore.setPaymentTaxForm(form.value)
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
      :items="options"
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