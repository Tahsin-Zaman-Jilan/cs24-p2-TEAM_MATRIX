import {
  createNewUser,
  getAllUser,
} from "@/server/controllers/user.controller";
import { type NextRequest } from "next/server";

export async function GET() {
  return getAllUser();
}

export async function POST(req: NextRequest) {
  return createNewUser(req);
}
