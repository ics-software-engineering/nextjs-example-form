import * as Yup from "yup";

export const gpaValues = ["0.0-0.9", "1.0-1.9", "2.0-2.9", "3.0-3.9", "4.0+"];
export const gpa2String = (num: number) => gpaValues[num];
export const gpa2Number = (str: string) => gpaValues.indexOf(str);

export const CreateStudentSchema = Yup.object().shape({
  name: Yup.string().required(),
  email: Yup.string().email().required(),
  bio: Yup.string(),
  level: Yup.string().required(),
  gpa: Yup.number().required(),
  enrolled: Yup.date(),
  hobbies: Yup.array().of(Yup.string()),
  major: Yup.string().required(),
});
