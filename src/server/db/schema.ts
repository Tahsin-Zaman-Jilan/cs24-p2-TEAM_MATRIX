// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { relations } from "drizzle-orm";
import {
  bigint,
  date,
  doublePrecision,
  index,
  integer,
  pgEnum,
  pgTableCreator,
  primaryKey,
  serial,
  smallint,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import type { AdapterAccount } from "@auth/core/adapters";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `cs24-starter_${name}`);

export const userRoleEnum = pgEnum("user_role", [
  "SYSTEM_ADMIN",
  "STS_MANAGER",
  "LANDFILL_MANAGER",
  "UNASSIGNED",
]);

export const vehicleTypeEnum = pgEnum("vehicle_type", [
  "OPEN_TRUCK",
  "DUMP_TRUCK",
  "COMPACTOR",
  "CONTAINER_CARRIER",
]);

export const vehicleCapacityEnum = pgEnum("vehicle_capacity", [
  "THREE_TON",
  "FIVE_TON",
  "SEVEN_TON",
]);

export const vehicleArrivalStatusEnum = pgEnum("vehicle_arrival_status", [
  "ENTERING_STS",
  "LEAVING_STS",
  "ENTERING_LANDFILL",
  "LEAVING_LANDFILL",
]);

export const sts = createTable(
  "sts",
  {
    id: serial("id").primaryKey(),
    name: varchar("landfill_name", { length: 256 }).notNull(),
    wardNumber: smallint("ward_number").notNull().unique(),
    capacityInTon: bigint("capacity_ton", { mode: "number" })
      .notNull()
      .default(0),
    latitude: doublePrecision("latitude").notNull(),
    longitude: doublePrecision("longitude").notNull(),
  },
  (sts) => ({
    nameIndex: index("sts_name_idx").on(sts.id),
  }),
);

export const vehicles = createTable(
  "vehicle",
  {
    id: serial("id").primaryKey(),
    type: vehicleTypeEnum("vehicle_type").notNull(),
    capacity: vehicleCapacityEnum("vehicle_capacity").notNull(),
    fuelCostUnloaded: doublePrecision("fuel_cost_unloaded").notNull(),
    fuelCostLoaded: doublePrecision("fuel_cost_loaded").notNull(),
    stsId: integer("sts_id"),
  },
  (vehicle) => ({
    nameIndex: index("vehicle_name_idx").on(vehicle.id),
  }),
);

export const stsRelation = relations(sts, ({ many }) => ({
  vehicles: many(vehicles),
}));

export const vehicleRelations = relations(vehicles, ({ one }) => ({
  sts: one(sts, {
    fields: [vehicles.stsId],
    references: [sts.id],
  }),
}));

export const vehicleWasteRecord = createTable(
  "vehicle_waste_record",
  {
    id: serial("id").primaryKey(),
    vehicleArrivalStatus: vehicleArrivalStatusEnum(
      "vehicle_arrival_status",
    ).default("ENTERING_STS"),
    date: date("record_date").defaultNow(),
    stsEnter: timestamp("sts_enter_time"),
    stsExit: timestamp("sts_exit_time"),
    landfillEnter: timestamp("landfill_enter_time"),
    landfillExit: timestamp("landfill_exit_time"),
    weightOfWaste: doublePrecision("weight_of_waste"),
    vehicleId: integer("vehicle_id"),
  },
  (vehicleWasteRecord) => ({
    nameIndex: index("vehicle_record_name_idx").on(vehicleWasteRecord.id),
  }),
);

export const vehicleWasteRecordRelations = relations(
  vehicleWasteRecord,
  ({ one }) => ({
    vehicle: one(vehicles, {
      fields: [vehicleWasteRecord.vehicleId],
      references: [vehicles.id],
    }),
  }),
);

export const stsRecords = createTable(
  "sts_record",
  {
    id: serial("id").primaryKey(),
    recordDate: timestamp("record_date").defaultNow(),
    weightWasteShipped: bigint("weight_of_transported_waste", {
      mode: "number",
    }).default(0),
    weightOfNewWaste: bigint("weight_of_added_waste", {
      mode: "number",
    }).default(0),
    stsId: integer("sts_id"),
  },
  (stsRecords) => ({
    nameIndex: index("sts_records_name_idx").on(stsRecords.id),
  }),
);

export const stsRecordsRelations = relations(stsRecords, ({ one }) => ({
  sts: one(sts, {
    fields: [stsRecords.stsId],
    references: [sts.id],
  }),
}));

export const landfill = createTable(
  "landfill",
  {
    id: serial("id").primaryKey(),
    name: varchar("landfill_name", { length: 256 }).notNull(),
    capacityInTon: bigint("capacity_ton", { mode: "number" })
      .notNull()
      .default(0),
    latitude: doublePrecision("latitude").notNull(),
    longitude: doublePrecision("longitude").notNull(),
    startTime: timestamp("start_time").notNull().defaultNow(),
    endTime: timestamp("end_time").notNull().defaultNow(),
  },
  (landfill) => ({
    nameIndex: index("landfill_name_idx").on(landfill.id),
  }),
);

export const landfillRecords = createTable(
  "landfill_record",
  {
    id: serial("id").primaryKey(),
    recordTime: timestamp("record_date").defaultNow(),
    weightOfwaste: bigint("weight_of_waste", { mode: "number" }),
    landfillId: integer("landfill_id"),
  },
  (landfillRecords) => ({
    nameIndex: index("landfill_record_name_idx").on(landfillRecords.id),
  }),
);

export const landfillRecordsRelation = relations(
  landfillRecords,
  ({ one }) => ({
    landfill: one(landfill, {
      fields: [landfillRecords.landfillId],
      references: [landfill.id],
    }),
  }),
);

export const landfillRelation = relations(landfill, ({ many }) => ({
  landfillRecords: many(landfillRecords),
}));

export const users = createTable(
  "user",
  {
    id: text("id").notNull().primaryKey(),
    name: text("name"),
    email: text("email").notNull(),
    password: varchar("password", { length: 256 }).notNull(),
    emailVerified: timestamp("emailVerified", { mode: "date" }),
    image: text("image"),
    role: userRoleEnum("user_role").default("UNASSIGNED").notNull(),
    stsId: integer("sts_id"),
    landfillId: integer("landfill_id"),
  },
  (user) => ({
    nameIndex: index("user_name_idx").on(user.name),
  }),
);

export const userRelations = relations(users, ({ one }) => ({
  sts: one(sts, {
    fields: [users.stsId],
    references: [sts.id],
  }),
  landfill: one(landfill, {
    fields: [users.landfillId],
    references: [landfill.id],
  }),
}));

export const accounts = createTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccount["type"]>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
    nameIndex: index("account_name_idx").on(account.providerAccountId),
  }),
);

export const sessions = createTable(
  "session",
  {
    sessionToken: text("sessionToken").notNull().primaryKey(),
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (session) => ({
    nameIndex: index("session_name_idx").on(session.sessionToken),
  }),
);

export const verificationTokens = createTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
    nameIndex: index("vt_name_idx").on(vt.identifier),
  }),
);
