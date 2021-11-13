# Install dependencies only when needed
FROM node:16-alpine AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app
ARG NPM_TOKEN
# COPY .npmrc .npmrc
RUN echo '//registry.npmjs.org/:_authToken=${NPM_TOKEN}' > .npmrc
COPY package.json yarn.lock ./
RUN yarn install
RUN rm -f .npmrc

# Rebuild the source code only when needed
FROM node:16-alpine AS builder
WORKDIR /app
ARG NPM_TOKEN
# COPY .npmrc .npmrc
RUN echo '//registry.npmjs.org/:_authToken=${NPM_TOKEN}' > .npmrc
COPY . .
COPY --from=deps /app/node_modules ./node_modules
# RUN yarn build && yarn install --production --ignore-scripts --prefer-offline
# RUN npm install -g sharp-cli@1.15.0
# RUN yarn dlx expo-optimize
RUN ./node_modules/.bin/expo build-web
# COPY web-build web-build
RUN rm -f .npmrc

# Production image, copy all the files and run next
FROM node:16-alpine AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup -g 1001 -S nodejs
RUN adduser -S appuser -u 1001

COPY --from=builder /app/web-build ./web-build
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

RUN npm install -g serve@13.0.2
USER appuser

EXPOSE 3000

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry.
# ENV NEXT_TELEMETRY_DISABLED 1

CMD ["yarn", "start"]
