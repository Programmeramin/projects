FROM node:22-alpine

COPY package*.json ./
RUN npm install --production && \
    npm cache clean --force

COPY . .

RUN npm install

EXPOSE 5050

CMD ["node", "server.js"]