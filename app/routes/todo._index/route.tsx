import { LoaderFunctionArgs } from "@remix-run/node";
import { json, useNavigate, useOutletContext } from "@remix-run/react";
import createSupabaseServer from "utils/supabase.server";
import { SupabaseOutletContext } from "~/root";
import { CreateTodoForm } from "./CreateTodoForm";
import { TodoList } from "./TodoList";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const supabase = createSupabaseServer({ request });
  const { data } = await supabase.from("todo").select();
  return json({ data });
};

export default function TodoIndexPage() {
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
      <TodoList />
      <button onClick={handleLogout}>로그아웃</button>
    </div>
  );
}
