## Setup

Make sure to install the dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Database

Make sure to migrate all schema:

```bash
# create & migrate schema
npm run migrate

# new preview migration
npm run migrate-create

# new migration
npm run migrate

```

## Env

Setup env file

```bash
# create .env
copy paste from .env.example

```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm run build

# yarn
yarn build

# bun
bun run build
```

## Local Development

Locally preview production build:

```bash
# npm
npm run dev

# pnpm
pnpm run dev

# yarn
yarn dev

# bun
bun run dev
```

## Docker

```bash
# network
docker network create --driver bridge be-uda-portfolio
# mysql database container
docker container create --name db_uda_portfolio --network be-uda-portfolio -e MYSQL_ROOT_PASSWORD=my-secret-pw mysql:8.0.3
# image
docker build -t be:1.0.1 . --progress=plain --no-cache
# be container
docker container create --name be --network be-uda-portfolio -p 5000:5000 be:1.0.1
```
