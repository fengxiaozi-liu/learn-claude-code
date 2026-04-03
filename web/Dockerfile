FROM node:22-alpine AS builder

WORKDIR /app

COPY web/package.json web/package-lock.json ./web/
RUN cd web && npm ci

COPY . .
RUN cd web && npm run build

FROM nginx:1.27-alpine

COPY --from=builder /app/web/out /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
