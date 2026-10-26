import { PrismaClient } from "../generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  console.log("Starting Parro Notes seed...");

  // --------------------------------------------------
  // Education Level
  // --------------------------------------------------

  const school = await prisma.educationLevel.upsert({
    where: {
      slug: "school",
    },
    update: {},
    create: {
      name: "School",
      slug: "school",
      description: "School-level learning resources and notes.",
    },
  });

  // --------------------------------------------------
  // Program / Class
  // --------------------------------------------------

  const class10 = await prisma.program.upsert({
    where: {
      educationLevelId_slug: {
        educationLevelId: school.id,
        slug: "class-10",
      },
    },
    update: {},
    create: {
      name: "Class 10",
      slug: "class-10",
      description: "Class 10 study material and notes.",
      educationLevelId: school.id,
    },
  });

  // --------------------------------------------------
  // Subjects
  // --------------------------------------------------

  const science = await prisma.subject.upsert({
    where: {
      programId_slug: {
        programId: class10.id,
        slug: "science",
      },
    },
    update: {},
    create: {
      name: "Science",
      slug: "science",
      code: "SCI",
      description: "Class 10 Science notes and study resources.",
      programId: class10.id,
    },
  });

  const mathematics = await prisma.subject.upsert({
    where: {
      programId_slug: {
        programId: class10.id,
        slug: "mathematics",
      },
    },
    update: {},
    create: {
      name: "Mathematics",
      slug: "mathematics",
      code: "MATH",
      description: "Class 10 Mathematics notes and study resources.",
      programId: class10.id,
    },
  });

  // --------------------------------------------------
  // Topics - Science
  // --------------------------------------------------

  const light = await prisma.topic.upsert({
    where: {
      subjectId_slug: {
        subjectId: science.id,
        slug: "light",
      },
    },
    update: {},
    create: {
      name: "Light",
      slug: "light",
      description: "Study of light, reflection, and refraction.",
      subjectId: science.id,
    },
  });

  const electricity = await prisma.topic.upsert({
    where: {
      subjectId_slug: {
        subjectId: science.id,
        slug: "electricity",
      },
    },
    update: {},
    create: {
      name: "Electricity",
      slug: "electricity",
      description: "Basic concepts of electric current and circuits.",
      subjectId: science.id,
    },
  });

  const chemicalReactions = await prisma.topic.upsert({
    where: {
      subjectId_slug: {
        subjectId: science.id,
        slug: "chemical-reactions",
      },
    },
    update: {},
    create: {
      name: "Chemical Reactions",
      slug: "chemical-reactions",
      description: "Types and characteristics of chemical reactions.",
      subjectId: science.id,
    },
  });

  // --------------------------------------------------
  // Topics - Mathematics
  // --------------------------------------------------

  const realNumbers = await prisma.topic.upsert({
    where: {
      subjectId_slug: {
        subjectId: mathematics.id,
        slug: "real-numbers",
      },
    },
    update: {},
    create: {
      name: "Real Numbers",
      slug: "real-numbers",
      description: "Fundamental concepts related to real numbers.",
      subjectId: mathematics.id,
    },
  });

  const polynomials = await prisma.topic.upsert({
    where: {
      subjectId_slug: {
        subjectId: mathematics.id,
        slug: "polynomials",
      },
    },
    update: {},
    create: {
      name: "Polynomials",
      slug: "polynomials",
      description: "Polynomial expressions, zeros, and their properties.",
      subjectId: mathematics.id,
    },
  });

  // --------------------------------------------------
  // Notes
  // --------------------------------------------------

  await prisma.note.upsert({
    where: {
      topicId_slug: {
        topicId: light.id,
        slug: "reflection-of-light",
      },
    },
    update: {},
    create: {
      title: "Reflection of Light",
      slug: "reflection-of-light",
      description:
        "Notes covering the basic concepts and laws of reflection of light.",
      topicId: light.id,
    },
  });

  await prisma.note.upsert({
    where: {
      topicId_slug: {
        topicId: light.id,
        slug: "refraction-of-light",
      },
    },
    update: {},
    create: {
      title: "Refraction of Light",
      slug: "refraction-of-light",
      description:
        "Notes covering the basic concepts of refraction of light.",
      topicId: light.id,
    },
  });

  await prisma.note.upsert({
    where: {
      topicId_slug: {
        topicId: electricity.id,
        slug: "electric-current",
      },
    },
    update: {},
    create: {
      title: "Electric Current",
      slug: "electric-current",
      description:
        "Introduction to electric current and its fundamental concepts.",
      topicId: electricity.id,
    },
  });

  await prisma.note.upsert({
    where: {
      topicId_slug: {
        topicId: chemicalReactions.id,
        slug: "types-of-chemical-reactions",
      },
    },
    update: {},
    create: {
      title: "Types of Chemical Reactions",
      slug: "types-of-chemical-reactions",
      description:
        "Overview of common types of chemical reactions.",
      topicId: chemicalReactions.id,
    },
  });

  await prisma.note.upsert({
    where: {
      topicId_slug: {
        topicId: realNumbers.id,
        slug: "euclids-division-lemma",
      },
    },
    update: {},
    create: {
      title: "Euclid's Division Lemma",
      slug: "euclids-division-lemma",
      description:
        "Notes covering Euclid's division lemma and its applications.",
      topicId: realNumbers.id,
    },
  });

  await prisma.note.upsert({
    where: {
      topicId_slug: {
        topicId: polynomials.id,
        slug: "zeros-of-polynomials",
      },
    },
    update: {},
    create: {
      title: "Zeros of Polynomials",
      slug: "zeros-of-polynomials",
      description:
        "Notes covering zeros of polynomials and their relationship with coefficients.",
      topicId: polynomials.id,
    },
  });

  console.log("Parro Notes seed completed successfully.");
}

main()
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });