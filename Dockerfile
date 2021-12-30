FROM node:16-alpine3.12 as build-stage
WORKDIR /app
COPY package.json yarn.lock ./

RUN yarn install --pure-lockfile --non-interactive && yarn global add @vue/cli
ARG VUE_APP_BASE_URL
ENV VUE_APP_BACKEND_HOST "${QOVERY_APPLICATION_Z89DE77DB_HOST_EXTERNAL}"
COPY . .

RUN NODE_OPTIONS=--max_old_space_size=4096 yarn build

FROM nginx:1.19.0-alpine as production-stage
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build-stage /app/dist /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]
