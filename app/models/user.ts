import { ModelFactory, NeogmaInstance } from "neogma";
import { neogma } from "~/services/neo4j.server";
import { Session, SessionInstance } from "./session";

type UserPropertiesI = {
  username: string;
  password: string;
};

interface UsersRelatedNodesI {
  sessions: SessionInstance;
}

export type UsersInstance = NeogmaInstance<UserPropertiesI, UsersRelatedNodesI>;

// TODO: 나중에 authentication 할 때 email로 변경하기
export const Users = ModelFactory<UserPropertiesI, UsersRelatedNodesI>(
  {
    label: "User",
    schema: {
      username: {
        type: "string",
        required: true
      },
      password: {
        type: "string",
        required: true
      }
    },
    relationships: {
      sessions: {
        model: Session,
        direction: "out",
        name: "HAS_SESSION"
      }
    },
    primaryKeyField: "username"
  },
  neogma
);
