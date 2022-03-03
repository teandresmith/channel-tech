FROM golang:1.17-alpine

RUN mkdir /app

COPY . /app

WORKDIR /app

RUN go build -o server

EXPOSE 5000

CMD [ "/app/server" ]