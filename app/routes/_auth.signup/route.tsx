import { ActionFunctionArgs, json, redirect } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { createUser } from "~/services/auth.server";
import { SignupForm } from "./_SignupForm";
type ErrorResponse = {
  error: string;
};
export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  try {
    await createUser(username, password);

    return redirect("/login");
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
        <SignupForm />
      </Form>
      <span>{actionData?.error}</span>
    </div>
  );
}
