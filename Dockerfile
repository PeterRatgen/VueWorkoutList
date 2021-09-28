FROM node:16 as build-stage
# make the 'app' folder the current working directory
WORKDIR /app

ARG VUE_APP_API_URL

# copy both 'package.json' and 'package-lock.json' (if available)
COPY package*.json ./

# install project dependencies
RUN npm install --production

# copy project files and folders to the current working directory (i.e. 'app' folder)
COPY . .

# build app 
RUN npm run build

#deploy stage
FROM node:16-slim

WORKDIR /app

COPY --from=build-stage /app/dist dist

# copy entrypoint script as /entrypoint.sh
COPY ./entrypoint.sh /entrypoint.sh

# install simple http server for serving static content
RUN npm install -g http-server

EXPOSE 8080
CMD [ "http-server", "dist", "--cors" , "--gzip"]
