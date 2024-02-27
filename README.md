## Setup

Make sure to install the dependencies:

```bash
# npm
npm install

```

## Database

Make sure to migrate all schema:

```bash
# create & migrate schema
npx prisma generate && npm run migrate-deploy
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
npm run start
```

## Local Development

Locally preview production build:

```bash
# npm
npm run dev

# new preview migration
npm run migrate-create

# new migration
npm run migrate
```

## Docker

### Image & network

```bash
# image
docker build -t be-uda:1.0.1 . --progress=plain --no-cache
# network
docker network create --driver bridge be-uda-portfolio
```

### database container with volume

```bash
# mysql database container with volume
docker container create --name db_uda_portfolio
-v "db_uda_portfolio:/var/lib/mysql"
--network be-uda-portfolio -e MYSQL_ROOT_PASSWORD=my-secret-pw mysql:8.0.3
```

### app container with volume

```bash
# be container with volume
docker container create --name be_uda_portfolio_with_volume
-v "be_uda_portfolio_log:/app/log"
-v "be_uda_portfolio_uploads:/app/uploads"
--network be-uda-portfolio -p 5000:5000 be-uda:1.0.1
```

### app container with bind

```bash
# be container with bind
docker container create --name be_uda_portfolio
--mount "type=bind,source=/root/projects/be-udaputeraportfolio/uploads,destination=/app/uploads"
--mount "type=bind,source=/root/projects/be-udaputeraportfolio/log,destination=/app/log"
--network be-uda-portfolio -p 5000:5000 be-uda:1.0.12

```
