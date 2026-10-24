import { createTRPCReact } from '@trpc/react-query';
import type { AppRouter } from '@server/@generated/server';

export const tRPC = createTRPCReact<AppRouter>();