import { PrismaClient, EmploymentType, JobStatus, ApplicationStatus } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
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

  const job1 = await prisma.job.create({
    data: {
      title: "Full-Stack Developer",
      description: "Build and maintain our recruitment platform using React and Node.js.",
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
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());