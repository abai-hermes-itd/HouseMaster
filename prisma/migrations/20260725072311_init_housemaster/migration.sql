-- CreateEnum
CREATE TYPE "OrganizationType" AS ENUM ('OSI', 'KSK', 'MANAGEMENT_COMPANY');

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('SUPER_ADMIN', 'ADMIN', 'HOUSEMASTER', 'TECHNICIAN', 'DISPATCHER', 'ACCOUNTANT', 'RESIDENT');

-- CreateEnum
CREATE TYPE "AssetType" AS ENUM ('ELEVATOR', 'PUMP', 'VALVE', 'HEATING', 'ELECTRICAL_PANEL', 'ROOF', 'BASEMENT', 'WATER_METER', 'FIRE_SYSTEM');

-- CreateEnum
CREATE TYPE "AssetStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'MAINTENANCE', 'DECOMMISSIONED');

-- CreateEnum
CREATE TYPE "InspectionStatus" AS ENUM ('PASSED', 'FAILED', 'REQUIRES_ACTION');

-- CreateEnum
CREATE TYPE "Priority" AS ENUM ('LOW', 'NORMAL', 'HIGH', 'EMERGENCY');

-- CreateEnum
CREATE TYPE "WorkOrderStatus" AS ENUM ('OPEN', 'IN_PROGRESS', 'DONE', 'CANCELLED');

-- CreateTable
CREATE TABLE "organizations" (
    "id" UUID NOT NULL,
    "type" "OrganizationType" NOT NULL,
    "name" TEXT NOT NULL,
    "bin" VARCHAR(12) NOT NULL,
    "address" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3) NOT NULL,
    "deleted_at" TIMESTAMPTZ(3),

    CONSTRAINT "organizations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL,
    "email" TEXT NOT NULL,
    "full_name" TEXT NOT NULL,
    "phone" TEXT,
    "role" "UserRole" NOT NULL,
    "organization_id" UUID,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3) NOT NULL,
    "deleted_at" TIMESTAMPTZ(3),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "houses" (
    "id" UUID NOT NULL,
    "organization_id" UUID NOT NULL,
    "cadastral_number" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "year_built" INTEGER,
    "floors" INTEGER NOT NULL,
    "entrances" INTEGER NOT NULL,
    "apartments" INTEGER NOT NULL,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3) NOT NULL,
    "deleted_at" TIMESTAMPTZ(3),

    CONSTRAINT "houses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "entrances" (
    "id" UUID NOT NULL,
    "house_id" UUID NOT NULL,
    "number" INTEGER NOT NULL,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3) NOT NULL,
    "deleted_at" TIMESTAMPTZ(3),

    CONSTRAINT "entrances_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "apartments" (
    "id" UUID NOT NULL,
    "house_id" UUID NOT NULL,
    "entrance_id" UUID NOT NULL,
    "apartment_number" TEXT NOT NULL,
    "floor" INTEGER NOT NULL,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3) NOT NULL,
    "deleted_at" TIMESTAMPTZ(3),

    CONSTRAINT "apartments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "assets" (
    "id" UUID NOT NULL,
    "house_id" UUID NOT NULL,
    "type" "AssetType" NOT NULL,
    "location" TEXT NOT NULL,
    "serial_number" TEXT,
    "status" "AssetStatus" NOT NULL DEFAULT 'ACTIVE',
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3) NOT NULL,
    "deleted_at" TIMESTAMPTZ(3),

    CONSTRAINT "assets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "inspections" (
    "id" UUID NOT NULL,
    "asset_id" UUID NOT NULL,
    "inspector_id" UUID NOT NULL,
    "inspection_date" TIMESTAMPTZ(3) NOT NULL,
    "status" "InspectionStatus" NOT NULL,
    "notes" TEXT,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "inspections_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "work_orders" (
    "id" UUID NOT NULL,
    "house_id" UUID NOT NULL,
    "asset_id" UUID,
    "created_by" UUID NOT NULL,
    "assigned_to" UUID,
    "priority" "Priority" NOT NULL DEFAULT 'NORMAL',
    "status" "WorkOrderStatus" NOT NULL DEFAULT 'OPEN',
    "description" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "work_orders_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "organizations_bin_key" ON "organizations"("bin");

-- CreateIndex
CREATE INDEX "organizations_type_idx" ON "organizations"("type");

