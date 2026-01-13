-- DropForeignKey
ALTER TABLE "Integration" DROP CONSTRAINT "Integration_clientId_fkey";

-- AddForeignKey
ALTER TABLE "Integration" ADD CONSTRAINT "Integration_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE CASCADE ON UPDATE CASCADE;
