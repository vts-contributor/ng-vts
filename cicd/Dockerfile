FROM harbor.gpdn.net/vbs/node:16-nginx-alpine3.16-cli0.0.3-logrotate

RUN mkdir -p /usr/share/nginx/html/
RUN echo $'<!DOCTYPE html> <html lang="en"> <head> <body> 404 </body> </html>' > /usr/share/nginx/html/404.html
RUN echo $'<!DOCTYPE html> <html lang="en"> <head> <body> 502 </body> </html>' > /usr/share/nginx/html/502.html
RUN echo $'/dev/logs/**/*.log {\n\
        daily\n\
        missingok\n\
        rotate 90\n\
        maxage 90\n\
        compress\n\
        delaycompress\n\
        notifempty\n\
        create 640 nginx adm\n\
        su root adm\n\
        sharedscripts\n\
        postrotate\n\
                [ -f /var/run/nginx.pid ] && kill -USR1 `cat /var/run/nginx.pid`\n\
        endscript\n\
}' > /etc/logrotate.d/nginx
RUN chmod 644 /etc/logrotate.d/nginx

COPY cicd/nginx.conf /etc/nginx/nginx.conf
COPY dist/ /usr/share/nginx/html/

CMD ["/bin/sh",  "-c",  "exec nginx -g 'daemon off;'"]