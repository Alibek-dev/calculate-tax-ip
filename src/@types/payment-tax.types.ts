import {TaxRegimesEnum} from "@/@types/index.types";

export type PaymentTaxForm = {
  firstName: string,
  lastName: string,
  iin: string,
  taxType: TaxRegimesEnum,
  income: string,
}