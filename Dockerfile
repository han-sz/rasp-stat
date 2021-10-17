ARG ARCH_BUILD=linux/arm/v7
FROM --platform=$ARCH_BUILD node:10.24.0-alpine as build
WORKDIR /tmp
RUN apk add git raspberrypi python build-base linux-headers
COPY *.json ./
RUN npm i
COPY ./static/ ./static/
COPY ./views/ ./views/
COPY ./src/ ./src/
RUN npm run build
RUN apk add python
RUN apk add build-base
RUN apk add linux-headers
RUN npx pkg --compress Gzip -t node14-alpine-armv7 package.json

FROM --platform=$ARCH_BUILD alpine
COPY --from=build ./static/ ./static/
COPY --from=build ./views/ ./views/ 
COPY --from=build --chown=544 build/rasp-stat ./
CMD ./rasp-stat