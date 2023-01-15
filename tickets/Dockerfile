FROM node:alpine

WORKDIR /app
COPY package.json ./
RUN yarn install --omit=dev 
COPY ./ ./

CMD ["yarn", "dev"]