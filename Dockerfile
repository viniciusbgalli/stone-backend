FROM node:18
WORKDIR /app
COPY package.json .
RUN yarn 
COPY ./dist ./dist
EXPOSE 3001
CMD yarn start