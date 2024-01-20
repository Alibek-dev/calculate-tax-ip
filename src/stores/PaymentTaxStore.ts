import { defineStore } from 'pinia'
import type {Ref} from "vue";
import type {PaymentTaxForm} from "@/@types/payment-tax.types";
import {ref} from "vue";
import {TaxRegimesEnum} from "@/@types/index.types";

export const usePaymentTaxStore = defineStore('paymentTax', () => {
  const paymentTaxForm: Ref<PaymentTaxForm> = ref({
    firstName: "",
    lastName: "",
    iin: "",
    taxType: TaxRegimesEnum.LITE,
    income: "",
  })

  const setPaymentTaxForm = (form: PaymentTaxForm) => {
    paymentTaxForm.value = form
  }

  return {
    paymentTaxForm,

    setPaymentTaxForm
  }
})
