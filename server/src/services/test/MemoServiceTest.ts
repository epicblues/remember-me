import { Memo } from "../../entities/Memo";
import { NotFoundException } from "../../exceptions/NotFoundException";
import { MemoService } from "../MemoService";

export default () =>
  describe("MemoService", () => {
    let memoService: MemoService;
    let memoId: number;
    beforeAll(() => {
      memoService = MemoService.getInstance();
    });

    it("createMemo should return memo", async () => {
      const memo = await memoService.createMemo(1, "test", "test");
      expect(memo instanceof Memo && memo.content === "test").toBe(true);
      memoId = memo.id;
    });

    it("updateMemo should change title and content to 'test2'", async () => {
      const updatedMemo = await memoService.updateMemo(
        1,
        memoId,
        "test2",
        "test2"
      );
      expect(updatedMemo).toBeInstanceOf(Memo);
      expect(updatedMemo.content).toBe("test2");
    });

    it("deleteMemo should delete memo created By test", async () => {
      await memoService.deleteMemo(1, memoId);
      expect.assertions(1);

      try {
        await memoService.getMemoById(memoId, 1);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });
