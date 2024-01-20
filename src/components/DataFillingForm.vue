<script setup lang="ts">
import CtiButton from "@/components/ui/CtiButton.vue";
import CtiTextField from "@/components/ui/CtiTextField.vue";
import CtiSelect from "@/components/ui/CtiSelect.vue";
import type {Ref} from "vue";
import {ref} from "vue";
import {MaskTypes, TaxRegimesEnum} from "@/@types/index.types";
import {usePaymentTaxStore} from "@/stores/PaymentTaxStore";
import {useRouter} from "vue-router";
import type {PaymentForm} from "@/@types/payment-tax.types";
import useVuelidate from "@vuelidate/core";
import {helpers, minLength, required} from "@vuelidate/validators";
import {maxCurrency, minCurrency, ValidatorsMessages} from "@/config/consts";

const paymentTaxStore = usePaymentTaxStore()
const router = useRouter()

const form: Ref<PaymentForm> = ref({
  firstName: "",
  lastName: "",
  iin: "",
  taxType: TaxRegimesEnum.LITE,
  income: "",
})

const submit = async () => {
  if (!await v$.value.$validate()) return

  paymentTaxStore.setPaymentTaxForm(form.value)
  router.push({ name: "payment" })
}

const rules = {
  firstName: { required: helpers.withMessage(ValidatorsMessages.required, required) },
  lastName: { required: helpers.withMessage(ValidatorsMessages.required, required) },
  iin: {
    required: helpers.withMessage(ValidatorsMessages.required, required),
    minLength: helpers.withMessage(ValidatorsMessages.iin, minLength(12) )
  },
  income: {
    required: helpers.withMessage(ValidatorsMessages.required, required),
    minValue: helpers.withMessage(ValidatorsMessages.minCurrency, minCurrency(1)),
    maxValue: helpers.withMessage(ValidatorsMessages.maxCurrency(150000000), maxCurrency(150000000) )
  }
}

const v$ = useVuelidate(rules, form)
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
        :error-message="v$.firstName.$errors.length ? v$.firstName.$errors[0].$message.toString() : ''"
      />
      <CtiTextField
        v-model="form.lastName"
        placeholder="Фамилия"
        label="Фамилия"
        max-length="30"
        :error-message="v$.lastName.$errors.length ? v$.lastName.$errors[0].$message.toString() : ''"
      />
    </div>

    <CtiTextField
      v-model="form.iin"
      :mask-type="MaskTypes.iin"
      placeholder="ИИН"
      label="ИИН"
      max-length="12"
      :error-message="v$.iin.$errors.length ? v$.iin.$errors[0].$message.toString() : ''"
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
      :mask-type="MaskTypes.currency"
      reversed-mask
      placeholder="0 ₸"
      label="Ваш доход за пол года"
      max-length="13"
      :error-message="v$.income.$errors.length ? v$.income.$errors[0].$message.toString() : ''"
    />
  </div>
  <CtiButton @click="submit" class="w-full">Рассчитать</CtiButton>
</template>

<style scoped>

</style>