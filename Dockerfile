# build everything once
FROM node:20-alpine AS builder
WORKDIR /app

COPY package*.json ./
COPY tsconfig*.json ./
COPY src ./src

RUN npm install
RUN npm run build

FROM node:20-alpine
WORKDIR /app

ARG ENTRY
ENV ENTRY=$ENTRY

COPY --from=builder /app/dist ./dist
COPY package*.json ./
RUN npm ci --omit=dev

EXPOSE 3000
CMD ["sh", "-c", "node dist/$ENTRY"]
