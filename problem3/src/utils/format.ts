import { isNumeric } from './number';

export function formatPrice(
  price?: number | string | undefined | null,
  locale = 'en'
) {
  if (!price) {
    return '';
  }

  const formatter = new Intl.NumberFormat(locale, {
    currency: 'USD',
    style: 'currency',
  });

  const priceConverted = isNumeric(price) ? Number(price) : 0;

  return formatter.format(priceConverted);
}
