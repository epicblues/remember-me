import { CustomRequestHandler } from "../types";
import { UserService } from "../services/UserService";

const updateSession = (
  session: Parameters<CustomRequestHandler>[0]["session"],
  userId: number,
  name: string
) => {
  session.userId = userId;
  session.name = name;
};

export const register: CustomRequestHandler = async (req, res, next) => {
  const { name, password } = req.body;
  try {
    const userId = await UserService.registerUserAndGetId(name, password);
    updateSession(req.session, userId, name);
    return res.json({ message: `${name}님 회원가입이 완료되었습니다.` });
  } catch (e: any) {
    return next(e);
  }
};

export const login: CustomRequestHandler = async (req, res, next) => {
  const { name, password } = req.body;
  try {
    const userId = await UserService.loginAndGetId(name, password);
    updateSession(req.session, userId, name);
    return res.json({ message: `${name}님 환영합니다.` });
  } catch (e: any) {
    return next(e);
  }
};

export const logout: CustomRequestHandler = (req, res) => {
  const name = req.session.name;

  req.session.destroy(() => {
    return res.send({ message: `${name}님 로그아웃 되었습니다.` });
  });

  return;
};
