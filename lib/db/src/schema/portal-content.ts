import { pgTable, text, jsonb, timestamp } from "drizzle-orm/pg-core";

export const portalContent = pgTable("portal_content", {
  id: text("id").primaryKey().$default(() => "default"),
  content: jsonb("content").$type<Record<string, unknown>>().notNull().$default(() => ({})),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().$onUpdate(() => new Date()),
});

export type PortalContentRow = typeof portalContent.$inferSelect;
