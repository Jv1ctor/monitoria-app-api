/*
  Warnings:

  - You are about to drop the column `class_id` on the `LessonUser` table. All the data in the column will be lost.
  - Added the required column `lesson_id` to the `LessonUser` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "LessonUser" DROP CONSTRAINT "LessonUser_class_id_fkey";

-- AlterTable
ALTER TABLE "LessonUser" DROP COLUMN "class_id",
ADD COLUMN     "lesson_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "LessonUser" ADD CONSTRAINT "LessonUser_lesson_id_fkey" FOREIGN KEY ("lesson_id") REFERENCES "Lesson"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
