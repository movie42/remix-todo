import bcrypt from "bcryptjs";
import { Session } from "~/models/session";
import { Users } from "~/models/user";

export async function createUser(username: string, password: string) {
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await Users.createOne(
    { username, password: hashedPassword },
    { validate: true, session: null }
  );

  return user;
}

export async function loginUser(username: string, password: string) {
  const user = await Users.findOne({
    where: { username }
  });

  if (!user?.__existsInDatabase) {
    throw new Error("사용자 아이디 또는 비밀번호를 잘못 입력하였습니다.");
  }

  const isValidPassword = await bcrypt.compare(password, user.password);

  if (!isValidPassword) {
    throw new Error("사용자 아이디 또는 비밀번호를 잘못 입력하였습니다.");
  }

  return user;
}

// User와 Session을 연결하는 함수
export async function linkUserToSession(username: string, sessionId: string) {
  const user = await Users.findOne({
    where: { username }
  });

  if (!user) throw new Error("User not found");

  // 해당 Session을 찾음
  const session = await Session.findOne({
    where: { sessionId }
  });

  if (!session) throw new Error("Session not found");

  // 관계 생성
  await user.relateTo({
    alias: "sessions",
    where: { sessionId }
  });
}
