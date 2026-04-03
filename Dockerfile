FROM harbor.linksoft.cn/base/node:22.3.0 AS web-builder

WORKDIR /app

COPY web/package.json web/package-lock.json ./web/
RUN cd web && npm ci

COPY . .
RUN cd web && npm run build

FROM harbor.linksoft.cn/base/nginx:1.20-alpine

COPY --from=web-builder /app/web/out /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
