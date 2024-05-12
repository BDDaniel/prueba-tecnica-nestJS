-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "date_birth" TIMESTAMP(3) NOT NULL,
    "address" TEXT NOT NULL,
    "token" TEXT,
    "password" TEXT NOT NULL,
    "mobile_phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "session_active" BOOLEAN,
    "createdBy" INTEGER,
    "updatedBy" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_mobile_phone_key" ON "User"("mobile_phone");
