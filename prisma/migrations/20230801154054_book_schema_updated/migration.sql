/*
  Warnings:

  - You are about to drop the column `point` on the `Book` table. All the data in the column will be lost.
  - Added the required column `price` to the `Book` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Book" DROP COLUMN "point",
ADD COLUMN     "price" INTEGER NOT NULL;
