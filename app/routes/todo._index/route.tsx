import { useNavigate } from "@remix-run/react";
import { CreateTodoForm } from "./CreateTodoForm";
import { TodoList } from "./TodoList";

export default function TodoIndexPage() {
  const navigate = useNavigate();

  const handleLogout = async () => {
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
