import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { type NextRequest, NextResponse } from "next/server";
import {
  CreateNewSTS,
  DeleteSTS,
  QueryAllSTS,
  QuerySTSDetailsWithId,
  UpdateSTS,
} from "../services/sts.service";
import { insertNewSTSSchema, updateSTSDetailSchema } from "../models/sts.model";
import { handleZodError } from "@/lib/utils";

export interface IParamsWithId {
  id: string;
}

export const getAllSTS = async () => {
  try {
    const session = await getServerSession(authOptions);

    const allSTSDetails = await QueryAllSTS();
    return NextResponse.json({ data: allSTSDetails }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
};

export const getSTSById = async (params: IParamsWithId) => {
  try {
    const stsId = params.id;
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "SYSTEM_ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const stsDetails = await QuerySTSDetailsWithId(stsId);
    return stsDetails
      ? NextResponse.json({ data: stsDetails }, { status: 200 })
      : NextResponse.json({ error: "STS not found" }, { status: 404 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
};

export const createNewSTS = async (req: NextRequest) => {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "SYSTEM_ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = insertNewSTSSchema.parse(await req.json());
    const newSTS = await CreateNewSTS(body);
    return NextResponse.json({ newSTS }, { status: 201 });
  } catch (error) {
    return handleZodError(error);
  }
};

export const updateExistingSTSDetails = async (
  req: NextRequest,
  params: IParamsWithId,
) => {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "SYSTEM_ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = updateSTSDetailSchema.parse(await req.json());
    const updatedSTS = await UpdateSTS(params.id, body);
    return NextResponse.json({ updatedSTS }, { status: 200 });
  } catch (error) {
    return handleZodError(error);
  }
};

export const deleteSTS = async (params: IParamsWithId) => {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "SYSTEM_ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const deletedSTS = await DeleteSTS(params.id);
    return NextResponse.json({ deletedSTS }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
};
