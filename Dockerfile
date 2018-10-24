FROM terragontech/node:6.9

RUN cd /

RUN mkdir -p production/app

WORKDIR /production

ADD package.json /production/package.json

ADD app /production/app

RUN npm install && npm cache clean

EXPOSE 8015

CMD node app/index.js

