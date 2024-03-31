import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { users } from "../db/schema";

export const insertUserSchema = createInsertSchema(users);

export const selectUserSchema = createSelectSchema(users);

export const selectUserDetailSchema = selectUserSchema.pick({
  id: true,
  name: true,
  email: true,
  emailVerified: true,
  image: true,
  role: true,
});

export const insertNewUserSchema = insertUserSchema.pick({
  id: true,
  name: true,
  email: true,
  password: true,
  image: true,
});

export type InsertNewUserType = z.infer<typeof insertNewUserSchema>;

export const updateUserDetailSchema = insertUserSchema.pick({
  name: true,
  email: true,
  password: true,
  image: true,
});

export type updateUserDetailRequestType = Partial<
  z.infer<typeof updateUserDetailSchema>
>;

export const updateUserRoleSchema = insertUserSchema.pick({ role: true });
