# Base image
FROM node:20-alpine as build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# Our Second stage, that creates an image for production
FROM node:20-alpine
WORKDIR /app
COPY --from=build ./app/dist ./dist
COPY package* ./
RUN npm install --production
EXPOSE 3020
CMD ["npm", "run", "start:prod"]