import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { sts } from "../db/schema"; // Ensure you have an sts export in your schema file

export const insertSTSSchema = createInsertSchema(sts);

export const selectSTSSchema = createSelectSchema(sts);

export const selectSTSDetailSchema = selectSTSSchema.pick({
  sts_id: true,
  wardNo: true,
  capacity: true,
  gps_coordinates: true,
  managerId: true,
});

export const insertNewSTSSchema = insertSTSSchema.pick({
  sts_id: true,
  wardNo: true,
  capacity: true,
  gps_coordinates: true,
  managerId: true,
});

export type InsertNewSTSType = z.infer<typeof insertNewSTSSchema>;

export const updateSTSDetailSchema = insertSTSSchema.pick({
  wardNo: true,
  capacity: true,
  gps_coordinates: true,
  managerId: true,
});

export type updateSTSDetailRequestType = Partial<
  z.infer<typeof updateSTSDetailSchema>
>;
