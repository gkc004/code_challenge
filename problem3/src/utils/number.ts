// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isNumeric = (num: any) =>
  (typeof num === 'number' || (typeof num === 'string' && num.trim() !== '')) &&
  !isNaN(num as number);

export const parseNumberWithComma = (input: string | number) => {
  if (typeof input === 'number') {
    return input;
  }

  if (!input.includes(',')) {
    return Number(input);
  }

  return Number(input.replace(/,/g, '.'));
};
