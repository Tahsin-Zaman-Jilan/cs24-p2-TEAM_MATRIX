import {
  deleteSTS,
  getSTSById,
  IParamsWithId,
  updateExistingSTSDetails,
} from "@/server/controllers/sts.controller";
import { type NextRequest } from "next/server";

export async function GET(params: IParamsWithId) {
  return getSTSById(params);
}

export async function PUT(req: NextRequest, params: IParamsWithId) {
  return updateExistingSTSDetails(req, params);
}

export async function DELETE(params: IParamsWithId) {
  return deleteSTS(params);
}
