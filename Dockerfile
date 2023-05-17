# STAGE 1

FROM node:16-alpine AS builder
WORKDIR /app
COPY . .
RUN yarn install
RUN yarn build

# STAGE 2

FROM node:16-alpine AS final
WORKDIR /app
COPY --from=builder ./app/dist ./dist
COPY package.json .
COPY yarn.lock .
RUN yarn install --production
EXPOSE 3001
CMD [ "yarn", "start" ]