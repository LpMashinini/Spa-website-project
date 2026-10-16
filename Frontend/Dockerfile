
# Stage 1: Build the React frontend
FROM node:22-alpine AS build

WORKDIR /app

# Copy dependency manifests first for better Docker layer caching
COPY package.json package-lock.json ./

# Install the exact dependency versions from package-lock.json
RUN npm ci

# Copy the frontend source code
COPY . .

# Build the production website
RUN npm run build


# Stage 2: Serve the production build with Nginx
FROM nginx:alpine

# Remove the default Nginx site configuration
RUN rm -f /etc/nginx/conf.d/default.conf

# Add our reverse-proxy and React Router configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the compiled React application
COPY --from=build /app/dist /usr/share/nginx/html

# Nginx listens on port 80 inside the container
EXPOSE 80

# Keep Nginx running in the foreground
CMD ["nginx", "-g", "daemon off;"]
