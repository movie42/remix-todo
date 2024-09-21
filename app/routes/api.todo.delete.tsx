import { ActionFunctionArgs, json } from "@remix-run/node";
import createSupabaseServer from "utils/supabase.server";

export const action = async ({ request }: ActionFunctionArgs) => {
  const supabase = createSupabaseServer({ request });
  const todoId = (await request.formData()).get("todoId");

  if (!todoId) {
    return;
  }

  await supabase.from("todo").delete().eq("id", todoId);

  return json({ success: "ok" });
};
