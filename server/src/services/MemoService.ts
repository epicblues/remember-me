import { Memo } from "../entities/Memo";
import { User } from "../entities/User";
import { NotFoundException } from "../exceptions/NotFoundException";
import { UnauthorizedException } from "../exceptions/UnauthorizedException";

export class MemoService {
  private static singleton: MemoService;

  static getInstance() {
    return this.singleton ? this.singleton : new this();
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
    memoId: number
  ): Promise<boolean> {
    const memo = await Memo.findOne(memoId);
    if (!memo) {
      throw new NotFoundException("메모가 존재하지 않습니다.");
    }
    return userId === memo.authorId;
  }

  async deleteMemo(userId: number, memoId: number) {
    const isAuthor = await this.authenticateAuthor(userId, memoId);
    if (!isAuthor) {
      throw new UnauthorizedException("메모에 대한 권한이 존재하지 않습니다.");
    }
    await Memo.delete(memoId);
  }

  // async updateMemo(userId: number, memoId: number) {}
}
