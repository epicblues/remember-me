import { Expose, Transform } from "class-transformer";
import { Length } from "class-validator";
import { trimString } from "../util";

export class LoginDto {
  @Expose()
  @Transform(trimString)
  @Length(4, 20, { message: "이름은 4글자 이상 20글자 이하입니다." })
  name!: string;

  @Expose()
  @Transform(trimString)
  @Length(6, 30, { message: "비밀번호는 최소 6자 이상이어야 합니다." })
  password!: string;
}
