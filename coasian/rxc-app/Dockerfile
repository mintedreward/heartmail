# Install dependencies only when needed

FROM node:16-alpine AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app
ARG NPM_TOKEN
RUN echo '//registry.npmjs.org/:_authToken=${NPM_TOKEN}' > .npmrc
COPY package.json yarn.lock ./
RUN yarn install
RUN rm -f .npmrc

# Rebuild the source code only when needed

FROM node:16-alpine AS builder
WORKDIR /app
ARG NPM_TOKEN
RUN echo '//registry.npmjs.org/:_authToken=${NPM_TOKEN}' > .npmrc
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN npm install -g expo-cli@4.13.0
RUN yarn build
RUN rm -f .npmrc

# Production image, copy all the files and prepare server

FROM node:16-alpine AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup -g 1001 -S nodejs
RUN adduser -S appuser -u 1001

COPY --from=builder /app/web-build ./web-build
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/serve.js ./serve.js

USER appuser

EXPOSE 3000

CMD ["yarn", "start"]
