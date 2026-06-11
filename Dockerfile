FROM node:24-alpine

WORKDIR /app

RUN corepack enable && corepack prepare pnpm@latest --activate

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm prisma:generate
RUN pnpm build

CMD ["sh", "-c", "pnpm prisma:migrate:deploy && pnpm prisma:seed && node dist/server.js"]