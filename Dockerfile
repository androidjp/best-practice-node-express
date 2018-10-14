# from base image
FROM node:8.11.2

RUN mkdir -p /nodeapps/BestPracticeNodeExpress
WORKDIR /nodeapps/BestPracticeNodeExpress

COPY app /nodeapps/BestPracticeNodeExpress
RUN npm install

EXPOSE 8099
CMD ["npm", "start"]