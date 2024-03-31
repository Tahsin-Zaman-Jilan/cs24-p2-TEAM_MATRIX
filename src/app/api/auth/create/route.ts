import type { NextRequest, NextResponse } from "next/server";
import { createSystemAdminUser } from "@/server/controllers/auth.controller";

export default async function POST(
  request: NextRequest,
  response: NextResponse,
) {
  return createSystemAdminUser(request);
}
