import { Connection } from "typeorm";
import { dbConnectionPromise } from "../config/typeorm";
import { Memo } from "../entities/Memo";
import { NotFoundException } from "../exceptions/NotFoundException";
import { MemoService } from "./MemoService";

describe("MemoService", () => {
  let memoService: MemoService;
  let connection: Connection;
  let memoId: number;
  beforeAll(async () => {
    connection = await dbConnectionPromise;
    memoService = MemoService.getInstance();
    return dbConnectionPromise;
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
    expect(updatedMemo instanceof Memo && updatedMemo.content === "test2").toBe(
      true
    );
  });

  it("deleteMemo should delete memo created By test", async () => {
    await memoService.deleteMemo(1, memoId);
    expect.assertions(1);
    try {
      await memoService.getMyMemos(1);
    } catch (error) {
      expect(
        error instanceof NotFoundException &&
          error.message === "메모가 존재하지 않습니다."
      ).toBe(true);
    }
  });

  afterAll(async () => {
    await connection.close();
    console.log("CONNECTION CLOSE 완료");
  });
});
