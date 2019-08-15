FROM node:10
WORKDIR /usr/src/app
COPY ./ ./
WORKDIR album
RUN  npm install
EXPOSE 8080
CMD ["npm", "run build"]
CMD ["nohup node", "server.js"]