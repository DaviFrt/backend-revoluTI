/*
  Warnings:

  - A unique constraint covering the columns `[zip]` on the table `addresses` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "addresses_zip_key" ON "addresses"("zip");
