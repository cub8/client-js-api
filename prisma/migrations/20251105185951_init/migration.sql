-- CreateEnum
CREATE TYPE "Status" AS ENUM ('REGISTERED', 'INTEGRATED', 'RESIGNED');

-- CreateEnum
CREATE TYPE "IntegrationType" AS ENUM ('API', 'INTERNAL');

-- CreateTable
CREATE TABLE "Client" (
    "id" SERIAL NOT NULL,
    "first_name" VARCHAR(40) NOT NULL,
    "last_name" VARCHAR(80) NOT NULL,
    "pesel" CHAR(11) NOT NULL,
    "status" "Status" NOT NULL,
    "note" TEXT,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Client_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Integration" (
    "id" SERIAL NOT NULL,
    "clientId" INTEGER NOT NULL,
    "type" "IntegrationType" NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Integration_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Integration" ADD CONSTRAINT "Integration_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
