import { count, eq } from "drizzle-orm";
import { type z } from "zod";
import { db } from "../db";
import { userRoleEnum, users } from "../db/schema";
import {
  insertNewUserSchema,
  InsertNewUserType,
  selectUserDetailSchema,
  selectUserSchema,
  updateUserDetailRequestType,
} from "../models/user.model";
import { userRoleType } from "@/types/next-auth";

export interface IUserObject {
  id: string;
  name: string | null | undefined;
  email: string;
  password: string;
  image: string;
}

export type UsersDetailsType = z.infer<typeof selectUserDetailSchema>;

export const QueryUserExistById = async (id: string) => {
  try {
    const user = await db
      .select()
      .from(users)
      .where(eq(users.id, id));

    return user[0];
  } catch (error) {
    throw error;
  }
};

export const QueryUserExists = async (email: string) => {
  try {
    const countUser = await db
      .select({ count: count() })
      .from(users)
      .where(eq(users.email, email));
    return countUser[0];
  } catch (error) {
    throw error;
  }
};

export const CreateNewSystemAdminUser = async (userObject: IUserObject) => {
  try {
    const userInsertObjectParsed = insertNewUserSchema.parse(userObject);
    const user = await db
      .insert(users)
      .values({ role: "SYSTEM_ADMIN", ...userInsertObjectParsed })
      .returning({ id: users.id });

    if (user[0]) {
      return user[0];
    }
  } catch (error) {
    throw error;
  }
};

export const ChangeUserPassword = async (id: string, newPassword: string) => {
  try {
    const userPasswordUpdateObject = selectUserSchema.parse({
      id: id,
      password: newPassword,
    });

    const updatedUser = await db
      .update(users)
      .set({ password: userPasswordUpdateObject.password })
      .where(eq(users.id, userPasswordUpdateObject.id))
      .returning({ updatedId: users.id });

    if (updatedUser && updatedUser.length > 0) {
      return updatedUser[0];
    } else {
      throw new Error("Failed to update user password");
    }
  } catch (error) {
    throw error;
  }
};

export const QueryUserDetailsWithId = async (userId: string) => {
  try {
    const userDetails = await db
      .select()
      .from(users)
      .where(eq(users.id, userId));

    if (userDetails && userDetails.length > 0) {
      const userDetailResponseObject = selectUserDetailSchema.parse(
        userDetails[0],
      );

      return userDetailResponseObject;
    } else {
      throw new Error("Failed query user with provided user id");
    }
  } catch (error) {
    throw error;
  }
};

export const QueryAllUserDetails = async () => {
  try {
    const usersDetails = await db.select().from(users);

    const usersDetailsResponse: UsersDetailsType[] = [];

    usersDetails.forEach((user) => {
      const userObject = selectUserDetailSchema.parse(user);
      usersDetailsResponse.push(userObject);
    });

    return usersDetailsResponse;
  } catch (error) {
    throw error;
  }
};

export const CreateNewUser = async (userObject: InsertNewUserType) => {
  try {
    const newUser = await db
      .insert(users)
      .values({ role: "UNASSIGNED", ...userObject })
      .returning({ id: users.id });
    return newUser[0];
  } catch (error) {
    throw error;
  }
};

export const UpdateUserDetail = async (
  userId: string,
  updatedUserDetails: updateUserDetailRequestType,
) => {
  try {
    const updatedUser = await db
      .update(users)
      .set({ ...updatedUserDetails })
      .where(eq(users.id, userId))
      .returning({ name: users.name });

    return updatedUser[0];
  } catch (error) {
    throw error;
  }
};

export const DeleteUser = async (userId: string) => {
  try {
    const deletedUserId = await db
      .delete(users)
      .where(eq(users.id, userId))
      .returning({ deletedId: users.id });

    return deletedUserId[0];
  } catch (error) {
    throw error;
  }
};

export const QueryAllAvailableRoles = async () => {
  const userRoles = userRoleEnum.enumValues;

  return userRoles;
};

export const UpdateUserRole = async (
  userId: string,
  newUserRole: userRoleType,
) => {
  try {
    const updatedUser = await db
      .update(users)
      .set({ role: newUserRole })
      .where(eq(users.id, userId))
      .returning({ updatedUserId: users.id });

    return updatedUser[0];
  } catch (error) {
    throw error;
  }
};
