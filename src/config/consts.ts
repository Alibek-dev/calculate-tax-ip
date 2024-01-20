import {formatCurrencyUtils} from "@/utrils/currency.utils";
import {Mask} from "maska";

export const MaskRules = {
  any: "",
  iin: "############",
  currency: "### ### ### ₸"
}

export const ValidatorsMessages = {
  required: "Обязательно поле",
  minCurrency: () => `Доход не может равен нулю`,
  maxCurrency: (max: number) => `Максимальное значение ${formatCurrencyUtils(max)}`,
  iin: "Введите корректный ИИН"
}

export const minCurrency = (min: number) => (value: string) =>  {
  const mask = new Mask({ mask: MaskRules.currency })
  return Number(mask.unmasked(value)) >= min
}

export const maxCurrency = (max: number) => (value: string) =>  {
  const mask = new Mask({ mask: MaskRules.currency })
  return Number(mask.unmasked(value)) < max
}