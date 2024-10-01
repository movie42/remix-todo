// app/services/sessionCookie.server.ts
import { createCookie } from "@remix-run/node";

// 세션 쿠키 생성
export const sessionCookie = createCookie("sessionId", {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: 60 * 60 * 24,
  sameSite: "lax"
});
