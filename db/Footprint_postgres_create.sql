CREATE TABLE "footprint_users" (
	"id" serial NOT NULL,
	"is_admin" BOOLEAN NOT NULL DEFAULT 'false',
	"email" varchar(180) NOT NULL,
	"hash" varchar NOT NULL,
	CONSTRAINT footprint_users_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "footprint_industry_users" (
	"id" serial NOT NULL,
	"title" TEXT NOT NULL,
	"email" varchar(180) NOT NULL,
	"hash" varchar NOT NULL,
	"address" varchar(200) NOT NULL,
	"phone" varchar(16) NOT NULL,
	"state" varchar(2) NOT NULL,
	"zip" varchar(10) NOT NULL,
	"materials_accepted" varchar[],
	CONSTRAINT footprint_industry_users_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "user_saved_locations" (
	"id" serial NOT NULL,
	"title" TEXT NOT NULL,
	"materials_accepted" varchar[],
	"phone" varchar(16) NOT NULL,
	"address" varchar(200) NOT NULL,
	"state" varchar(2) NOT NULL,
	"zip" varchar(10) NOT NULL,
	"user_id" int NOT NULL,
	CONSTRAINT user_saved_locations_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "user_saved_articles" (
	"id" serial NOT NULL,
	"user_id" int,
	"date" varchar(40) NOT NULL,
	"article_url" TEXT NOT NULL,
	"title" TEXT NOT NULL,
	"industry_user_id" int,
	CONSTRAINT user_saved_articles_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "footprint_material_category" (
	"id" serial NOT NULL,
	"material_name" varchar(80) NOT NULL,
	"price" varchar(80) NOT NULL,
	"img_url" TEXT[] NOT NULL,
	"content" TEXT NOT NULL,
	CONSTRAINT footprint_material_category_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);





ALTER TABLE "user_saved_locations" ADD CONSTRAINT "user_saved_locations_fk0" FOREIGN KEY ("user_id") REFERENCES "footprint_users"("id");

ALTER TABLE "user_saved_articles" ADD CONSTRAINT "user_saved_articles_fk0" FOREIGN KEY ("user_id") REFERENCES "footprint_users"("id");
ALTER TABLE "user_saved_articles" ADD CONSTRAINT "user_saved_articles_fk1" FOREIGN KEY ("industry_user_id") REFERENCES "footprint_industry_users"("id");


