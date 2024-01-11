export function currencyStringToNumber(value: string | number) {
  if (typeof value === 'number') {
    return value;
  }

  const sanitizeString = value.replace(/\./g, '').replace(',', '.');

  return Number(sanitizeString);
}
