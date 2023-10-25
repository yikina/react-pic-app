# 容器使用环境node:18,多阶段构建，多个执行FROM指令
FROM node:18 As builder

COPY . .

RUN npm install pnpm -g && pnpm install && pnpm run build

FROM nginx:1.24.0-alpine

COPY --from=builder /dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf