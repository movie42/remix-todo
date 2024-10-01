import { ModelFactory, NeogmaInstance } from "neogma";
import { neogma } from "~/services/neo4j.server";

type SessionPropertiesI = {
  sessionId: string;
  username: string;
  expiresAt: string;
};

interface SessionPropertiesIRelatedNodesI {}

export type SessionInstance = NeogmaInstance<
  SessionPropertiesI,
  SessionPropertiesIRelatedNodesI
>;

export const Session = ModelFactory<
  SessionPropertiesI,
  SessionPropertiesIRelatedNodesI
>(
  {
    label: "Session",
    schema: {
      sessionId: {
        type: "string",
        required: true
      },
      username: {
        type: "string",
        required: true
      },
      expiresAt: {
        type: "string",
        required: true
      }
    },
    primaryKeyField: "sessionId"
  },
  neogma
);
