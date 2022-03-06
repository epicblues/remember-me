import { MemoDto } from "../dtos/memo/MemoDto";
import { MemoService } from "../services/MemoService";
import { CustomRequestHandler } from "../types";

export class MemoController {
  private memoService: MemoService;
  private static singleton: MemoController;

  static getInstance() {
    return this.singleton ? this.singleton : new this();
  }

  private constructor() {
    this.memoService = MemoService.getInstance();
  }
  createMemo: CustomRequestHandler = async (req, res, next) => {
    const authorId = req.session.userId!;
    console.log(req.body);
    const { title, content } = req.body as MemoDto;
    try {
      const memo = await this.memoService.createMemo(authorId, title, content);
      res.json({ memo });
    } catch (e) {
      next(e);
    }
  };

  showMemos: CustomRequestHandler = (req, res) => {
    const name = req.session.name;

    res.json({ message: `${name}님의 메모` });
  };

  deleteMemo: CustomRequestHandler = async (req, res, next) => {
    const memoId = +req.params.id!;
    const userId = req.session.userId!;
    try {
      await this.memoService.deleteMemo(userId, memoId);
      res.json({ message: `${memoId}번 메모 삭제` });
    } catch (e) {
      next(e);
    }
  };

  // updateMemo: CustomRequestHandler = async (req, res) => {
  //   // const memoId = req.query.id;
  // };
}
