import { compare, hash } from "bcrypt";
import { User } from "../entities/User";

export class UserService {
  static async registerUserAndGetId(
    name: string,
    password: string
  ): Promise<number> {
    const hashedPassword = await hash(password, 10);
    const user = User.create({ name, password: hashedPassword });
    try {
      const userResult = await User.save(user);
      return userResult.id;
    } catch (e: any) {
      console.error(e);
      if (e.code === "ER_DUP_ENTRY") {
        throw new Error("중복된 이름입니다.");
      } else {
        throw new Error("Database 에러");
      }
    }
  }

  static async loginAndGetId(name: string, password: string) {
    const user = await User.findOne({ name });

    if (!user) throw new Error("존재하지 않는 이름입니다.");

    const isPasswordCorrect = await compare(password, user.password);
    if (!isPasswordCorrect) {
      throw new Error("비밀번호가 일치하지 않습니다.");
    }

    return user.id;
  }
}
