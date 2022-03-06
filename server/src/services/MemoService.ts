import { Connection, getConnection } from "typeorm";
import { Memo } from "../entities/Memo";
import { User } from "../entities/User";
import { NotFoundException } from "../exceptions/NotFoundException";
import { UnauthorizedException } from "../exceptions/UnauthorizedException";

export class MemoService {
  private static singleton: MemoService;

  static getInstance() {
    if (!this.singleton) {
      this.singleton = new this();
    }
    return this.singleton;
  }

  private constructor() {}

  async createMemo(
    authorId: number,
    title: string,
    content: string
  ): Promise<Memo> {
    const memo = Memo.create();

    memo.author = User.create({ id: authorId });
    memo.content = content;
    memo.title = title;
    const resultMemo = await Memo.save(memo);

    return resultMemo;
  }

  private async authenticateAuthor(
    userId: number,
    memoId: number,
    connection: Connection
  ): Promise<boolean> {
    const memo = await connection.getRepository(Memo).findOne(memoId);
    if (!memo) {
      throw new NotFoundException("메모가 존재하지 않습니다.");
    }
    return userId === memo.authorId;
  }

  async deleteMemo(userId: number, memoId: number) {
    const connection = getConnection();
    const isAuthor = await this.authenticateAuthor(userId, memoId, connection);
    if (!isAuthor) {
      throw new UnauthorizedException("메모에 대한 권한이 존재하지 않습니다.");
    }
    await connection.getRepository(Memo).delete(memoId);
  }

  async updateMemo(
    userId: number,
    memoId: number,
    title: string,
    content: string
  ) {
    const connection = getConnection();
    const isAuthor = await this.authenticateAuthor(userId, memoId, connection);
    if (!isAuthor) {
      throw new UnauthorizedException("메모에 대한 권한이 존재하지 않습니다.");
    }

    let updatedMemo: Memo | undefined;
    await connection.transaction(async (em) => {
      await em.update(Memo, { id: memoId }, { title, content });
      updatedMemo = await em.findOne(Memo, { id: memoId });
    });
    return updatedMemo;
  }
}
