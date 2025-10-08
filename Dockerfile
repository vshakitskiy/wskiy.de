# Builder
FROM erlang:28.1-alpine as builder
COPY --from=ghcr.io/gleam-lang/gleam:v1.12.0-erlang-alpine /bin/gleam /bin/gleam
COPY . /app/
RUN cd /app && gleam deps download && gleam run -m lustre/dev build

# Caddy
FROM caddy

WORKDIR /app

COPY Caddyfile ./
RUN caddy fmt Caddyfile --overwrite

COPY --from=builder /app/dist ./dist

# TODO: Remove this once lustre/dev will get a version bump
COPY --from=builder /app/assets/. ./dist/


CMD ["caddy", "run", "--config", "Caddyfile", "--adapter", "caddyfile"]