import { prisma } from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import { StudentData, EnrollmentData } from "@prisma/client";
import EditStudentForm from "../../../components/EditStudentForm";

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
  if (!studentData || !enrollmentData) {
    throw notFound();
  }
  const student = { ...studentData, ...enrollmentData };

  async function reload() {
    "use server";
    redirect(`/student/${student.email}`);
  }
  if (!student.bio) student.bio = "";
  console.log("email page", student);
  return (
    <main>
      <h1 className="text-center">Edit Student</h1>
      <EditStudentForm student={student} reload={reload} />
    </main>
  );
};

export default EditStudentPage;
