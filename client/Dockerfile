FROM node:22-bookworm-slim AS build
WORKDIR /repo
COPY client/package*.json ./client/
RUN cd client && npm ci
COPY client ./client
COPY server/src ./server/src
RUN cd client && npx vite build

FROM nginx:1.27-alpine
COPY client/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /repo/client/dist /usr/share/nginx/html/luminus
EXPOSE 80
