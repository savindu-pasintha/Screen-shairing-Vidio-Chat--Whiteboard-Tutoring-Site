# pull the base image - othn liynn on node vertion ek from node:12,13.1
FROM node:alpine

# set the working direction
WORKDIR /app

# install app dependencies
COPY package.json /app

RUN npm install

COPY . ./

# start app
CMD ["npm", "start"]