FROM node:20-alpine AS build
WORKDIR /lib
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM scratch
COPY --from=build /lib/package.json /lib/database.js /lib/database.d.ts /lib/
COPY --from=build /lib/dist /lib/dist