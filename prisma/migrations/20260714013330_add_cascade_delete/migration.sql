-- DropForeignKey
ALTER TABLE "Cycle" DROP CONSTRAINT "Cycle_userId_fkey";

-- DropForeignKey
ALTER TABLE "Symptom" DROP CONSTRAINT "Symptom_cycleId_fkey";

-- AddForeignKey
ALTER TABLE "Cycle" ADD CONSTRAINT "Cycle_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Symptom" ADD CONSTRAINT "Symptom_cycleId_fkey" FOREIGN KEY ("cycleId") REFERENCES "Cycle"("id") ON DELETE CASCADE ON UPDATE CASCADE;
