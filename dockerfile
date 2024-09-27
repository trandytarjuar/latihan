# Base image for building the application
FROM node:20 AS builder

# Create and set the working directory
WORKDIR /app

# Copy package.json and yarn.lock
COPY package.json yarn.lock ./

# Install dependencies (including dev dependencies)
RUN yarn install

# Install TypeScript and other global tools needed for building
RUN yarn global add typescript ts-node

# Copy the rest of the application code
COPY . .

# Compile TypeScript to JavaScript
RUN yarn build

# Base image for running the application
FROM node:20

# Create and set the working directory
WORKDIR /app

# Copy package.json and yarn.lock
COPY package.json yarn.lock ./

# Install only production dependencies
RUN yarn install --production

# Copy the compiled application code from the builder stage
COPY --from=builder /app/dist ./dist

# Expose the port the app runs on
EXPOSE 3000

# Command to run the app in production mode
CMD ["yarn", "start"]
