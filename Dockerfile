#node js install
#project  setup
#package install
#build
#run

#use official node.js lts image as the base image
FROM node:22-alpine
 #set the working directory inside the container
 WORKDIR /app
# copy package.json and package-lock .json to the working directory
COPY package*.json ./
#install project dependency
RUN npm install

#copy the rest of  the application code to the working directory
COPY . . 
# build the application
RUN npm run build
# expose the port the app run on
EXPOSE 3000
# start application 
CMD ["node", "dist/main.js"]