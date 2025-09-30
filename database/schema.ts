import { time } from "console";
import {
  uuid,
  integer,
  pgTable,
  varchar,
  text,
  pgEnum,
  date,
  timestamp,
} from "drizzle-orm/pg-core";

export const STATUS_ENUM = pgEnum("status", [
  "PENDING",
  "APPROVED",
  "REJECTED",
]);
export const ROLE_ENUM = pgEnum("role", ["ADMIN", "USER"]);
export const BORROW_STATUS_ENUM = pgEnum("borrow_status", [
  "BORROWED",
  "RETURNED",
]);

export const users = pgTable("users", {
  id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
  fullName: varchar("full_name", { length: 256 }).notNull(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  universityCard: text("university_card").notNull(),
  universityId: integer("university_id").notNull().unique(),
  status: STATUS_ENUM("status").notNull().default("PENDING"),
  role: ROLE_ENUM("role").notNull().default("USER"),
  lastActivity: date("last_activity", { mode: "date" }).notNull().defaultNow(),
  createdAt: timestamp("created_at", {
    withTimezone: true,
  }).defaultNow(),
});
