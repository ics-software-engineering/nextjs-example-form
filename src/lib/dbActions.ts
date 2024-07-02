"use server";

import { StudentData, EnrollmentData } from "@prisma/client";
import { prisma } from "@/lib/prisma";

const createStudent = async (
  studentData: StudentData,
  enrollmentData: EnrollmentData,
) => {
  // CAM: should we check if the student already exists? Or just upsert?
  const student = await prisma.studentData.upsert({
    where: { email: studentData.email },
    update: studentData,
    create: studentData,
  });
};
