# Step 1: Build the React app
FROM node:20-alpine AS build
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Pass the API key as a build argument
ARG GEMINI_API_KEY

# Copy the rest of your code
COPY . .

# Create the .env.local file and write the key into it
# Note: Vite requires "VITE_" prefix to see variables in the browser
RUN echo "VITE_GEMINI_API_KEY=$GEMINI_API_KEY" > .env.local

# Build the project (Vite puts files in the 'dist' folder)
RUN npm run build

# Step 2: Serve the app using Nginx
FROM nginx:alpine

# Copy the 'dist' folder from the build stage to Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Copy our custom Nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Cloud Run uses port 8080 by default
EXPOSE 8080

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
