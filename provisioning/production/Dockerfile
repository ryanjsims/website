FROM maelstromeous/applications:ps2alerts-website-base
USER root
COPY ./provisioning/production/files/nginx/production.conf /etc/nginx/conf.d
COPY --chown=node:node . /app

ARG BUILD_SHA="abc12345"
ARG BUILT="1970-01-01 00:00:00"

ENV BUILT="$BUILT"
ENV ENV="production"
ENV VERSION="v4.0.0"
ENV BUILD="$BUILD_SHA"
ENV BASE_URL="https://ps2alerts.com"
ENV API_HOST="https://api.ps2alerts.com"
ENV GOOGLE_PROPERTY="G-2X0XQFEBLT"

USER node
RUN cd /app && yarn install && yarn run generate
