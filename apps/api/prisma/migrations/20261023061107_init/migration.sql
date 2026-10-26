-- CreateEnum
CREATE TYPE "NoteResourceType" AS ENUM ('PDF', 'DOCUMENT', 'PRESENTATION', 'IMAGE', 'VIDEO', 'EXTERNAL_LINK');

-- CreateEnum
CREATE TYPE "NoteRequestStatus" AS ENUM ('PENDING', 'IN_PROGRESS', 'COMPLETED', 'REJECTED');

-- CreateTable
CREATE TABLE "EducationLevel" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EducationLevel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Program" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "educationLevelId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Program_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subject" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "code" TEXT,
    "description" TEXT,
    "programId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Subject_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Topic" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "subjectId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Topic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Note" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "topicId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Note_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NoteResource" (
    "id" TEXT NOT NULL,
    "noteId" TEXT NOT NULL,
    "type" "NoteResourceType" NOT NULL,
    "title" TEXT,
    "url" TEXT NOT NULL,
    "publicId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "NoteResource_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Admin" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "lastLoginAt" TIMESTAMP(3),

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NoteRequest" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "educationLevelId" TEXT,
    "programId" TEXT,
    "subjectId" TEXT,
    "topicId" TEXT,
    "status" "NoteRequestStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "NoteRequest_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "EducationLevel_name_key" ON "EducationLevel"("name");

-- CreateIndex
CREATE UNIQUE INDEX "EducationLevel_slug_key" ON "EducationLevel"("slug");

-- CreateIndex
CREATE INDEX "Program_educationLevelId_idx" ON "Program"("educationLevelId");

-- CreateIndex
CREATE UNIQUE INDEX "Program_educationLevelId_name_key" ON "Program"("educationLevelId", "name");

-- CreateIndex
CREATE UNIQUE INDEX "Program_educationLevelId_slug_key" ON "Program"("educationLevelId", "slug");

-- CreateIndex
CREATE INDEX "Subject_programId_idx" ON "Subject"("programId");

-- CreateIndex
CREATE UNIQUE INDEX "Subject_programId_name_key" ON "Subject"("programId", "name");

-- CreateIndex
CREATE UNIQUE INDEX "Subject_programId_slug_key" ON "Subject"("programId", "slug");

-- CreateIndex
CREATE INDEX "Topic_subjectId_idx" ON "Topic"("subjectId");

-- CreateIndex
CREATE UNIQUE INDEX "Topic_subjectId_name_key" ON "Topic"("subjectId", "name");

-- CreateIndex
CREATE UNIQUE INDEX "Topic_subjectId_slug_key" ON "Topic"("subjectId", "slug");

-- CreateIndex
CREATE INDEX "Note_topicId_idx" ON "Note"("topicId");

-- CreateIndex
CREATE UNIQUE INDEX "Note_topicId_slug_key" ON "Note"("topicId", "slug");

-- CreateIndex
CREATE INDEX "NoteResource_noteId_idx" ON "NoteResource"("noteId");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_email_key" ON "Admin"("email");

-- CreateIndex
CREATE INDEX "NoteRequest_status_idx" ON "NoteRequest"("status");

-- CreateIndex
CREATE INDEX "NoteRequest_educationLevelId_idx" ON "NoteRequest"("educationLevelId");

-- CreateIndex
CREATE INDEX "NoteRequest_programId_idx" ON "NoteRequest"("programId");

-- CreateIndex
CREATE INDEX "NoteRequest_subjectId_idx" ON "NoteRequest"("subjectId");

-- CreateIndex
CREATE INDEX "NoteRequest_topicId_idx" ON "NoteRequest"("topicId");

-- AddForeignKey
ALTER TABLE "Program" ADD CONSTRAINT "Program_educationLevelId_fkey" FOREIGN KEY ("educationLevelId") REFERENCES "EducationLevel"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subject" ADD CONSTRAINT "Subject_programId_fkey" FOREIGN KEY ("programId") REFERENCES "Program"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Topic" ADD CONSTRAINT "Topic_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Note" ADD CONSTRAINT "Note_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "Topic"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NoteResource" ADD CONSTRAINT "NoteResource_noteId_fkey" FOREIGN KEY ("noteId") REFERENCES "Note"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NoteRequest" ADD CONSTRAINT "NoteRequest_educationLevelId_fkey" FOREIGN KEY ("educationLevelId") REFERENCES "EducationLevel"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NoteRequest" ADD CONSTRAINT "NoteRequest_programId_fkey" FOREIGN KEY ("programId") REFERENCES "Program"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NoteRequest" ADD CONSTRAINT "NoteRequest_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NoteRequest" ADD CONSTRAINT "NoteRequest_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "Topic"("id") ON DELETE SET NULL ON UPDATE CASCADE;
