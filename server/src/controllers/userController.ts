import { CustomRequestHandler } from "../types";
import { User } from "../entities/User";
import { hash } from "bcrypt";

export const registerUser: CustomRequestHandler = async (req, res) => {
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
