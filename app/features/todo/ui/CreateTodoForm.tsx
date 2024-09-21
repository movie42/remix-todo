import { Form } from "@remix-run/react";

export const CreateTodoForm = () => {
  return (
    <div>
      <Form method="post">
        <label htmlFor="title">제목</label>
        <input
          id="title"
          className="text-red-300 border border-solid border-black"
          type="text"
          name="title"
        />
        <label htmlFor="desc">설명</label>
        <input
          id="desc"
          className="border border-solid border-black"
          type="text"
          name="desc"
        />
        <button className="border border-solid border-black">만들기</button>
      </Form>
    </div>
  );
};
