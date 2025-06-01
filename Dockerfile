# Builder
FROM oven/bun:1.2.14 AS builder

WORKDIR /app

COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

COPY . ./

ARG VITE_REST_URL

RUN bun run build

# Caddy
FROM caddy

WORKDIR /app

COPY Caddyfile ./
RUN caddy fmt Caddyfile --overwrite

ARG VITE_REST_URL

COPY --from=builder /app/dist ./dist

CMD ["caddy", "run", "--config", "Caddyfile", "--adapter", "caddyfile"]