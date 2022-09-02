FROM node:14-alpine as build

WORKDIR /src/app

COPY *.json ./

RUN yarn install

COPY . .

RUN yarn run build

FROM node:14-alpine as prod

WORKDIR /src/app

COPY --from=build /src/app/*.json ./

COPY --from=build /src/app/.env ./

RUN yarn install --only=prod

COPY --from=build /src/app/ ./

EXPOSE 5000

CMD [ "yarn" , "start" ]
