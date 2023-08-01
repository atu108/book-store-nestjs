-- CreateEnum
CREATE TYPE "Role" AS ENUM ('CUSTOMER', 'ADMIN');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "type" "Role" NOT NULL DEFAULT E'CUSTOMER';
