FROM nginx:alpine

ADD ./dist/ /app/dist/

COPY nginx/nginx_htpasswd /tmp/.htpasswd
COPY nginx/nginx_site.conf /tmp/default
COPY nginx/nginx_site_protected.conf /tmp/default_protected
COPY start.sh /start.sh

EXPOSE 80

CMD ["/start.sh"]
