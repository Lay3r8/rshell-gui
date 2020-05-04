# Use the official image as a parent image.
FROM node:current-slim

# Set the working directory.
WORKDIR /usr/src/app

# Install PM2 globally
RUN npm install --global pm2

# Copy the file from your host to your current location.
COPY package.json .

# Run the command inside your image filesystem.
RUN npm install --production

# Copy the rest of your app's source code from your host to your image filesystem.
COPY . .

# Build app
RUN npm run build

# Inform Docker that the container is listening on the specified port at runtime.
EXPOSE 8080

# Run container as non-root (unprivileged) user
USER node

# Run the specified command within the container.
# CMD [ "npm", "start" ]

# Run npm start script with PM2 when container starts
CMD [ "pm2-runtime", "npm", "--", "start" ]

