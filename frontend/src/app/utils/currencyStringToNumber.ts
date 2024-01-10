export function currencyStringToNumber(value: string) {
  const sanitizeString = value.replace(/\./g, '').replace(',', '.');

  return Number(sanitizeString);
}
