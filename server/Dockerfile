FROM node:22-bookworm-slim AS build
WORKDIR /app
ARG DATABASE_URL="postgresql://build:build@postgres:5432/build"
ENV DATABASE_URL=$DATABASE_URL
RUN apt-get update && apt-get install -y --no-install-recommends openssl && rm -rf /var/lib/apt/lists/*
COPY package*.json ./
COPY prisma.config.ts ./
RUN npm ci
COPY prisma ./prisma
RUN npx prisma generate
COPY . .
RUN npm run build

FROM node:22-bookworm-slim AS runtime
WORKDIR /app
ARG DATABASE_URL="postgresql://build:build@postgres:5432/build"
ENV DATABASE_URL=$DATABASE_URL
RUN apt-get update && apt-get install -y --no-install-recommends openssl && rm -rf /var/lib/apt/lists/*
COPY package*.json ./
COPY prisma.config.ts ./
RUN npm ci --include=dev
COPY prisma ./prisma
RUN npx prisma generate
COPY --from=build /app/dist ./dist
COPY docker-entrypoint.sh ./
RUN chmod +x docker-entrypoint.sh
ENV NODE_ENV=production
EXPOSE 3000
ENTRYPOINT ["./docker-entrypoint.sh"]
