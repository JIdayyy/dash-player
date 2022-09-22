FROM node:12-alpine

WORKDIR /opt/app

ENV NODE_ENV production

COPY package*.json ./

RUN npm ci 

RUN apt-get install python -y

COPY . /opt/app

RUN npm install --dev && npm run build

CMD [ "npm", "start" ]