import { pgTable, serial, text, integer, timestamp, boolean, decimal } from 'drizzle-orm/pg-core';

// Events table
export const events = pgTable('events', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  date: timestamp('date').notNull(),
  theme: text('theme').notNull(),
  budget: text('budget').notNull(), // e.g., "1,500 THB"
  location: text('location').notNull(),
  excerpt: text('excerpt').notNull(),
  status: text('status').notNull().default('upcoming'), // 'upcoming', 'completed', 'cancelled'
  participants: integer('participants').default(0),
  winner: text('winner'), // winning wine name
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Members table
export const members = pgTable('members', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  joinDate: timestamp('join_date').defaultNow(),
  isActive: boolean('is_active').default(true),
  role: text('role').default('member'), // 'member', 'organizer', 'admin'
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Wines table - wines brought to events
export const wines = pgTable('wines', {
  id: serial('id').primaryKey(),
  eventId: integer('event_id').references(() => events.id),
  memberId: integer('member_id').references(() => members.id),
  name: text('name').notNull(),
  producer: text('producer'),
  vintage: integer('vintage'),
  region: text('region'),
  country: text('country'),
  grapeVariety: text('grape_variety'),
  price: decimal('price', { precision: 10, scale: 2 }), // price in THB
  rating: decimal('rating', { precision: 3, scale: 2 }), // average rating from members
  notes: text('notes'), // tasting notes
  isWinner: boolean('is_winner').default(false),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Wine ratings - individual member ratings for wines
export const wineRatings = pgTable('wine_ratings', {
  id: serial('id').primaryKey(),
  wineId: integer('wine_id').references(() => wines.id),
  memberId: integer('member_id').references(() => members.id),
  rating: decimal('rating', { precision: 3, scale: 2 }).notNull(), // 1-10 scale
  notes: text('notes'), // individual tasting notes
  createdAt: timestamp('created_at').defaultNow(),
});

// Event attendance
export const eventAttendance = pgTable('event_attendance', {
  id: serial('id').primaryKey(),
  eventId: integer('event_id').references(() => events.id),
  memberId: integer('member_id').references(() => members.id),
  attended: boolean('attended').default(true),
  createdAt: timestamp('created_at').defaultNow(),
});

// Export types for TypeScript
export type Event = typeof events.$inferSelect;
export type NewEvent = typeof events.$inferInsert;

export type Member = typeof members.$inferSelect;
export type NewMember = typeof members.$inferInsert;

export type Wine = typeof wines.$inferSelect;
export type NewWine = typeof wines.$inferInsert;

export type WineRating = typeof wineRatings.$inferSelect;
export type NewWineRating = typeof wineRatings.$inferInsert;

export type EventAttendance = typeof eventAttendance.$inferSelect;
export type NewEventAttendance = typeof eventAttendance.$inferInsert;
