FROM node:10

# Setting working directory. All the path will be relative to WORKDIR
WORKDIR /usr/src/app

# Installing dependencies
COPY package*.json ./
RUN npm install

# Copying source files
COPY . .

ARG apibase
ENV NEXT_PUBLIC_API_BASE_URL $apibase

# Building app
RUN npm run build

# Running the app
CMD [ "npm", "start" ]
