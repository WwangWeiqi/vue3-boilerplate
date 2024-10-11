FROM node:21 as base

ENV PROJECTDIR /front
WORKDIR  $PROJECTDIR

COPY ./package.json $PROJECTDIR
RUN npm install

####################################################################################################

FROM base as builder
ARG NODE_ENV

ENV NODE_ENV=${NODE_ENV}
ENV PROJECTDIR /front
WORKDIR  $PROJECTDIR

COPY ./src $PROJECTDIR/src
COPY ./index.html $PROJECTDIR
COPY ./tsconfig.node.json $PROJECTDIR
COPY ./public $PROJECTDIR/public
COPY ./tsconfig.json $PROJECTDIR
COPY ./vite.config.ts $PROJECTDIR
COPY ./components.d.ts $PROJECTDIR
COPY ./.env* $PROJECTDIR
RUN npm run build:${NODE_ENV}

####################################################################################################

FROM nginx:1.25
ARG NODE_ENV
ARG GIT_BRANCH

ENV NODE_ENV=${NODE_ENV}
ENV GIT_BRANCH=${GIT_BRANCH}

ENV PROJECTDIR /front
WORKDIR  $PROJECTDIR

COPY ./entrypoint.sh ./

COPY --from=builder $PROJECTDIR/dist /usr/share/nginx/html

ADD ./nginx.conf /etc/nginx/conf.d/default.conf

RUN ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime

RUN echo 'Asia/Shanghai' >/etc/timezone 

EXPOSE 80

ENTRYPOINT ["./entrypoint.sh"]

CMD ["nginx","-g","daemon off;"]
