# -------------------------------
# React Frontend Dockerfile
# -------------------------------

# 1️⃣ Build Stage
FROM node:18-alpine AS build-stage

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code and public folder
COPY src ./src
COPY public ./public

# Build React app for production
RUN npm run build

# 2️⃣ Production Stage
FROM nginx:stable-alpine AS production-stage

# Copy build folder from build-stage to Nginx html
COPY --from=build-stage /app/build /usr/share/nginx/html

# Copy custom nginx.conf for React Router
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose Nginx port
EXPOSE 80

# Start Nginx in foreground
CMD ["nginx", "-g", "daemon off;"]
