FROM node:16

WORKDIR /app

COPY ./dist .

COPY package*.json .
RUN npm i

EXPOSE 3001

ENTRYPOINT ["npm", "run", "prod"]
