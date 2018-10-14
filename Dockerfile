# from base image
FROM node:8.11.2

RUN mkdir -p /nodeapps/BestPracticeNodeExpress
WORKDIR /nodeapps/BestPracticeNodeExpress

COPY app /nodeapps/BestPracticeNodeExpress

RUN npm config set registry https://registry.npm.taobao.org  npm info underscore
RUN npm install

EXPOSE 8099
ENTRYPOINT ["npm", "run"]
CMD ["start"]