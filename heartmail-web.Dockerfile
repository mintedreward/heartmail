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

COPY heartmail-curve ./heartmail-curve
COPY heartmail-paymail ./heartmail-paymail
COPY heartmail-keyfile ./heartmail-keyfile
COPY heartmail-node ./heartmail-node
COPY heartmail-redirect ./heartmail-redirect
COPY heartmail-specs ./heartmail-specs
COPY heartmail-stamp-db ./heartmail-stamp-db
COPY heartmail-workers ./heartmail-workers

COPY heartmail-loadenv ./heartmail-loadenv
COPY heartmail-elliptic ./heartmail-elliptic
COPY heartmail-lib ./heartmail-lib
COPY heartmail-currency ./heartmail-currency
COPY heartmail-db ./heartmail-db
COPY heartmail-web ./heartmail-web

RUN yarn install

WORKDIR /app/heartmail-web

ENV NEXT_TELEMETRY_DISABLED 1

ARG NODE_ENV
ARG AWS_SECRET_ACCESS_KEY
ARG NEXT_PUBLIC_MB_CLIENT_IDENTIFIER
ARG NEXT_PUBLIC_HEARTMAIL_PAYMAIL

RUN yarn build

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

USER nextjs

EXPOSE 3000

CMD ["yarn", "start"]
