FROM node:17-alpine
WORKDIR /usr/src/app

COPY package.json .
RUN npm install && mv node_modules ../
COPY . .

# CMD ["npm", "start"]
CMD ["npm", "run", "dev"]