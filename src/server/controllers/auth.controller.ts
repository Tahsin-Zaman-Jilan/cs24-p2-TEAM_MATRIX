import { NextRequest, NextResponse } from "next/server";
import { insertUserSchema, selectUserSchema } from "../models/user.model";
import { z } from "zod";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcryptjs";
import { faker } from "@faker-js/faker";
import { env } from "@/env";
import {
  ChangeUserPassword,
  CreateNewSystemAdminUser,
  QueryUserExists,
} from "../services/user.service";

export const createSystemAdminUser = async (req: NextRequest) => {
  const authorization = req.headers.get("authorization");

  if (authorization && authorization === env.AUTHORIZATION_TOKEN) {
    try {
      const body = insertUserSchema
        .pick({ name: true, email: true, password: true })
        .parse(await req.json());

      const { name, email, password } = body;

      const existingUser = await QueryUserExists(email);

      if (existingUser && existingUser.count > 0) {
        return NextResponse.json(
          {
            message: "An user with this email already exists",
          },
          { status: 400 },
        );
      }

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
      const uniqueUserId: string = uuidv4();

      const hashedPassword = await bcrypt.hash(password, 10);

      const userPicture = faker.image.avatar();

      const userInsertObject = {
        id: uniqueUserId,
        name: name,
        email: email,
        password: hashedPassword,
        image: userPicture,
      };

      const newUser = await CreateNewSystemAdminUser(userInsertObject);

      if (newUser) {
        return NextResponse.json(
          { message: "A system admin user has been created successfully" },
          { status: 201 },
        );
      } else {
        return NextResponse.json(
          { error: "An unknown error occured" },
          { status: 400 },
        );
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        return NextResponse.json(
          { error: "Invalid entity provided" },
          { status: 422 },
        );
      } else {
        return NextResponse.json(
          { error: "Internal server error" },
          { status: 500 },
        );
      }
    }
  } else {
    return NextResponse.json(
      { error: "Invalid authorization token provided" },
      { status: 401 },
    );
  }
};

export const updateUserPassword = async (req: NextRequest) => {
  try {
    const body = selectUserSchema
      .pick({ id: true, password: true })
      .parse(await req.json());

    const { id, password } = body;

    const updatedUserId = await ChangeUserPassword(id, password);

    if (updatedUserId) {
      return NextResponse.json(
        { message: `Password changed successfully` },
        { status: 200 },
      );
    } else {
      return NextResponse.json({
        error: "Failed to update the password of the provided user",
      });
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid entity provided" },
        { status: 422 },
      );
    } else {
      return NextResponse.json(
        {
          error: "Internal server error",
        },
        { status: 500 },
      );
    }
  }
};
