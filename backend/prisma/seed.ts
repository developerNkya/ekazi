import { PrismaClient, EmploymentType, JobStatus, ApplicationStatus } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // ---------- 1. Demo user (upsert — safe to re-run) ----------
  const password = await bcrypt.hash("password123", 10);

  const user = await prisma.user.upsert({
    where: { email: "demo@ekazi.co.tz" },
    update: {},
    create: {
      name: "Demo Employer",
      email: "demo@ekazi.co.tz",
      password,
    },
  });

  // ---------- 2. Wipe existing jobs/applications for this user ----------
  // (cleaner than upserting because jobs don't have a unique natural key)
  await prisma.application.deleteMany({
    where: { job: { userId: user.id } },
  });
  await prisma.job.deleteMany({ where: { userId: user.id } });

  // ---------- 3. Create jobs fresh ----------
  const job1 = await prisma.job.create({
    data: {
      title: "Full-Stack Developer",
      description:
        "Build and maintain our recruitment platform using React and Node.js.",
      location: "Dar es Salaam, Tanzania",
      employmentType: EmploymentType.FULL_TIME,
      status: JobStatus.PUBLISHED,
      userId: user.id,
    },
  });

  await prisma.job.create({
    data: {
      title: "Frontend Engineer (React)",
      description: "Own the employer dashboard and candidate experience.",
      location: "Remote",
      employmentType: EmploymentType.CONTRACT,
      status: JobStatus.DRAFT,
      userId: user.id,
    },
  });

  // ---------- 4. Create one sample application ----------
  await prisma.application.create({
    data: {
      jobId: job1.id,
      candidateName: "Amina Hassan",
      email: "amina@example.com",
      phone: "+255712345678",
      coverLetter: "I am very excited about this opportunity...",
      resumeUrl: "https://example.com/resumes/amina.pdf",
      status: ApplicationStatus.SHORTLISTED,
    },
  });

  console.log("✅ Seed complete. Login: demo@ekazi.co.tz / password123");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());