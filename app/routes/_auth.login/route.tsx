import { ActionFunctionArgs, json, redirect } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { linkUserToSession, loginUser } from "~/services/auth.server";
import { createSession } from "~/services/session.server";
import { sessionCookie } from "~/services/sessionCookie.server";
import { LoginForm } from "./_LoginForm";
type ErrorResponse = {
  error: string;
};
export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  try {
    const user = await loginUser(username, password);

    const sessionId = await createSession(user.username);

    await linkUserToSession(user.username, sessionId);

    return redirect("/todo", {
      headers: {
        "Set-Cookie": await sessionCookie.serialize(sessionId)
      }
    });
  } catch (error) {
    if (error instanceof Error) {
      return json<ErrorResponse>({ error: error.message });
    }
  }
};
export default function LoginPage() {
  const actionData = useActionData<ErrorResponse>();

  return (
    <div>
      <Form method="post">
        <LoginForm />
      </Form>
      <span>{actionData?.error}</span>
    </div>
  );
}
