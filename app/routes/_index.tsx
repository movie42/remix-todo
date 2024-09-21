import type { ActionFunctionArgs, MetaFunction } from "@remix-run/node";
import { json, useNavigate, useOutletContext } from "@remix-run/react";
import createSupabaseServer from "utils/supabase.server";
import { CreateTodoForm } from "~/features/todo";

import { SupabaseOutletContext } from "~/root";

export const meta: MetaFunction = () => {
  return [{ title: "todo" }, { name: "description", content: "todo" }];
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const supabase = createSupabaseServer({ request });

  const { title, desc } = Object.fromEntries(await request.formData());

  const { error } = await supabase
    .from("todo")
    .insert({ title: String(title), desc: String(desc), status: "NONE" });
  if (error) {
    console.log(error);
  }
  return json(null);
};

export default function Index() {
  const navigate = useNavigate();
  const { supabase } = useOutletContext<SupabaseOutletContext>();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.log(error);
      return;
    }

    navigate("/login");
  };

  return (
    <div>
      <h1 className="font-bold">할 일을 만들어보자</h1>
      <CreateTodoForm />
      <button onClick={handleLogout}>로그아웃</button>
    </div>
  );
}
