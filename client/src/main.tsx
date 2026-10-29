import { StrictMode, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { httpBatchLink } from '@trpc/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { tRPC } from './shared/api/tRPC';
import { Page } from './components';
import './index.scss';
import { CONSTANTS_CONFIG, useHotkeys, useSocket } from './shared';

const Root = () => {
    const { connect, disconnect } = useSocket()
    useHotkeys()
    const [queryClient] = useState(() => new QueryClient());
    const [trpcClient] = useState(() => tRPC.createClient({links: [httpBatchLink({ url: CONSTANTS_CONFIG.SERVER_URL_TRPC })],}));
    useEffect(() => {
        connect()
        return () => disconnect();
    },[])

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