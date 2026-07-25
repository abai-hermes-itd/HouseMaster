-- AlterEnum
ALTER TYPE "OrganizationType" ADD VALUE 'SERVICE_COMPANY';

-- DropForeignKey
ALTER TABLE "apartments" DROP CONSTRAINT "apartments_entrance_id_house_id_fkey";

-- DropForeignKey
ALTER TABLE "apartments" DROP CONSTRAINT "apartments_house_id_fkey";

-- DropForeignKey
ALTER TABLE "assets" DROP CONSTRAINT "assets_house_id_fkey";

-- DropForeignKey
ALTER TABLE "entrances" DROP CONSTRAINT "entrances_house_id_fkey";

-- DropForeignKey
ALTER TABLE "inspections" DROP CONSTRAINT "inspections_asset_id_fkey";

-- DropForeignKey
ALTER TABLE "inspections" DROP CONSTRAINT "inspections_inspector_id_fkey";

-- DropForeignKey
ALTER TABLE "work_orders" DROP CONSTRAINT "work_orders_asset_id_fkey";

-- DropForeignKey
ALTER TABLE "work_orders" DROP CONSTRAINT "work_orders_assigned_to_fkey";

-- DropForeignKey
ALTER TABLE "work_orders" DROP CONSTRAINT "work_orders_created_by_fkey";

-- DropForeignKey
ALTER TABLE "work_orders" DROP CONSTRAINT "work_orders_house_id_fkey";

-- DropIndex
DROP INDEX "apartments_entrance_id_house_id_idx";

-- DropIndex
DROP INDEX "entrances_id_house_id_key";

-- DropIndex
DROP INDEX "work_orders_assigned_to_status_idx";

-- DropIndex
DROP INDEX "work_orders_created_by_idx";

-- AlterTable
ALTER TABLE "apartments" ADD COLUMN     "organization_id" UUID NOT NULL,
ALTER COLUMN "apartment_number" SET DATA TYPE VARCHAR(32);

-- AlterTable
ALTER TABLE "assets" ADD COLUMN     "organization_id" UUID NOT NULL,
ALTER COLUMN "location" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "serial_number" SET DATA TYPE VARCHAR(128);

-- AlterTable
ALTER TABLE "entrances" ADD COLUMN     "organization_id" UUID NOT NULL;

-- AlterTable
ALTER TABLE "houses" ALTER COLUMN "cadastral_number" SET DATA TYPE VARCHAR(64),
ALTER COLUMN "address" SET DATA TYPE VARCHAR(500),
ALTER COLUMN "city" SET DATA TYPE VARCHAR(128),
ALTER COLUMN "region" SET DATA TYPE VARCHAR(128);

-- AlterTable
ALTER TABLE "inspections" ADD COLUMN     "organization_id" UUID NOT NULL;

-- AlterTable
ALTER TABLE "organizations" ALTER COLUMN "name" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "address" SET DATA TYPE VARCHAR(500);

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "email" SET DATA TYPE VARCHAR(320),
ALTER COLUMN "full_name" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "phone" SET DATA TYPE VARCHAR(32);

-- AlterTable
ALTER TABLE "work_orders" ADD COLUMN     "organization_id" UUID NOT NULL;

-- CreateIndex
CREATE INDEX "apartments_organization_id_idx" ON "apartments"("organization_id");

-- CreateIndex
CREATE INDEX "apartments_entrance_id_house_id_organization_id_idx" ON "apartments"("entrance_id", "house_id", "organization_id");

-- CreateIndex
CREATE INDEX "assets_organization_id_idx" ON "assets"("organization_id");

-- CreateIndex
CREATE UNIQUE INDEX "assets_id_organization_id_key" ON "assets"("id", "organization_id");

-- CreateIndex
CREATE UNIQUE INDEX "assets_id_house_id_organization_id_key" ON "assets"("id", "house_id", "organization_id");

-- CreateIndex
CREATE INDEX "entrances_organization_id_idx" ON "entrances"("organization_id");

-- CreateIndex
CREATE UNIQUE INDEX "entrances_id_house_id_organization_id_key" ON "entrances"("id", "house_id", "organization_id");

-- CreateIndex
CREATE UNIQUE INDEX "houses_id_organization_id_key" ON "houses"("id", "organization_id");

-- CreateIndex
CREATE INDEX "inspections_organization_id_idx" ON "inspections"("organization_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_id_organization_id_key" ON "users"("id", "organization_id");

-- CreateIndex
CREATE INDEX "work_orders_organization_id_idx" ON "work_orders"("organization_id");

-- CreateIndex
CREATE INDEX "work_orders_created_by_organization_id_idx" ON "work_orders"("created_by", "organization_id");

-- CreateIndex
CREATE INDEX "work_orders_assigned_to_organization_id_status_idx" ON "work_orders"("assigned_to", "organization_id", "status");

-- AddForeignKey
ALTER TABLE "entrances" ADD CONSTRAINT "entrances_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "entrances" ADD CONSTRAINT "entrances_house_id_organization_id_fkey" FOREIGN KEY ("house_id", "organization_id") REFERENCES "houses"("id", "organization_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "apartments" ADD CONSTRAINT "apartments_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "apartments" ADD CONSTRAINT "apartments_house_id_organization_id_fkey" FOREIGN KEY ("house_id", "organization_id") REFERENCES "houses"("id", "organization_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "apartments" ADD CONSTRAINT "apartments_entrance_id_house_id_organization_id_fkey" FOREIGN KEY ("entrance_id", "house_id", "organization_id") REFERENCES "entrances"("id", "house_id", "organization_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assets" ADD CONSTRAINT "assets_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assets" ADD CONSTRAINT "assets_house_id_organization_id_fkey" FOREIGN KEY ("house_id", "organization_id") REFERENCES "houses"("id", "organization_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inspections" ADD CONSTRAINT "inspections_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inspections" ADD CONSTRAINT "inspections_asset_id_organization_id_fkey" FOREIGN KEY ("asset_id", "organization_id") REFERENCES "assets"("id", "organization_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inspections" ADD CONSTRAINT "inspections_inspector_id_organization_id_fkey" FOREIGN KEY ("inspector_id", "organization_id") REFERENCES "users"("id", "organization_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "work_orders" ADD CONSTRAINT "work_orders_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "work_orders" ADD CONSTRAINT "work_orders_house_id_organization_id_fkey" FOREIGN KEY ("house_id", "organization_id") REFERENCES "houses"("id", "organization_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "work_orders" ADD CONSTRAINT "work_orders_asset_id_house_id_organization_id_fkey" FOREIGN KEY ("asset_id", "house_id", "organization_id") REFERENCES "assets"("id", "house_id", "organization_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "work_orders" ADD CONSTRAINT "work_orders_created_by_organization_id_fkey" FOREIGN KEY ("created_by", "organization_id") REFERENCES "users"("id", "organization_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "work_orders" ADD CONSTRAINT "work_orders_assigned_to_organization_id_fkey" FOREIGN KEY ("assigned_to", "organization_id") REFERENCES "users"("id", "organization_id") ON DELETE RESTRICT ON UPDATE CASCADE;
