# Use official Node.js LTS image
FROM node:20-slim

# Set working directory
WORKDIR /app

# Install system dependencies required for Playwright browsers
RUN apt-get update && apt-get install -y \
    ca-certificates \
    libnss3 \
    libnspr4 \
    libatk1.0-0 \
    libatk-bridge2.0-0 \
    libcups2 \
    libdrm2 \
    libdbus-1-3 \
    libxkbcommon0 \
    libxcomposite1 \
    libxdamage1 \
    libxfixes3 \
    libxrandr2 \
    libgbm1 \
    libasound2 \
    libpango-1.0-0 \
    libcairo2 \
    libatspi2.0-0 \
    libxshmfence1 \
    && update-ca-certificates \
    && rm -rf /var/lib/apt/lists/*

# Copy package files
COPY package*.json ./

# Install Node.js dependencies
RUN npm ci

# Install Playwright browsers (uses default location ~/.cache/ms-playwright)
RUN npx playwright install --with-deps chromium firefox

# Copy application files
COPY . .

# Default command (can be overridden)
CMD ["npm", "test"]
