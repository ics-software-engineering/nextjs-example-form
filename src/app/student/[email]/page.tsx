import { prisma } from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import { StudentData, EnrollmentData } from "@prisma/client";
import EditStudentForm from "../../../components/EditStudentForm";

const EditStudentPage = async ({ params }: { params: { email: string } }) => {
  const email = decodeURIComponent(params.email); // CAM: this is important

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
  console.log("EditStudentPage: ", email, student); // Show server-side email.

  const reload = async () => {
    "use server"; // CAM: this function must be server-side and async to pass it to the form
    console.log("EditStudentPage.reload: ", student.email); // Show server-side email.
    redirect(`/student/${student.email}`); // redirect is a server-side function
  };

  if (!student.bio) student.bio = "";
  return (
    <main>
      <h1 className="text-center">Edit Student</h1>
      <EditStudentForm student={student} reload={reload} />
    </main>
  );
};

export default EditStudentPage;
