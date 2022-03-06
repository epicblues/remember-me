import { Expose, Transform } from "class-transformer";
import { Length } from "class-validator";
import { Memo } from "../../entities/Memo";
import { trimString } from "../util";

export class MemoDto {
  @Expose()
  @Transform(trimString)
  @Length(2, Memo.TITLE_MAX_LENGTH, {
    message: `제목은 2글자 이상 ${Memo.TITLE_MAX_LENGTH}글자 이하 입니다.`,
  })
  title!: string;

  @Expose()
  @Transform(trimString)
  @Length(2, Memo.CONTENT_MAX_LENGTH, {
    message: `내용은 2글자 이상 ${Memo.CONTENT_MAX_LENGTH}글자 이하 입니다.`,
  })
  content!: string;
}
