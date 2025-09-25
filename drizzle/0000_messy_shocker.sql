CREATE TABLE "event_attendance" (
	"id" serial PRIMARY KEY NOT NULL,
	"event_id" integer,
	"member_id" integer,
	"attended" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "events" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"date" timestamp NOT NULL,
	"theme" text NOT NULL,
	"budget" text NOT NULL,
	"location" text NOT NULL,
	"excerpt" text NOT NULL,
	"status" text DEFAULT 'upcoming' NOT NULL,
	"participants" integer DEFAULT 0,
	"winner" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "members" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"join_date" timestamp DEFAULT now(),
	"is_active" boolean DEFAULT true,
	"role" text DEFAULT 'member',
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "members_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "wine_ratings" (
	"id" serial PRIMARY KEY NOT NULL,
	"wine_id" integer,
	"member_id" integer,
	"rating" numeric(3, 2) NOT NULL,
	"notes" text,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "wines" (
	"id" serial PRIMARY KEY NOT NULL,
	"event_id" integer,
	"member_id" integer,
	"name" text NOT NULL,
	"producer" text,
	"vintage" integer,
	"region" text,
	"country" text,
	"grape_variety" text,
	"price" numeric(10, 2),
	"rating" numeric(3, 2),
	"notes" text,
	"is_winner" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "event_attendance" ADD CONSTRAINT "event_attendance_event_id_events_id_fk" FOREIGN KEY ("event_id") REFERENCES "public"."events"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "event_attendance" ADD CONSTRAINT "event_attendance_member_id_members_id_fk" FOREIGN KEY ("member_id") REFERENCES "public"."members"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "wine_ratings" ADD CONSTRAINT "wine_ratings_wine_id_wines_id_fk" FOREIGN KEY ("wine_id") REFERENCES "public"."wines"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "wine_ratings" ADD CONSTRAINT "wine_ratings_member_id_members_id_fk" FOREIGN KEY ("member_id") REFERENCES "public"."members"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "wines" ADD CONSTRAINT "wines_event_id_events_id_fk" FOREIGN KEY ("event_id") REFERENCES "public"."events"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "wines" ADD CONSTRAINT "wines_member_id_members_id_fk" FOREIGN KEY ("member_id") REFERENCES "public"."members"("id") ON DELETE no action ON UPDATE no action;