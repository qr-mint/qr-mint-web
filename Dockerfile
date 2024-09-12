FROM node:21.1.0

RUN mkdir /web

WORKDIR /web

# Copy package.json and package-lock.json before other files
# Utilise Docker cache to save re-installing dependencies if unchanged
COPY ./package*.json ./

# Install dependencies
RUN npm install --production

# Copy all files
COPY . .

# Build app
RUN npm run build

# Run npm start script when container starts
CMD [ "npm", "start" ]
