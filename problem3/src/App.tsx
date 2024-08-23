import './styles/globals.css';
import { useState } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { CurrencySwapForm } from 'src/components/form/currency-swap-form';

function App() {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <main className="min-h-screen bg-gray-100 flex items-center justify-center">
        <CurrencySwapForm />
      </main>
    </QueryClientProvider>
  );
}

export default App;
