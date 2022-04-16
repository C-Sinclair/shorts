-- CreateTable
CREATE TABLE "Short" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "tags" TEXT[],

    CONSTRAINT "Short_pkey" PRIMARY KEY ("id")
);
