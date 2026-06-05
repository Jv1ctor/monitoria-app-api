/*
  Warnings:

  - You are about to drop the column `major_id` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Admin` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterEnum
ALTER TYPE "Role" ADD VALUE 'ADMIN';

-- DropForeignKey
ALTER TABLE "Class" DROP CONSTRAINT "Class_monitor_id_fkey";

-- DropForeignKey
ALTER TABLE "Frequencys" DROP CONSTRAINT "Frequencys_student_id_fkey";

-- DropForeignKey
ALTER TABLE "LessonUser" DROP CONSTRAINT "LessonUser_student_id_fkey";

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Rating" DROP CONSTRAINT "Rating_monitor_id_fkey";

-- DropForeignKey
ALTER TABLE "Rating" DROP CONSTRAINT "Rating_student_id_fkey";

-- DropForeignKey
ALTER TABLE "Topics" DROP CONSTRAINT "Topics_user_id_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_major_id_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "major_id";

-- DropTable
DROP TABLE "Admin";

-- CreateTable
CREATE TABLE "AcademicProfile" (
    "user_id" INTEGER NOT NULL,
    "major_id" INTEGER NOT NULL,

    CONSTRAINT "AcademicProfile_pkey" PRIMARY KEY ("user_id")
);

-- AddForeignKey
ALTER TABLE "AcademicProfile" ADD CONSTRAINT "AcademicProfile_major_id_fkey" FOREIGN KEY ("major_id") REFERENCES "Major"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AcademicProfile" ADD CONSTRAINT "AcademicProfile_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "AcademicProfile"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_monitor_id_fkey" FOREIGN KEY ("monitor_id") REFERENCES "AcademicProfile"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Class" ADD CONSTRAINT "Class_monitor_id_fkey" FOREIGN KEY ("monitor_id") REFERENCES "AcademicProfile"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LessonUser" ADD CONSTRAINT "LessonUser_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "AcademicProfile"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Frequencys" ADD CONSTRAINT "Frequencys_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "AcademicProfile"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Topics" ADD CONSTRAINT "Topics_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "AcademicProfile"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "AcademicProfile"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
