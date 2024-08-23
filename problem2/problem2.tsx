import { useMemo } from 'react';

enum Blockchain {
  Osmosis = 'Osmosis',
  Ethereum = 'Ethereum',
  Arbitrum = 'Arbitrum',
  Zilliqa = 'Zilliqa',
  Neo = 'Neo',
}

interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: Blockchain | undefined;
}
interface FormattedWalletBalance extends WalletBalance {
  formatted: string;
}

const BLOCKCHAIN_PRIORITY_MAP: Record<Blockchain | 'default', number> = {
  [Blockchain.Osmosis]: 100,
  [Blockchain.Ethereum]: 50,
  [Blockchain.Arbitrum]: 30,
  [Blockchain.Zilliqa]: 20,
  [Blockchain.Neo]: 20,
  default: -99,
};

function getPriority(blockchain: Blockchain | undefined) {
  return blockchain
    ? BLOCKCHAIN_PRIORITY_MAP[blockchain]
    : BLOCKCHAIN_PRIORITY_MAP.default;
}

interface WalletPageProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

// Note: sort `walletBalance` by `blockchain`
export function compareBalances(
  walletBalanceLeft: WalletBalance,
  walletBalanceRight: WalletBalance
) {
  return (
    getPriority(walletBalanceRight.blockchain) -
    getPriority(walletBalanceLeft.blockchain)
  );
}

export function getSortedBalances(balances: WalletBalance[]) {
  return [...balances].sort(compareBalances);
}

export function convertPriceInUsd(balance: number | undefined, amount: number) {
  if (typeof balance === 'undefined') {
    return 0;
  }
  return balance * amount;
}

// Note: just to resolve ts errors
const useWalletBalances = () => {
  return [] as WalletBalance[];
};

// Note: just to resolve ts errors
const usePrices = () => {
  return {} as any;
};

const WalletPage = ({ children, ...rest }: WalletPageProps) => {
  const balances: WalletBalance[] = useWalletBalances();
  const prices = usePrices();

  const sortedBalances = useMemo(
    () =>
      getSortedBalances(
        balances.filter(
          (balance: WalletBalance) =>
            getPriority(balance.blockchain) > -99 && balance.amount > 0
        )
      ),
    // Note: Prices added here for some reason?
    [balances, prices]
  );

  const formattedBalances = useMemo(
    () =>
      sortedBalances.map((balance: WalletBalance) => {
        return {
          ...balance,
          formatted: balance.amount.toFixed(),
        };
      }),
    [sortedBalances]
  );

  return (
    <div {...rest}>
      {formattedBalances.map(
        (balance: FormattedWalletBalance, index: number) => (
          <WalletRow
            // Note: don't get what is this
            // className={classes.row}
            // Note: `index` here might not be good.
            key={balance.blockchain}
            amount={balance.amount}
            usdValue={convertPriceInUsd(
              prices[balance.currency],
              balance.amount
            )}
            formattedAmount={balance.formatted}
          />
        )
      )}
    </div>
  );
};

const WalletRow = (props: any) => {
  return null;
};
