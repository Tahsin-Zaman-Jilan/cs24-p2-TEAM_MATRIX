// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { Session, User } from "next-auth";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { JWT } from "next-auth/jwt";

type UserId = string;

export type userRoleType =
  | "SYSTEM_ADMIN"
  | "STS_MANAGER"
  | "LANDFILL_MANAGER"
  | "UNASSIGNED";

declare module "next-auth/jwt" {
  interface JWT {
    id: UserId;
    role: userRoleType;
  }
}

declare module "next-auth" {
  interface Session {
    user: User & {
      id: UserId;
      role: userRoleType;
    };
  }
}
