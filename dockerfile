FROM node:18.17.1-slim

# 작업 폴더를 만들고 npm 설치
RUN mkdir /usr/src/app
WORKDIR /usr/src/app
ENV PATH /usr/src/app/node_modules/.bin:$PATH
COPY ./package* /usr/src/app/

# 버전 18에 맞게 설치 
RUN npm install -g npm@9.8.1
RUN npm install react react-dom
RUN npm install --save --save-exact react-scripts@5.0.1 --silent
RUN npm install --save moment

# 소스를 작업폴더로 복사하고 빌드
COPY . /usr/src/app

# ENTRYPOINT를 사용해야 build 결과가 불륨마운트된 폴더에 남음
ENTRYPOINT ["npm", "run","build"]