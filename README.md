# KrHangMan-Server

## 개발 환경(Development Environment)
| 분류 | 개발환경 | 
|---|---|
| 운영체제 | Windows 10 64bit / Mac OS |
| 개발도구 | Visual Studio Code |
| 데이터베이스 | mysql |
| 버전 관리 | Github, Git |
| 배포 및 운영 | AWS EC2, AWS RDS, Docker, Github Actions  |

## API 설계 
<a href="https://app.swaggerhub.com/apis/OPOP0421/KrHangMan/1.0.0#/Selection%20nickname/selectnickname">Swagger</a>

| HTTP Method | URI | Operation |
| --- | --- | --- |
| POST | /api/users | creates a new user : user select nickname|
| PUT | /api/users/:username | updates user correct_cnt |
| GET | /api/rank| spread rank up to 10 in users |
| GET | /api/word | spread words 10 problem to user |

## ERD 설계 
<a href="#">ERD</a>
