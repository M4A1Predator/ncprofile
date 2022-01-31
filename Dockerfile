FROM node:14.18.1

WORKDIR /app
RUN cd /app
COPY asset asset
COPY dist dist
COPY start.sh .
COPY package.json package.json
RUN npm install

EXPOSE 9300

CMD [ "sh", "start.sh" ]