# Install dependencies
FROM node:16-alpine as deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Build source code
FROM node:16-alpine as builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN yarn build

# Production image
FROM node:16-alpine AS runner
WORKDIR /app
ENV NODE_ENV production
COPY --from=builder /app/Procfile ./Procfile
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
# Prisma migration
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/tsconfig.json ./tsconfig.json

CMD ["yarn", "start:prod"]
