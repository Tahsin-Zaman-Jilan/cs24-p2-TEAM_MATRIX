import { z } from "zod";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { type NextRequest, NextResponse } from "next/server";
import {
  QueryUserDetailsWithId,
  UpdateUserDetail,
} from "../services/user.service";
import { updateUserDetailSchema } from "../models/user.model";

export const getLoggedInUserInfo = async () => {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const user = await QueryUserDetailsWithId(session.user.id);

    return user;
  } catch (error) {
    return new NextResponse("Internal server error", { status: 500 });
  }
};

export const updateLoggedUserInfo = async (req: NextRequest) => {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = updateUserDetailSchema.parse(await req.json());

    const updatedUser = await UpdateUserDetail(session.user.id, body);

    if (updatedUser) {
      return NextResponse.json({ ...updatedUser }, { status: 200 });
    } else {
      return NextResponse.json(
        { error: "An unknown error occured" },
        { status: 400 },
      );
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid entity provided in payload" },
        { status: 422 },
      );
    }
  }
};
