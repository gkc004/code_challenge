import { Token } from 'src/api/use-get-token-price';

export const calculateExchangeRate = (
  from: string,
  amount: number,
  tokens: Token[]
): number | null => {
  const fromToken = tokens.find((token) => token.currency === from);

  if (fromToken) {
    return amount * fromToken.price;
  }
  return null;
};

const getTokenIconUrl = (token: string): string => {
  return `https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/${token}.svg`;
};

export const getTokenOptions = (tokens: Token[]) => {
  return tokens.map((token) => ({
    iconUrl: getTokenIconUrl(token.currency),
    label: token.currency,
    value: token.currency,
  }));
};
