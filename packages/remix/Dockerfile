# Install dependencies only when needed
FROM node:16 AS pruned
# # Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
# RUN apk add --no-cache libc6-compat
WORKDIR /app

RUN npm install -g pnpm
COPY . .

RUN pnpm -F remix run build
RUN pnpm -F remix --prod deploy pruned

# # ================================================================================================

# # # Rebuild the source code only when needed
# # FROM node:16 AS builder
# # WORKDIR /app
# # COPY --from=deps /app/node_modules ./node_modules
# # COPY --from=deps /app/packages/remix/node_modules ./packages/remix/node_modules
# # COPY . .

# # # RUN npm install -g pnpm && pnpm -F remix run build

# # ================================================================================================

# # # Production image, copy all the files and run next
# FROM node:16 AS runner

# WORKDIR /app

# ENV NODE_ENV=production

# COPY --from=pruned /app/pruned .



# # ENTRYPOINT ["node", "index.js"]


# # # Install dependencies based on the preferred package manager
# # COPY pnpm-lock.yaml* ./
# # RUN \
# #   if [ -f pnpm-lock.yaml ]; then npm install -g pnpm && pnpm i \
# #   else echo "Lockfile not found." && exit 1; \
# #   fi

# # COPY --from=builder /app/packages/remix/build ./packages/remix/build
# # COPY --from=builder /app/packages/remix/public ./packages/remix/public
# # ADD . .

# # CMD ["pnpm", "-F", "remix", "run", "start"]
