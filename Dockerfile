# Используем Node.js 18 на Alpine (легковесный образ)
FROM node:18-alpine AS builder

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json (если есть) для кэширования зависимостей
COPY package.json ./
COPY pnpm-lock.yaml ./

# Устанавливаем PNPM и зависимости
RUN npm install -g pnpm && pnpm install

# Копируем весь проект после установки зависимостей (чтобы кешировался node_modules)
COPY . .

# Собираем документацию
RUN pnpm run docs:build

# Используем минимальный Nginx для раздачи статики
FROM nginx:alpine

# Копируем готовый сайт из builder-контейнера
COPY --from=builder /app/docs/.vitepress/dist /usr/share/nginx/html

# Открываем порт 80
EXPOSE 80

# Запускаем Nginx
CMD ["nginx", "-g", "daemon off;"]
