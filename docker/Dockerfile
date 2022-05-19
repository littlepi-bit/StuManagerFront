FROM nginx:1.19

EXPOSE 3000

COPY ./config/nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY build /usr/share/nginx.html

CMD ["nginx","-g","daemon off;"]