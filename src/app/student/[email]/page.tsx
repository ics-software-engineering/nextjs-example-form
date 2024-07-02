import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { StudentData, EnrollmentData } from "@prisma/client";

const EditStudentPage = async ({ params }: { params: { email: string } }) => {
  console.log(`EditStudentPage: ${params} ${params.email}`);
  const studentData = await prisma.studentData.findFirst({
    where: { email: params.email },
  });
  const enrollmentData = await prisma.enrollmentData.findFirst({
    where: { email: params.email },
  });
  if (!studentData || !enrollmentData) {
    throw notFound();
  }

  return (
    <main>
      <h1 className="text-center">Edit Student</h1>
    </main>
  );
};

export default EditStudentPage;
