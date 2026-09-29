FROM node:20-alpine AS build
COPY --from=lib /lib /app/lib
WORKDIR /app/services/api
COPY package*.json .npmrc ./
RUN npm ci
COPY . .
RUN npm run build && npm prune --omit=dev

FROM node:20-alpine
WORKDIR /app
COPY --from=build /app/services/api/package.json ./
COPY --from=build /app/services/api/node_modules ./node_modules
COPY --from=build /app/services/api/dist ./dist
CMD ["node", "dist/main"]