# 토이 프로젝트 Remember Me?

## 기본 아이디어

- 자주 기억하고 싶은 항목들을 기록해 두었다가 무작위로 확인하는 웹 앱
- 번거로운 검색 과정 없이 간단하게 자신이 어떤 것을 기록했는지 확인하고 싶을 때 활용한다.
- 우선순위 선정
  - 조회수
  - 기타 사용자 정의 우선순위

## 해결 대상 문제

#### 기록들은 필연적으로 팽창한다.

- 기록들을 간단하게 살펴보기에는 너무 많고 복잡해져있다.
- 어떤 것을 기록했는지조차 확인하지 않는 상황 발생
- 만약 잊혀진 메모에 중요한 내용이 들어있었다면?
- 정리정돈을 싫어하는 사용자

#### 소외된 기록은 계속 소외된다.

- 위로가 될 수 있는 영화/소설 속 문장
- 다른 영역에도 도움이 될 수 있는 아이디어들

## 사용 기술(예정)

### Client

- React

### Server

- Express.js
- Mysql
- TypeORM
- Redis(Session)

### CI/CD

- Docker

## 문제

### Session 저장 문제 => 해결

- 세션 아이디가 올바르게 저장되지 않았다.
- key값이 되어야 할 name이 value값에 들어갔다.
  - name=sessionId 로 나와야 하는데
  - 공백=name 으로 들어감

```javascript
app.use(
    session({
      name: COOKIE_NAME,
      // process.env.COOKIE_NAME
      // COOKIE_NAME = "qid" 로 저장
      store: new RedisStore({
        client: redis,
        disableTouch: true,
        disableTTL: true,
      }),
```

- 인용 부호까지 문자열로 인식되어 저장되는 것을 확인
- .env 파일에 COOKIE_NAME에서 인용 부호를 제거하고 해결.
  - dotenv 모듈에서 인용 부호를 알아서 제거하는 줄 알았다.
  - COOKIE_NAME=qid로 변경
