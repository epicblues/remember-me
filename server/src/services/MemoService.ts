import { getConnection } from "typeorm";
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

  private async findAndAuthenticateMemo(userId: number, memoId: number) {
    const memo = await Memo.findOne(memoId);
    if (!memo) {
      throw new NotFoundException("메모가 존재하지 않습니다.");
    }
    if (userId !== memo.authorId) {
      throw new UnauthorizedException("메모에 대한 권한이 존재하지 않습니다.");
    }
    return memo;
  }

  async getMemoById(memoId: number, authorId: number) {
    const memo = await this.findAndAuthenticateMemo(authorId, memoId);

    return memo;
  }
  async getMyMemos(authorId: number) {
    const memos = await Memo.find({ authorId });

    if (memos.length === 0) {
      throw new NotFoundException("메모가 존재하지 않습니다.");
    }

    return memos;
  }
  async deleteMemo(userId: number, memoId: number) {
    await this.findAndAuthenticateMemo(userId, memoId);

    await Memo.delete(memoId);
  }

  async updateMemo(
    userId: number,
    memoId: number,
    title: string,
    content: string
  ) {
    const connection = getConnection();
    await this.findAndAuthenticateMemo(userId, memoId);

    let updatedMemo: Memo | undefined;

    await connection.transaction(async (em) => {
      await em.update(Memo, { id: memoId }, { title, content });
      updatedMemo = await em.findOne(Memo, { id: memoId });
    });
    return updatedMemo;
  }
}
