import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { httpBatchLink } from '@trpc/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { tRPC } from './shared/api/tRPC';
import { Page } from './C.pages';
import './index.scss';

const Root = () => {
    const [queryClient] = useState(() => new QueryClient());
    const [trpcClient] = useState(() =>
        tRPC.createClient({
            links: [httpBatchLink({ url: 'http://localhost:3000/trpc' })],
        })
    );

    return (
        <tRPC.Provider client={trpcClient} queryClient={queryClient}>
            <QueryClientProvider client={queryClient}>
                <Page />
            </QueryClientProvider>
        </tRPC.Provider>
    );
};

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Root />
    </StrictMode>
);