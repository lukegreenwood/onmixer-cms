# Stage 1: Build the app
FROM node:22-alpine AS builder

WORKDIR /app

# RUN wget http://registry.gigantic.local:4873
RUN ping 192.168.1.88
RUN cat /etc/hosts

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

RUN npm run build

FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000

CMD ["npm", "start"]
