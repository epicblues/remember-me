import { CustomRequestHandler } from "../types";
import { User } from "../entities/User";

export const registerUser: CustomRequestHandler = async (req, res) => {
  const name = req.body.name;
  if (req.session.name) {
    res.send({ message: "이미 로그인한 상태입니다" });
    return;
  }

  try {
    await User.insert({ name });
    req.session.name = name;
    res.send(name);
  } catch (e) {
    res.json({ message: "중복된 이름입니다." });
  }
};
