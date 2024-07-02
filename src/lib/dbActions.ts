"use server";

import { StudentData, EnrollmentData } from "@prisma/client";
import { prisma } from "@/lib/prisma";

const upsertStudent = async (
  studentData: StudentData,
  enrollmentData: EnrollmentData,
) => {
  const student = await prisma.studentData.upsert({
    where: { email: studentData.email },
    update: studentData,
    create: studentData,
  });
  const enrollment = await prisma.enrollmentData.upsert({
    where: { email: enrollmentData.email },
    update: enrollmentData,
    create: enrollmentData,
  });
};
