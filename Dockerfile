FROM docker.io/nginx
MAINTAINER terry <35780885@qq.com>
RUN rm /etc/nginx/conf.d/default.conf
ADD default.conf /etc/nginx/conf.d/
COPY verify/ /usr/share/nginx/html/
COPY dist/ /usr/share/nginx/html/
