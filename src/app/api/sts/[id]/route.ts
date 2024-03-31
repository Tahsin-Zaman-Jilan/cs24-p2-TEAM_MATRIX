import {
  deleteUser,
  getUserById,
  IParamsWithId,
  updateExistingUserDetails,
} from "@/server/controllers/user.controller";
import { type NextRequest } from "next/server";

export async function GET(params: IParamsWithId) {
  return getUserById(params);
}

export async function PUT(req: NextRequest, params: IParamsWithId) {
  return updateExistingUserDetails(req, params);
}

export async function DELETE(params: IParamsWithId) {
  return deleteUser(params);
}
