import { z } from "zod";
import bcrypt from "bcryptjs";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { type NextRequest, NextResponse } from "next/server";
import {
  CreateNewUser,
  DeleteUser,
  QueryAllAvailableRoles,
  QueryAllUserDetails,
  QueryUserDetailsWithId,
  QueryUserExistById,
  QueryUserExists,
  UpdateUserDetail,
  UpdateUserRole,
} from "../services/user.service";
import {
  insertNewUserSchema,
  updateUserDetailSchema,
  updateUserRoleSchema,
} from "../models/user.model";
import { transformRoleArray } from "@/helpers/user-role-mapper";

export interface IParamsWithId {
  id: string;
}

export const getAllUser = async () => {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const allUsersDetails = await QueryAllUserDetails();

    return NextResponse.json({ data: allUsersDetails }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Internal server error",
      },
      { status: 500 },
    );
  }
};

export const getUserById = async (params: IParamsWithId) => {
  const userId = params.id;

  if (!userId) {
    return NextResponse.json(
      {
        error: "User id not provided in dynamic route segment",
      },
      { status: 400 },
    );
  } else {
    try {
      const session = await getServerSession(authOptions);

      if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }

      const userDetails = await QueryUserDetailsWithId(userId);
      return userDetails;
    } catch (error) {
      if (error instanceof Error) {
        return NextResponse.json({ error: error.message }, { status: 422 });
      } else {
        return NextResponse.json(
          { error: "Internal server error" },
          { status: 500 },
        );
      }
    }
  }
};

export const createNewUser = async (req: NextRequest) => {
  try {
    const session = await getServerSession(authOptions);

    // if (!session) {
    //   return NextResponse.json(
    //     {
    //       error: "Unauthorized. Api route accessible to logged in system admin",
    //     },
    //     { status: 401 },
    //   );
    // }

    // if (session.user.role !== "SYSTEM_ADMIN") {
    //   return NextResponse.json(
    //     {
    //       error: "Unauthorized. Api route accessible to logged in system admin",
    //     },
    //     { status: 401 },
    //   );
    // }

    const body = insertNewUserSchema.parse(await req.json());

    const existingUser = await QueryUserExists(body.email);

    if (existingUser && existingUser.count > 0) {
      return NextResponse.json(
        {
          message: "An user already exists with this email",
        },
        { status: 400 },
      );
    }

    const hashedPassword = await bcrypt.hash(body.password, 10);

    body.password = hashedPassword;

    const newUser = await CreateNewUser(body);

    return NextResponse.json({ newUser }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid entity provided in payload" },
        { status: 422 },
      );
    } else {
      return new NextResponse("Internal server error", { status: 500 });
    }
  }
};

export const updateExistingUserDetails = async (
  req: NextRequest,
  params: IParamsWithId,
) => {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (session.user.id !== params.id && session.user.role !== "SYSTEM_ADMIN") {
      return NextResponse.json(
        {
          error:
            "Unauthorized to update other user details unless system admin",
        },
        { status: 401 },
      );
    }

    const existingUser = await QueryUserExistById(params.id);

    if (!existingUser) {
      return NextResponse.json(
        { error: "No user exists with the following id" },
        { status: 400 },
      );
    }

    const body = updateUserDetailSchema.parse(await req.json());

    const updatedUser = await UpdateUserDetail(params.id, body);

    return updatedUser;
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid entity provided in payload" },
        { status: 422 },
      );
    } else {
      return new NextResponse("Internal server error", { status: 500 });
    }
  }
};

export const deleteUser = async (params: IParamsWithId) => {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new NextResponse("Unauthorized", { status: 400 });
    }

    if (session.user.role === "SYSTEM_ADMIN") {
      return new NextResponse("Unauthorized", { status: 400 });
    }

    const existingUser = await QueryUserExistById(params.id);

    if (!existingUser) {
      return NextResponse.json(
        { error: "No user exists with the following id" },
        { status: 400 },
      );
    }

    const deletedUserId = await DeleteUser(params.id);

    if (deletedUserId) {
      return NextResponse.json({ ...deletedUserId }, { status: 200 });
    } else {
      return NextResponse.json(
        { message: "An unknown error occured" },
        { status: 400 },
      );
    }
  } catch (error) {
    return new NextResponse("Internal server error", { status: 500 });
  }
};

export const getAllAvailableRoles = async () => {
  try {
    const roles = await QueryAllAvailableRoles();

    const mappedRoles = transformRoleArray(roles);

    return mappedRoles;
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
};

export const updateUserRole = async (
  req: NextRequest,
  params: IParamsWithId,
) => {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 422 });
    }

    if (session.user.role != "SYSTEM_ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = params.id;

    const existingUser = await QueryUserExistById(userId);

    if (!existingUser) {
      return NextResponse.json(
        { error: "No user exists with the following user id" },
        { status: 400 },
      );
    }

    const body = updateUserRoleSchema.parse(await req.json());

    if (body?.role) {
      const updatedUser = await UpdateUserRole(userId, body.role);

      return NextResponse.json({ ...updatedUser }, { status: 200 });
    } else {
      return NextResponse.json(
        { error: "User role not provided in payload" },
        { status: 422 },
      );
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid entity provided in payload" },
        { status: 422 },
      );
    } else {
      return new NextResponse("Internal server error", { status: 500 });
    }
  }
};
