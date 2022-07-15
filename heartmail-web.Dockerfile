FROM node:16-alpine AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat

WORKDIR /app
COPY package.json ./package.json
COPY yarn.lock ./yarn.lock
COPY .yarn ./.yarn
COPY .yarnrc.yml ./.yarnrc.yml
RUN yarn install

FROM node:16-alpine AS runner

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules

COPY package.json ./package.json
COPY yarn.lock ./yarn.lock
COPY .yarn ./.yarn
COPY .yarnrc.yml ./.yarnrc.yml

# copy env vars that do not contain secrets. but do not copy .env.local or
# .env.production.local. those env vars needs to be passed in via ARGs.
COPY .env ./.env
COPY .env.production ./.env.production

# these are explicitly copied separately to make sure they are each a layer

COPY openspv-curve ./openspv-curve
COPY openspv-paymail ./openspv-paymail
COPY openspv-keyfile ./openspv-keyfile
COPY openspv-node ./openspv-node
COPY heartmail-redirect ./heartmail-redirect
COPY sbw-specs ./sbw-specs
COPY openspv-stamp-db ./openspv-stamp-db
COPY openspv-workers ./openspv-workers

COPY openspv-loadenv ./openspv-loadenv
COPY openspv-elliptic ./openspv-elliptic
COPY openspv-lib ./openspv-lib
COPY openspv-currency ./openspv-currency
COPY openspv-db ./openspv-db
COPY heartmail-web ./heartmail-web

RUN yarn install

WORKDIR /app/heartmail-web

ENV NEXT_TELEMETRY_DISABLED 1

ARG NODE_ENV
ARG AWS_SECRET_ACCESS_KEY
ARG IRON_SESSION_PASSWORD
ARG MB_OAUTH_CLIENT_SECRET

RUN yarn build

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

USER nextjs

EXPOSE 3000

CMD ["yarn", "start"]
