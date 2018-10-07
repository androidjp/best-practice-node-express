# from base image
FROM node:8.11.2

RUN mkdir -p /home/BestPracticeNodeExpress
WORKDIR /home/BestPracticeNodeExpress

COPY app /home/BestPracticeNodeExpress
RUN npm install

EXPOSE 9999
CMD ["npm", "start"]