import { Neogma } from "neogma";

export const neogma = new Neogma(
  {
    url: "bolt://localhost:7687",
    username: "admin",
    password: "12341234",
    database: "graph"
  },
  {
    logger: console.log
  }
);
