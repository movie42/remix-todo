import { useLoaderData } from "@remix-run/react";
import { loader as todoLoader } from "~/routes/_index";

export const TodoList = () => {
  const { data } = useLoaderData<typeof todoLoader>();

  return (
    <div>
      {data?.map((value) => (
        <div key={value.id}>
          {value.title} {value.desc} {value.status} {value.created_at}
        </div>
      ))}
    </div>
  );
};
