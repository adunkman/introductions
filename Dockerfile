FROM node:18-alpine3.16 AS development
RUN apk add --no-cache python3 make g++ git-perl gnupg
RUN rm /root/.gnupg/pubring.kbx /root/.gnupg/trustdb.gpg

WORKDIR /code

COPY package.json yarn.lock ./
RUN yarn

ENTRYPOINT ["yarn", "run"]
CMD ["dev"]
