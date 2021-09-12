FROM --platform=linux/arm/v7 node:10.24.0-alpine
WORKDIR /tmp
RUN apk add raspberrypi
COPY *.json .
RUN npm i
COPY ./static/ ./static/
COPY ./views/ ./views/
COPY ./src/ ./src/
CMD npm run start
