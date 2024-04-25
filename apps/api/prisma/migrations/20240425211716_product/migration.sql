/*
  Warnings:

  - You are about to drop the column `pricePerUnit` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `productName` on the `Item` table. All the data in the column will be lost.
  - Added the required column `productId` to the `Item` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Item" DROP COLUMN "pricePerUnit",
DROP COLUMN "productName",
ADD COLUMN     "productId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "pricePerUnit" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
