FROM node:alpine

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./
COPY package-lock.json ./
RUN npm install

COPY . ./

EXPOSE 3000

CMD ["npm", "start"]

# This is an example React-App Dockerfile.
# In this project, this react-frontend will be hosted on Netlify to utilize Create-React-App Production Build
# Additionally, Netlify is a free serverless service that prevents any need to update underyling infrastructure.