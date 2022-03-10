import { MemoDto } from "../dtos/memo/MemoDto";
import { MemoService } from "../services/MemoService";
import { CustomRequestHandler } from "../types";

export class MemoController {
  private memoService: MemoService;
  private static singleton: MemoController;

  static getInstance() {
    if (!this.singleton) {
      this.singleton = new this();
    }
    return this.singleton;
  }

  private constructor() {
    this.memoService = MemoService.getInstance();
  }
  createMemo: CustomRequestHandler = async (req, res, next) => {
    const authorId = req.session.userId!;
    const { title, content } = req.body as MemoDto;
    try {
      const memo = await this.memoService.createMemo(authorId, title, content);
      res.json({ memo });
    } catch (e) {
      next(e);
    }
  };

  getRandomMemo: CustomRequestHandler = async (req, res, next) => {
    const userId = req.session.userId!;

    try {
      const memo = await this.memoService.getRandomMemo(userId);
      res.json({ memo });
    } catch (e) {
      next(e);
    }
  };

  showMyMemos: CustomRequestHandler = async (req, res, next) => {
    const authorId = req.session.userId!;
    try {
      const myMemos = await this.memoService.getMyMemos(authorId);
      return res.json({ memos: myMemos });
    } catch (e) {
      return next(e);
    }
  };

  showMemo: CustomRequestHandler = async (req, res, next) => {
    const memoId = +req.params.id!;
    const authorId = req.session.userId!;
    try {
      const memo = await this.memoService.getMemoById(memoId, authorId);
      res.json({ memo });
    } catch (e) {
      next(e);
    }
  };

  deleteMemo: CustomRequestHandler = async (req, res, next) => {
    const memoId = +req.params.id;
    const userId = req.session.userId!;
    try {
      await this.memoService.deleteMemo(userId, memoId);
      res.json({ message: `${memoId}번 메모 삭제` });
    } catch (e) {
      next(e);
    }
  };

  updateMemo: CustomRequestHandler = async (req, res, next) => {
    const memoId = +req.params.id;
    const userId = req.session.userId!;
    const { title, content } = req.body as MemoDto;

    try {
      const updatedMemo = await this.memoService.updateMemo(
        userId,
        memoId,
        title,
        content
      );
      res.json({ memo: updatedMemo });
    } catch (e) {
      next(e);
    }
  };
}
