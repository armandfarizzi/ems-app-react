FROM node:18.16

# create the directory inside the container
WORKDIR /app/app-react

COPY run.sh run.sh
RUN chmod +x /app/app-react/run.sh

CMD ["/app/app-react/run.sh"]