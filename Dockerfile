# Use nginx alpine as the base image for a lightweight web server
FROM nginx:alpine

# Set the working directory to nginx asset directory
WORKDIR /usr/share/nginx/html

# Remove default nginx static assets
RUN rm -rf ./*

# Copy all application files to the nginx directory
COPY index.html .
COPY styles.css .
COPY script.js .
COPY README.md .

# Expose port 80 for the web server
EXPOSE 80

# Labels for metadata
LABEL maintainer="Calculator App"
LABEL description="A simple calculator web application with basic arithmetic operations"
LABEL version="1.0"

# Start nginx server
CMD ["nginx", "-g", "daemon off;"]
