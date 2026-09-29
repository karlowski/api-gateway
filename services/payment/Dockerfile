FROM node:20-alpine AS build
COPY --from=lib /lib /app/lib
WORKDIR /app/services/payment
COPY package*.json .npmrc ./
RUN npm ci
COPY . .
RUN npm run build && npm prune --omit=dev

FROM node:20-alpine
WORKDIR /app
COPY --from=build /app/services/payment/package.json ./
COPY --from=build /app/services/payment/node_modules ./node_modules
COPY --from=build /app/services/payment/dist ./dist
CMD ["node", "dist/main"]