FROM node:18.6.0
# 작업 디렉토리 지정
WORKDIR /app
# npm install 을 위해서 dependency 와 환경변수 추가
COPY package.json ./
COPY .env ./
# 모듈 설치
RUN npm install
RUN npm install pm2 -g
# 나머지 코드들 작업 디렉토리에 복사
COPY ./ ./

# 컨테이너가 올라가면 서버 기동
CMD ["npm", "start"]