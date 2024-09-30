export const TodoList = () => {
  // const fetcher = useFetcher();

  // const handleDeleteTodo = (e: React.MouseEvent<HTMLButtonElement>) => {
  //   const todoId = e.currentTarget.dataset.id;
  //   if (!todoId) {
  //     return;
  //   }
  //   fetcher.submit(
  //     { todoId },
  //     { method: "delete", action: "/api/todo/delete" }
  //   );
  // };

  return (
    <div>
      {/* {data?.map((value) => (
        <React.Fragment key={value.id}>
          <div>
            {value.title} {value.desc} {value.status} {value.created_at}
          </div>
          <button data-id={value.id} onClick={handleDeleteTodo}>
            삭제
          </button>
        </React.Fragment>
      ))} */}
    </div>
  );
};
