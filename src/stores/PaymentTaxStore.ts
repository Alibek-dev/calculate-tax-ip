import { defineStore } from 'pinia'
import type {Ref} from "vue";
import type {PaymentForm, PaymentPayloadType} from "@/@types/payment-tax.types";
import {computed, ref} from "vue";
import type {ComputedRef} from "vue";
import {TaxRegimesEnum} from "@/@types/index.types";
import type {SelectItemType} from "@/@types/select.types";
import {Mask} from "maska";
import {MaskRules} from "@/config/consts";

export const usePaymentTaxStore = defineStore('paymentTax', () => {
  const paymentTaxForm: Ref<PaymentPayloadType> = ref({
    firstName: "",
    lastName: "",
    iin: "",
    taxType: TaxRegimesEnum.LITE,
    income: 0,
  })

  const setPaymentTaxForm = (form: PaymentForm) => {
    const mask = new Mask({ mask: MaskRules.currency })
    const { firstName, iin, lastName, taxType, income } = form
    paymentTaxForm.value = {
      firstName,
      iin,
      income: Number(mask.unmasked(income)),
      lastName,
      taxType,
    }
  }

  const taxes = ref([
    { taxName: "ИПН", taxDescription: "(3% от дохода)", selected: true, taxSum: () => paymentTaxForm.value.income * 0.03 },
    {
      taxName: "СО",
      taxDescription: "(3,5% от дохода, <br> но не меньше 5 000 ₸)",
      selected: true,
      taxSum: () => (paymentTaxForm.value.income * 0.035 < 5000) ? 5000 : paymentTaxForm.value.income * 0.035
    },
    { taxName: "ОПВ", taxDescription: "(10% от дохода)", selected: true, taxSum: () => paymentTaxForm.value.income * 0.1 },
    { taxName: "ВОСМС", taxDescription: "(5% от дохода)", selected: false, taxSum: () => paymentTaxForm.value.income * 0.05 },
  ])

  const sumAllTaxes = computed(() => taxes.value.reduce((sum, item) => {
    if (item.selected) return sum + item.taxSum()
    return sum
  }, 0))

  const taxTypes: ComputedRef<SelectItemType[]> = computed(() => [
    { text: "Упрощённый", value: TaxRegimesEnum.LITE },
    { text: "Общеустановленный", value: TaxRegimesEnum.MAIN },
  ])

  return {
    paymentTaxForm,
    taxes,
    sumAllTaxes,
    taxTypes,

    setPaymentTaxForm
  }
})
