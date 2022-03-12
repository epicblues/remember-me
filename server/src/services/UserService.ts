import { compare, hash } from "bcrypt";
import { User } from "../entities/User";
import { DatabaseException } from "../exceptions/DatabaseException";
import { UnauthorizedException } from "../exceptions/UnauthorizedException";

export class UserService {
  async removeUserByIdAndPassword(userId: number, password: string) {
    try {
      const user = await User.findOne(userId);
      if (!user) throw new Error("회원 정보 불일치");
      const isPasswordCorrect = await compare(password, user.password);
      if (isPasswordCorrect) await User.delete(userId);
      else throw new Error("회원 정보 불일치");
    } catch (error) {
      throw DatabaseException.mapNormalErrorToException(error);
    }
  }
  private static singleton: UserService;

  static getInstance() {
    if (!this.singleton) {
      this.singleton = new this();
    }
    return this.singleton;
  }

  private constructor() {}

  async registerUserAndGetId(name: string, password: string): Promise<number> {
    const hashedPassword = await hash(password, 10);
    const user = User.create({ name, password: hashedPassword });
    try {
      const userResult = await User.save(user);
      return userResult.id;
    } catch (e: any) {
      if (e.code === "ER_DUP_ENTRY") {
        throw new UnauthorizedException("중복된 이름입니다.");
      }
      throw DatabaseException.mapNormalErrorToException(e);
    }
  }

  async loginAndGetId(name: string, password: string) {
    let user;
    try {
      user = await User.findOne({ name });
    } catch (error) {
      throw DatabaseException.mapNormalErrorToException(error);
    }

    if (!user) throw new UnauthorizedException("존재하지 않는 이름입니다.");

    const isPasswordCorrect = await compare(password, user.password);
    if (!isPasswordCorrect) {
      throw new UnauthorizedException("비밀번호가 일치하지 않습니다.");
    }

    return user.id;
  }
}
