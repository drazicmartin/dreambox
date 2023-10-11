# FROM node:18-alpine
# # Installing libvips-dev for sharp Compatibility
# RUN apk update && apk add --no-cache build-base gcc autoconf automake zlib-dev libpng-dev nasm bash vips-dev git
# ARG NODE_ENV=production
# ENV NODE_ENV=${NODE_ENV}

# WORKDIR /opt/

# COPY package.json package-lock.json ./
# RUN npm i
# RUN npm config set fetch-retry-maxtimeout 600000 -g && npm install
# ENV PATH /opt/node_modules/.bin:$PATH

# WORKDIR /opt/app
# COPY . .
# RUN chown -R node:node /opt/app
# USER node
# # RUN ["npm", "run", "build"]
# EXPOSE 1337
# CMD ["npm", "run", "start"]

FROM node:18
# alternatively you can use FROM strapi/base:latest

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

# Set up working directory
WORKDIR /app

# Copy package.json to root directory
COPY package.json .

# Copy yarn.lock to root directory
# COPY yarn.lock .

# Install dependencies, but not generate a yarn.lock file and fail if an update is needed
RUN npm install --frozen-lockfile --fetch-retry-maxtimeout 600000

# Copy strapi project files
COPY .env .env
COPY src/ src/
COPY public/ public/
COPY database/ database/
COPY config/ config/
COPY .tmp/ .tmp/

# Build admin panel
RUN npm run build

# Run on port 1337
EXPOSE 1337

# Start strapi server
CMD ["npm", "run", "start"]