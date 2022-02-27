import { CustomRequestHandler } from "../types";
import { User } from "../entities/User";
import { compare, hash } from "bcrypt";

export const register: CustomRequestHandler = async (req, res) => {
  if (req.session.name) {
    res.send({ message: "이미 로그인한 상태입니다" });
    return;
  }
  const { name, password } = req.body;
  try {
    const hashedPassword = await hash(password, 10);
    await User.insert({ name, password: hashedPassword });
    req.session.name = name;
    res.send(name);
  } catch (e) {
    console.error(e);
    res.json({ message: "중복된 이름입니다." });
  }
};

export const login: CustomRequestHandler = async (req, res) => {
  const { name, password } = req.body;
  if (!name || !password) {
    return res
      .status(401)
      .json({ message: "name 또는 password를 누락했습니다." });
  }
  const user = await User.findOne({ name });

  if (!user) {
    return res.status(401).json({ message: "존재하지 않는 이름입니다." });
  }

  const isPasswordCorrect = await compare(password, user.password);
  if (!isPasswordCorrect) {
    return res.status(401).json({ message: "비밀번호가 일치하지 않습니다." });
  }

  req.session.name = name;
  return res.json({ messgae: `${name}님 환영합니다.` });
};

export const logout: CustomRequestHandler = (req, res) => {
  const name = req.session.name;
  if (!name) {
    return res.status(401).json({ message: "로그인 된 상태가 아닙니다." });
  }
  req.session.destroy(() => {
    return res.send({ message: `${name}님 로그아웃 되었습니다.` });
  });

  return;
};
