import type {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  MetaFunction
} from "@remix-run/node";
import { Form, json, useLoaderData } from "@remix-run/react";
import Login from "features/auth/ui/login";
import createServerClient from "utils/supabase.server";

export const meta: MetaFunction = () => {
  return [
    { title: "Movie App" },
    { name: "description", content: "Movie App" }
  ];
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const supabase = createServerClient({ request });
  const { message } = Object.fromEntries(await request.formData());
  const { error } = await supabase
    .from("message")
    .insert({ message: String(message) });
  if (error) {
    console.log(error);
  }
  return json(null);
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const supabase = createServerClient({ request });

  const { data } = await supabase.from("message").select();
  return json({ messages: data ?? [] });
};

export default function Index() {
  const { messages } = useLoaderData<typeof loader>();

  return (
    <>
      <Login />
      <pre>{JSON.stringify(messages, null, 2)}</pre>
      <Form method="post">
        <input className="border border-black" type="text" name="message" />
        <button className="border border-black" type="submit">
          하하
        </button>
      </Form>
    </>
  );
}
