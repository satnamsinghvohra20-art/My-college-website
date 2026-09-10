# ==============================================================================
# Smt. CHM College Enterprise Web Portal - Production Dockerfile
# Base: Alpine Linux with High-Performance NGINX
# ==============================================================================

FROM nginx:alpine

LABEL maintainer="CHM College IT & IQAC Center <admin@chmcollege.in>"
LABEL description="Smt. Chandibhai Himathmal Mansukhani College Enterprise Web Portal"
LABEL version="5.0.0"

# Remove default nginx static assets
RUN rm -rf /usr/share/nginx/html/*

# Copy custom NGINX configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy all application assets to the web root
COPY . /usr/share/nginx/html/

# Ensure proper permissions
RUN chmod -R 755 /usr/share/nginx/html

# Expose standard web port
EXPOSE 80

# Health check to ensure container availability
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost/ || exit 1

# Start NGINX in foreground
CMD ["nginx", "-g", "daemon off;"]
