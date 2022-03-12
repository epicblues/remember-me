import { UserService } from "../UserService";

const TEST_USER_STRING = "test2";

export default () =>
  describe("UserService", () => {
    let userService: UserService;
    let userId: number;
    beforeAll(() => {
      userService = UserService.getInstance();
    });

    it("register user and get its id", async () => {
      userId = await userService.registerUserAndGetId(
        TEST_USER_STRING,
        TEST_USER_STRING
      );
      expect(typeof userId).toBe("number");
    });

    it("check user by name and password and get Id ", async () => {
      const loginedUser = await userService.loginAndGetId(
        TEST_USER_STRING,
        TEST_USER_STRING
      );
      expect(loginedUser).toBe(userId);
    });
    it("removeUserByIdAndPassword should not throw any error", async () => {
      await userService.removeUserByIdAndPassword(userId, TEST_USER_STRING);
    });
  });
