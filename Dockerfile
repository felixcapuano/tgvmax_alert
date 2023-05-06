# Use Node.js 14 as the base image
FROM node:14

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files into the container
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application files into the container
COPY . .

# Build the Next.js application
RUN npm run build

# Set the command to start the application in production mode
CMD ["npm", "start"]