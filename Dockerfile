# Use a base image with Node.js installed
FROM node:21-alpine

ENV NODE_ENV="development"
ENV PORT=5000
ENV COOKIE_DOMAIN="localhost"
ENV JWT_SECRET="5H4MH4"

# PRISMA
ENV DATABASE_URL="mysql://root:my-secret-pw@db_uda_portfolio:3306/portfolio_uda"

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

EXPOSE ${PORT}

# Command to run your application
CMD npx prisma db push && npm run build