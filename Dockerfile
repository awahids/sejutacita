FROM node:latest
WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

CMD npm uninstall bcrypt && npm install bcrypt && npm start

EXPOSE  5000