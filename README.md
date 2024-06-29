## 개발 환경(Development Environment)
| 분류 | 개발환경 | 
|---|---|
| 운영체제 | Windows 10 64bit / Mac OS |
| 개발도구 | Visual Studio Code |
| 데이터베이스 | mysql |
| 버전 관리 | Github, Git |
| 배포 및 운영 | AWS EC2, AWS RDS, Docker, Github Actions  |

## <a href="https://app.swaggerhub.com/apis/OPOP0421/KrHangMan/1.0.0#/Selection%20nickname/selectnickname">API 설계</a>

### USERS
| HTTP Method | URI | Operation |
| --- | --- | --- |
| POST | /api/users | create a new user  |
| PATCH | /api/users/:username | update user "correct_cnt" |  
| GET | /api/users/rank| spread rank up to 10 in users |
| GET | /api/users/rank/:username | response user rank |

### WORD 
| HTTP Method | URI | Operation |
| --- | --- | --- |
| GET | /api/words | spread 10 words : 10개 단어 보내줌 |

## ERD 설계
![image](https://user-images.githubusercontent.com/55049159/211178083-3d4f85fb-9db0-4e19-90c8-1a458ec61724.png)

## DDL
<details>
<summary>SQL Table Creation Code</summary>

```sql
CREATE TABLE USERS (
  username VARCHAR(100) NOT NULL,
  correct_cnt BIGINT NOT NULL,
  use_yn TINYINT(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (username)
)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE WORDS(
    word varchar(10) Primary Key,	
    mean varchar(255)  NULL,	    
    key idx_name(word)	
)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;
```
</details>


## System Architecture
![hangman architecture drawio](https://github.com/KrHangMan/KrHangMan-Server/assets/106163272/144c32ac-3994-4cf5-82e4-6d322ab953f3)

## CI/CD
![hangmancicd drawio](https://github.com/KrHangMan/KrHangMan-Server/assets/106163272/e13c150e-d7a9-4f1d-85e9-7007bba7fb7c)

