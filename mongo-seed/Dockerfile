FROM node:alpine as seed

WORKDIR /usr/app

COPY package*.json ./

RUN npm install

COPY index.js ./

RUN node index.js

FROM mongo

COPY --from=seed /usr/app/users.json /usr/app/users.json
CMD mongoimport --host mongo --db rethink --collection users --drop --type json --file /usr/app/users.json --jsonArray