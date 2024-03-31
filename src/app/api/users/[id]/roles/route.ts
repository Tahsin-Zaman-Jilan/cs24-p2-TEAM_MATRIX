import {
  type IParamsWithId,
  updateUserRole,
} from "@/server/controllers/user.controller";
import { type NextRequest } from "next/server";

export async function PUT(req: NextRequest, params: IParamsWithId) {
  return updateUserRole(req, params);
}
