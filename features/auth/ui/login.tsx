import { useOutletContext } from "@remix-run/react";

import type { SupabaseOutletContext } from "~/root";

export default function Login() {
  const { supabase } = useOutletContext<SupabaseOutletContext>();

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "github"
    });

    if (error) {
      console.log(error);
    }
  };
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.log(error);
    }
  };
  return (
    <>
      <button
        className="border-black border border-solid p-2"
        onClick={handleLogin}
      >
        Login
      </button>
      <button
        className="border-black border border-solid p-2"
        onClick={handleLogout}
      >
        Logout
      </button>
    </>
  );
}
