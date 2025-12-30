# Builder
FROM erlang:28.1-alpine AS builder
COPY --from=ghcr.io/gleam-lang/gleam:v1.14.0-erlang-alpine /bin/gleam /bin/gleam
WORKDIR /app
COPY . .
RUN gleam deps download && gleam run -m build

# Caddy
FROM caddy:alpine
WORKDIR /app
COPY Caddyfile ./
RUN caddy fmt Caddyfile --overwrite
COPY --from=builder /app/dist ./dist
CMD ["caddy", "run", "--config", "Caddyfile", "--adapter", "caddyfile"]
