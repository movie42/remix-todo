import { ActionFunctionArgs, json } from "@remix-run/node";
import createSupabaseServer from "utils/supabase.server";

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
