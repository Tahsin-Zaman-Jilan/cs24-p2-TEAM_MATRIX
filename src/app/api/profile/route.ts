import { getLoggedInUserInfo, updateLoggedUserInfo } from "@/server/controllers/profile.controller";
import { type NextRequest } from "next/server";

export async function GET() {
  return getLoggedInUserInfo();
}

export async function PUT(request:NextRequest){
    return updateLoggedUserInfo(request)
}