const ORIGIN = import.meta.env.VITE_SERVER_URL || window.location.origin;

export const CONSTANTS_CONFIG = {
    GRID: 16,
    SIZE_CANVAS: 512,
    STEP_SIZE: 64,
    SOCKET_TIMEOUT: 0,
    SERVER_URL: ORIGIN,
    SERVER_URL_TRPC: `${ORIGIN}/trpc`,
    SERVER_URL_PICTURES: `${ORIGIN}/pictures`,
    ICON_SIZE: 16,
    STEP_ANIMATION: 25,
    STEP_SHADER: 10,
} as const;