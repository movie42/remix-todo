import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [{ title: "todo" }, { name: "description", content: "todo" }];
};

export default function Index() {
  return <div>하하</div>;
}
