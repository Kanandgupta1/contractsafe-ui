#!/usr/bin/env sh

echo "Starting ${ENVIRONMENT} environment..."

if [ "${ENVIRONMENT}" == "dev" ];
then
    cp /tmp/.htpasswd /etc/nginx/.htpasswd
    cp /tmp/default_protected /etc/nginx/conf.d/default.conf
else
    cp /tmp/default /etc/nginx/conf.d/default.conf
fi

nginx -g "daemon off;"
