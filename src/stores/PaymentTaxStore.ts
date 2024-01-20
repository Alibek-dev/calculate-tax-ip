import { defineStore } from 'pinia'
import type {Ref} from "vue";
import type {PaymentForm, PaymentPayloadType} from "@/@types/payment-tax.types";
import {ref} from "vue";
import {TaxRegimesEnum} from "@/@types/index.types";

export const usePaymentTaxStore = defineStore('paymentTax', () => {
  const paymentTaxForm: Ref<PaymentPayloadType> = ref({
    firstName: "",
    lastName: "",
    iin: "",
    taxType: TaxRegimesEnum.LITE,
    income: null,
  })

  const setPaymentTaxForm = (form: PaymentForm) => {
    const { firstName, iin, lastName, taxType } = form
    paymentTaxForm.value = {
      firstName,
      iin,
      income: Number(form.income),
      lastName,
      taxType,
    }
  }

  return {
    paymentTaxForm,

    setPaymentTaxForm
  }
})
