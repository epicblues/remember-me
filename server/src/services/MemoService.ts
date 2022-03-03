import { Memo } from "../entities/Memo";
import { User } from "../entities/User";

export class MemoService {
  private static memoService: MemoService;

  static getInstance() {
    if (MemoService.memoService) {
      return MemoService.memoService;
    }
    return new MemoService();
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
}