-- CreateIndex
CREATE INDEX "organizations_deleted_at_idx" ON "organizations"("deleted_at");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "users_organization_id_idx" ON "users"("organization_id");

-- CreateIndex
CREATE INDEX "users_role_idx" ON "users"("role");

-- CreateIndex
CREATE INDEX "users_deleted_at_idx" ON "users"("deleted_at");

-- CreateIndex
CREATE UNIQUE INDEX "houses_cadastral_number_key" ON "houses"("cadastral_number");

-- CreateIndex
CREATE INDEX "houses_organization_id_idx" ON "houses"("organization_id");

-- CreateIndex
CREATE INDEX "houses_city_region_idx" ON "houses"("city", "region");

-- CreateIndex
CREATE INDEX "houses_deleted_at_idx" ON "houses"("deleted_at");

-- CreateIndex
CREATE INDEX "entrances_deleted_at_idx" ON "entrances"("deleted_at");

-- CreateIndex
CREATE UNIQUE INDEX "entrances_house_id_number_key" ON "entrances"("house_id", "number");

-- CreateIndex
CREATE UNIQUE INDEX "entrances_id_house_id_key" ON "entrances"("id", "house_id");

-- CreateIndex
CREATE INDEX "apartments_entrance_id_house_id_idx" ON "apartments"("entrance_id", "house_id");

-- CreateIndex
CREATE INDEX "apartments_deleted_at_idx" ON "apartments"("deleted_at");

-- CreateIndex
CREATE UNIQUE INDEX "apartments_house_id_apartment_number_key" ON "apartments"("house_id", "apartment_number");

-- CreateIndex
CREATE INDEX "assets_house_id_type_idx" ON "assets"("house_id", "type");

-- CreateIndex
CREATE INDEX "assets_status_idx" ON "assets"("status");

-- CreateIndex
CREATE INDEX "assets_serial_number_idx" ON "assets"("serial_number");

-- CreateIndex
CREATE INDEX "assets_deleted_at_idx" ON "assets"("deleted_at");

-- CreateIndex
CREATE INDEX "inspections_asset_id_inspection_date_idx" ON "inspections"("asset_id", "inspection_date");

-- CreateIndex
CREATE INDEX "inspections_inspector_id_inspection_date_idx" ON "inspections"("inspector_id", "inspection_date");

-- CreateIndex
CREATE INDEX "inspections_status_idx" ON "inspections"("status");

-- CreateIndex
CREATE INDEX "work_orders_house_id_status_idx" ON "work_orders"("house_id", "status");

-- CreateIndex
CREATE INDEX "work_orders_asset_id_status_idx" ON "work_orders"("asset_id", "status");

-- CreateIndex
CREATE INDEX "work_orders_created_by_idx" ON "work_orders"("created_by");

-- CreateIndex
CREATE INDEX "work_orders_assigned_to_status_idx" ON "work_orders"("assigned_to", "status");

-- CreateIndex
CREATE INDEX "work_orders_priority_status_idx" ON "work_orders"("priority", "status");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "houses" ADD CONSTRAINT "houses_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "entrances" ADD CONSTRAINT "entrances_house_id_fkey" FOREIGN KEY ("house_id") REFERENCES "houses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "apartments" ADD CONSTRAINT "apartments_house_id_fkey" FOREIGN KEY ("house_id") REFERENCES "houses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "apartments" ADD CONSTRAINT "apartments_entrance_id_house_id_fkey" FOREIGN KEY ("entrance_id", "house_id") REFERENCES "entrances"("id", "house_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assets" ADD CONSTRAINT "assets_house_id_fkey" FOREIGN KEY ("house_id") REFERENCES "houses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inspections" ADD CONSTRAINT "inspections_asset_id_fkey" FOREIGN KEY ("asset_id") REFERENCES "assets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inspections" ADD CONSTRAINT "inspections_inspector_id_fkey" FOREIGN KEY ("inspector_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "work_orders" ADD CONSTRAINT "work_orders_house_id_fkey" FOREIGN KEY ("house_id") REFERENCES "houses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "work_orders" ADD CONSTRAINT "work_orders_asset_id_fkey" FOREIGN KEY ("asset_id") REFERENCES "assets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "work_orders" ADD CONSTRAINT "work_orders_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "work_orders" ADD CONSTRAINT "work_orders_assigned_to_fkey" FOREIGN KEY ("assigned_to") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
