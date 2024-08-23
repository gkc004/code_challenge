import React, { useState, useEffect, useMemo } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { useGetTokenPrices } from 'src/api/use-get-token-price';
import { CrossCircledIcon, ReloadIcon } from '@radix-ui/react-icons';
import { Select } from 'src/components/basic/select';
import { formatPrice } from 'src/utils/format';
import { calculateExchangeRate, getTokenOptions } from './utils';

type FormValues = {
  from: string;
  to: string;
  amount: number;
};

export const CurrencySwapForm = () => {
  const { control, handleSubmit, register, watch, formState: { errors } } = useForm<FormValues>();
  const { data: tokens = [], isLoading, error } = useGetTokenPrices();
  const [exchangedAmount, setExchangedAmount] = useState<number | null>(null);

  const fromCurrency = watch('from');
  const amount = watch('amount');

  useEffect(() => {
    if (fromCurrency && amount && tokens.length > 0) {
      const calculatedAmount = calculateExchangeRate(fromCurrency, amount, tokens);
      setExchangedAmount(calculatedAmount);
    }
  }, [fromCurrency, amount, tokens]);

  const onSubmit: SubmitHandler<FormValues> = data => {
    alert(`Swapped ${data.amount} ${data.from} to ${formatPrice(exchangedAmount)}`);
  };

  const tokenOptions = useMemo(() => getTokenOptions(tokens).filter(token => Boolean(token.iconUrl)), [tokens])


  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-16 text-blue-600">
        <ReloadIcon className="animate-spin h-6 w-6 mr-3" />
        <span>Loading token prices...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-16 text-red-600 bg-red-100 p-4 rounded-lg">
        <CrossCircledIcon className="h-6 w-6 mr-3" />
        <span>Error loading token prices. Please try again later.</span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-1/5 bg-white p-6 rounded-lg shadow-md">
      <Controller
        name="from"
        control={control}
        rules={{ required: "This field is required" }}
        render={({ field }) => (
          <Select
            {...field}
            label="Select Coin to Send"
            options={tokenOptions}
            onValueChange={value => {
              field.onChange(value);
              const calculatedAmount = calculateExchangeRate(value, amount, tokens);
              setExchangedAmount(calculatedAmount);
            }}
            error={errors.from?.message}
          />
        )}
      />

      <div className="mb-4">
        <label className="block text-gray-700">Amount</label>
        <input
          type="number"
          className="block w-full mt-1 border border-gray-300 rounded-md p-2"
          {...register('amount', { required: true, min: 1 })}
          onChange={(e) => {
            const newAmount = Number(e.target.value);
            setExchangedAmount(calculateExchangeRate(fromCurrency, newAmount, tokens));
          }}
        />
        {errors.amount && <span className="text-red-500 text-sm">Please enter a valid amount</span>}
      </div>

      {exchangedAmount !== null && (
        <div className="mb-4 text-gray-700">
          You will receive approximately: {formatPrice(exchangedAmount)}
        </div>
      )}

      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
      >
        Confirm Swap
      </button>
    </form>
  );
};
