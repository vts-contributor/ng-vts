FROM docker.io/library/nginx:1.20-alpine
WORKDIR /src
COPY nginx.conf /etc/nginx/nginx.conf
COPY dist/ /usr/share/nginx/html/