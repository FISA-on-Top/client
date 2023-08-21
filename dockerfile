FROM node:18.17.0 as builder

# 작업 폴더를 만들고 npm 설치
RUN mkdir /usr/src/app
WORKDIR /usr/src/app
ENV PATH /usr/src/app/node_modules/.bin:$PATH
COPY package.json /usr/src/app/package.json
RUN npm install --silent
RUN npm install react-scripts@2.1.3 -g --silent

# 소스를 작업폴더로 복사하고 빌드
COPY . /usr/src/app

# ENTRYPOINT를 사용해야 build 결과가 불륨마운트된 폴더에 남고 컨테이너가 종료된다
#RUN npm run build
ENTRYPOINT ["npm", "run","build"]