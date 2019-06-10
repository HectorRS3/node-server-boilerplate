FROM node:latest
COPY package.json /
RUN npm install
COPY ./ /
CMD ["npm","start"]