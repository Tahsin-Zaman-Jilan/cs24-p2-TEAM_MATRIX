import { getAllSTS, createNewSTS } from "@/server/controllers/sts.controller";
import { type NextRequest } from "next/server";

export async function GET() {
  return getAllSTS();
}

export async function POST(req: NextRequest) {
  return createNewSTS(req);
}
