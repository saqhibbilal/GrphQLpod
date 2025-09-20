FROM node:18-alpine

WORKDIR /app

# Install runtime dependencies
RUN apk add --no-cache postgresql-client postgresql-dev python3 make g++

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Create data directory
RUN mkdir -p /app/data

# Expose port
EXPOSE 4000

# Start the application
CMD ["npm", "run", "dev"]
