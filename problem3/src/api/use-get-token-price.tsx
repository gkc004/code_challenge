import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { API_DEFAULT_STALE_TIME_MSEC } from 'src/utils/api';
import { z } from 'zod';

const TokenSchema = z.object({
  currency: z.string(),
  date: z.string(),
  price: z.number(),
});

export type Token = z.infer<typeof TokenSchema>;

const TokenResponseSchema = z.array(TokenSchema);

const getTokenPrices = async () => {
  const response = await axios.get('https://interview.switcheo.com/prices.json');

  const data = TokenResponseSchema.parse(response.data);
  return data;
};

export const useGetTokenPrices = () => {
  return useQuery({
    queryFn: () => getTokenPrices(),
    queryKey: ["token-price"],
    staleTime: API_DEFAULT_STALE_TIME_MSEC,
  })
}
