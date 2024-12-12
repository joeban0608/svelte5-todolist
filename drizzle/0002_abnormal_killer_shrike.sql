ALTER TABLE "user" ADD COLUMN "age2" integer DEFAULT 1 NOT NULL;--> statement-breakpoint

-- foreach ages -> age + 3 => save age2
UPDATE "user" SET "age2" = "age" + 3;--> statement-breakpoint




ALTER TABLE "user" DROP COLUMN IF EXISTS "age";