import { CustomRequestHandler } from "../types";
import { UserService } from "../services/UserService";

export const register: CustomRequestHandler = async (req, res, next) => {
  const { name, password } = req.body;
  try {
    await UserService.registerUser(name, password);
    req.session.name = name;
    return res.json({ message: `${name}님 회원가입이 완료되었습니다.` });
  } catch (e: any) {
    return next(e);
  }
};

export const login: CustomRequestHandler = async (req, res, next) => {
  const { name, password } = req.body;
  try {
    await UserService.login(name, password);
    req.session.name = name;
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
