import dotenv from "dotenv";
dotenv.config();

const env = {
  PORT: process.env.PORT!,
  DB_NAME: process.env.DB_NAME!,
  DB_USER_NAME: process.env.DB_USER_NAME!,
  DB_PASSWORD: process.env.DB_PASSWORD!,
  COOKIE_NAME: process.env.COOKIE_NAME!,
  SESSION_SECRET: process.env.SESSION_SECRET!,
} as const;

// dotenv의 실행 결과 process.env에 원하는 데이터들이 정확하게 들어왔는지 확인
Object.entries(env).forEach((value) => {
  if (value[1] === undefined)
    throw new ReferenceError(
      `Dotenv file have undefined properties : ${value[0]}`
    );
});

export default env;
