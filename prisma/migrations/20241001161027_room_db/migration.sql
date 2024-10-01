/*
  Warnings:

  - You are about to drop the `_RoomParticipants` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_RoomParticipants" DROP CONSTRAINT "_RoomParticipants_A_fkey";

-- DropForeignKey
ALTER TABLE "_RoomParticipants" DROP CONSTRAINT "_RoomParticipants_B_fkey";

-- DropTable
DROP TABLE "_RoomParticipants";
