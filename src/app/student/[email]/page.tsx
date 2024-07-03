import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { StudentData, EnrollmentData } from "@prisma/client";
import EditStudentForm from "./EditStudentForm";

const EditStudentPage = async ({ params }: { params: { email: string } }) => {
  console.log(`EditStudentPage: ${params.email}`);
  const email = decodeURIComponent(params.email);
  console.log(params.email, email);
  const studentData = await prisma.studentData.findUnique({
    where: { email: email },
  });
  const enrollmentData = await prisma.enrollmentData.findUnique({
    where: { email: email },
  });
  console.log(studentData, enrollmentData);
  if (!studentData || !enrollmentData) {
    throw notFound();
  }
  const student = { ...studentData, ...enrollmentData };
  if (!student.bio) student.bio = "";
  console.log(student);
  return (
    <main>
      <h1 className="text-center">Edit Student</h1>
      <EditStudentForm student={student} />
    </main>
  );
};

export default EditStudentPage;
