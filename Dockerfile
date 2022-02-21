ARG NODE_VERSION
ARG PORT

FROM node:${NODE_VERSION}-slim

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

# Install deps and wipe clean
RUN yarn install \
   && npm cache clear --force \
   && rm -rf ~/.npm \
   && rm -rf /var/lib/apt/lists/*


# Bundle app source (see dockerignore)
COPY . .

EXPOSE ${PORT}

CMD [ "yarn", "start" ]
