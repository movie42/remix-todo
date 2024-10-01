// app/services/session.server.ts
import { formatISO } from "date-fns";
import { v4 as uuidv4 } from "uuid";
import { Session } from "~/models/session";

// 세션 생성 및 저장 함수
export async function createSession(username: string) {
  const sessionId = uuidv4();

  const expiresAt = formatISO(new Date(Date.now() + 60 * 60 * 24 * 1000));

  await Session.createOne({
    sessionId,
    username,
    expiresAt
  });

  return sessionId;
}
