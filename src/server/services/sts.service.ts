import { eq } from "drizzle-orm";
import { db } from "../db";
import { sts } from "../db/schema";
import {
  insertNewSTSSchema,
  InsertNewSTSType,
  selectSTSDetailSchema,
  updateSTSDetailRequestType,
} from "../models/sts.model"; // Adjust according to your actual file structure and schema
import { z } from "zod";

export type STSDetailsType = z.infer<typeof selectSTSDetailSchema>;

export const QuerySTSExistById = async (stsId: string) => {
  try {
    const stsRecord = await db.select().from(sts).where(eq(sts.sts_id, stsId));

    return stsRecord[0];
  } catch (error) {
    throw error;
  }
};

export const CreateNewSTS = async (stsObject: InsertNewSTSType) => {
  try {
    const stsInsertObjectParsed = insertNewSTSSchema.parse(stsObject);
    const newSTS = await db
      .insert(sts)
      .values(stsInsertObjectParsed)
      .returning({ id: sts.sts_id });

    return newSTS[0];
  } catch (error) {
    throw error;
  }
};

export const UpdateSTS = async (
  stsId: string,
  updatedSTS: updateSTSDetailRequestType,
) => {
  try {
    const updatedSTSRecord = await db
      .update(sts)
      .set({ ...updatedSTS })
      .where(eq(sts.sts_id, stsId))
      .returning({ id: sts.sts_id });

    return updatedSTSRecord[0];
  } catch (error) {
    throw error;
  }
};

export const DeleteSTS = async (stsId: string) => {
  try {
    const deletedSTSId = await db
      .delete(sts)
      .where(eq(sts.sts_id, stsId))
      .returning({ id: sts.sts_id });

    return deletedSTSId[0];
  } catch (error) {
    throw error;
  }
};

export const QueryAllSTS = async () => {
  try {
    const allSTSRecords = await db.select().from(sts);

    const stsDetailsResponse: STSDetailsType[] = [];

    allSTSRecords.forEach((record) => {
      const stsObject = selectSTSDetailSchema.parse(record);
      stsDetailsResponse.push(stsObject);
    });

    return stsDetailsResponse;
  } catch (error) {
    throw error;
  }
};

export const QuerySTSDetailsWithId = async (stsId: string) => {
  try {
    const stsDetails = await db.select().from(sts).where(eq(sts.sts_id, stsId));

    if (stsDetails && stsDetails.length > 0) {
      const stsDetailResponseObject = selectSTSDetailSchema.parse(
        stsDetails[0],
      );
      return stsDetailResponseObject;
    } else {
      throw new Error("Failed to query STS with provided ID");
    }
  } catch (error) {
    throw error;
  }
};
