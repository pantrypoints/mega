// src/lib/server/db/schema.ts
import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';

export const user = sqliteTable('user', {
  id: text('id').primaryKey(),
  username: text('username').notNull(),
  codename: text('codename').notNull().unique(),
  pin: text('pin').notNull(),
  passwordHash: text('password_hash').notNull(),
  avatar: text('avatar'),
  gender: text('gender').notNull(),
  dateOfBirth: text('date_of_birth'),
  email: text('email'),
  phone: text('phone'),
  city: text('city'),
  country: text('country'),
  // location: text('location'),
  // Attribute points
  heart: real('heart'),
  brain: real('brain'),
  body: real('body'),
  luna: real('luna'),
  mercury: real('mercury'),
  saturn: real('saturn'),
  apollo: real('apollo'),
  jupiter: real('jupiter'),
  venus: real('venus'),
  mars: real('mars'),
  dateCreated: text('date_created').default(sql`(CURRENT_TIMESTAMP)`),
  dateModified: text('date_modified').default(sql`(CURRENT_TIMESTAMP)`)
});

export const session = sqliteTable('session', {
	id: text('id').primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => user.id),
	expiresAt: integer('expires_at', { mode: 'timestamp' }).notNull()
});

export type Session = typeof session.$inferSelect;

export type User = typeof user.$inferSelect;


export const posts = sqliteTable('posts', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  content: text('content').notNull(),
  userId: text('user_id').notNull().references(() => user.id),
  dateCreated: text('date_created').default(sql`(CURRENT_TIMESTAMP)`),
  dateModified: text('date_modified').default(sql`(CURRENT_TIMESTAMP)`)
});

export const products = sqliteTable('products', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  measure: text('measure').notNull(),
  points: real('points').notNull(),
  category: text('category').notNull(), // HS Code
  photo1: text('photo1'),
  photo2: text('photo2'),
  photo3: text('photo3'),
  photo4: text('photo4'),
  photo5: text('photo5'),
  photo6: text('photo6'),
  description: text('description'),
  headline: text('headline'),
  userId: text('user_id').notNull().references(() => user.id),
  dateCreated: text('date_created').default(sql`(CURRENT_TIMESTAMP)`),
  dateModified: text('date_modified').default(sql`(CURRENT_TIMESTAMP)`)
});

export const services = sqliteTable('services', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  measure: text('measure').notNull(),
  points: real('points').notNull(),
  category: text('category').notNull(), // MCC Code
  photo1: text('photo1'),
  photo2: text('photo2'),
  photo3: text('photo3'),
  photo4: text('photo4'),
  photo5: text('photo5'),
  photo6: text('photo6'),
  description: text('description'),
  headline: text('headline'),
  userId: text('user_id').notNull().references(() => user.id),
  dateCreated: text('date_created').default(sql`(CURRENT_TIMESTAMP)`),
  dateModified: text('date_modified').default(sql`(CURRENT_TIMESTAMP)`)
});

export const transactions = sqliteTable('transactions', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  points: real('points').notNull(),
  measure: text('measure'),
  amount: real('amount'),
  photo: text('photo'),
  notes: text('notes'),
  kind: text('kind').notNull(), // 'debt' or 'credit'
  category: text('category').notNull(), // HS Code or MCC Code
  status: text('status').notNull().default('pending'), // 'pending', 'accepted', 'cancelled', 'transferred'
  giverId: text('giver_id').notNull().references(() => user.id), // seller
  getterId: text('getter_id').notNull().references(() => user.id), // buyer
  transfereeId: text('transferee_id').references(() => user.id),
  dateAccepted: text('date_accepted'),
  dateCancelled: text('date_cancelled'),
  dateTransferred: text('date_transferred'),
  dateCreated: text('date_created').default(sql`(CURRENT_TIMESTAMP)`),
  dateModified: text('date_modified').default(sql`(CURRENT_TIMESTAMP)`)
});
