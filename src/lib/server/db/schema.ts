import { relations } from 'drizzle-orm';
import { pgTable, text, timestamp, serial, integer, type AnyPgColumn } from 'drizzle-orm/pg-core';

export const user = pgTable('user', {
	id: text('id').primaryKey(),
	username: text('username').notNull().unique(),
	passwordHash: text('password_hash').notNull(),
	age2: integer('age2').notNull().default(1)
});
export const usersRelations = relations(user, ({ one, many }) => ({
	todo: many(todo)
}));

export const session = pgTable('session', {
	id: text('id').primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => user.id),
	expiresAt: timestamp('expires_at', { withTimezone: true, mode: 'date' }).notNull()
});

export type Session = typeof session.$inferSelect;
export type User = typeof user.$inferSelect;

export const todo = pgTable('todo', {
	id: serial('id').primaryKey(),
	text: text('text').notNull(),
	userId: text('user_id')
		.notNull()
		.references(() => user.id)
});
export const todoRelations = relations(todo, ({ one, many }) => ({
	user: one(user, { fields: [todo.userId], references: [user.id] })
}));

export type InsertTodo = typeof todo.$inferInsert;
export type SelectTodo = typeof todo.$inferSelect;
