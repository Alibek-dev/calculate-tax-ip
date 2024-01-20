import {TaxRegimesEnum} from "@/@types/index.types";

interface PaymentData {
  firstName: string,
  lastName: string,
  iin: string,
  taxType: TaxRegimesEnum,
}

export interface PaymentPayloadType extends PaymentData {
  income: number,
}

export interface PaymentForm extends PaymentData {
  income: string,
}