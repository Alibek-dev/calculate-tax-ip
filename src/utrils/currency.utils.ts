export function formatCurrencyUtils(value: number) {
  return new Intl.NumberFormat("ru-RU", { style: "currency", currency: "KZT", currencyDisplay: "narrowSymbol", maximumFractionDigits: 0 }).format(value)
}