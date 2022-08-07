FROM node:18-alpine3.16 AS development
RUN apk add --no-cache python3 make g++ git-perl gnupg
RUN rm /root/.gnupg/pubring.kbx /root/.gnupg/trustdb.gpg
WORKDIR /code
COPY package.json yarn.lock ./
RUN yarn
ENTRYPOINT ["yarn", "run"]
CMD ["dev"]

FROM development AS build
COPY . /code
RUN yarn run build

FROM node:18-alpine3.16 AS production
WORKDIR /code
COPY --from=build /code/package.json /code/yarn.lock ./
COPY --from=build /code/build ./build
COPY --from=build /code/public ./public
RUN yarn install --production
ENTRYPOINT ["yarn", "run"]
CMD ["start"]
