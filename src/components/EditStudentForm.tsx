"use client";

import {
  ICreateStudentForm,
  EditStudentSchema,
  hobbyKeys,
  levelKeys,
  majorKeys,
  gpaValues,
} from "@/lib/validationSchemas";
import {
  Button,
  ButtonGroup,
  Card,
  Col,
  Container,
  Form,
  Row,
} from "react-bootstrap";
import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import Multiselect from "multiselect-react-dropdown";
import { upsertStudent } from "@/lib/dbActions";
import swal from "sweetalert";

const EditStudentForm = ({
  student,
  reload,
}: {
  student: ICreateStudentForm;
  reload: () => void;
}) => {
  console.log("EditStudentForm: ", student);

  const formPadding = "py-1";
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(EditStudentSchema),
  });

  const watchMajor = watch("major", student.major);

  console.log(watchMajor);

  const onSubmit = async (data: {
    email: string;
    bio?: string;
    level: string;
    gpa: number;
    major?: string | undefined;
    name: string;
    hobbies?: (string | undefined)[] | undefined;
    enrolled?: Date | undefined;
  }) => {
    console.log(data);
    const result = await upsertStudent(data as ICreateStudentForm);
    console.log(result);
    if (result) {
      swal("Success!", "Student data saved successfully!", "success");
      reset();
    } else {
      swal("Error!", "Failed to save student data!", "error");
    }
    reload();
  };

  return (
    <Container>
      <Card>
        <Card.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <input type="hidden" value={student.email} {...register("email")} />
            <Row className={formPadding}>
              <Col>
                <Form.Group controlId="formName">
                  <Form.Label>
                    Name <Form.Text style={{ color: "red" }}>*</Form.Text>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    defaultValue={student.name}
                    {...register("name")}
                    className={`form-control ${errors.name ? "is-invalid" : ""}`}
                  />
                  <div className="invalid-feedback">{errors.name?.message}</div>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formEmail">
                  <Form.Label>
                    Email <Form.Text style={{ color: "red" }}>*</Form.Text>
                  </Form.Label>
                  <Form.Control type="email" value={student.email} disabled />
                </Form.Group>
              </Col>
            </Row>
            <Row className={formPadding}>
              <Form.Group controlId="formBio">
                <Form.Label>Biographical Statement</Form.Label>
                <Form.Control
                  as="textarea"
                  defaultValue={student.bio ? student.bio : ""}
                  {...register("bio")}
                />
                <Form.Text muted>(optional)</Form.Text>
              </Form.Group>
            </Row>
            <Row className={formPadding}>
              <Col>
                <Form.Group controlId="formLevel">
                  <Form.Label>
                    Level <Form.Text style={{ color: "red" }}>*</Form.Text>
                  </Form.Label>
                  <Form.Select
                    {...register("level")}
                    className={`form-control ${errors.level ? "is-invalid" : ""}`}
                  >
                    {levelKeys.map((level) => (
                      <option
                        key={level}
                        value={level}
                        selected={student.level === level}
                      >
                        {level}
                      </option>
                    ))}
                  </Form.Select>
                  <div className="invalid-feedback">
                    {errors.level?.message}
                  </div>
                  <Form.Text muted>What is your level?</Form.Text>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formGPA">
                  <Form.Label>
                    GPA <Form.Text style={{ color: "red" }}>*</Form.Text>
                  </Form.Label>
                  <Form.Select {...register("gpa")}>
                    {gpaValues.map((gpa, index) => (
                      <option
                        key={gpa}
                        value={index}
                        selected={student.gpa === index}
                      >
                        {gpa}
                      </option>
                    ))}
                  </Form.Select>
                  <div className="invalid-feedback">{errors.gpa?.message}</div>
                  <Form.Text>Select one</Form.Text>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formEnrolled">
                  <Form.Label>
                    Date Enrolled{" "}
                    <Form.Text style={{ color: "red" }}>*</Form.Text>
                  </Form.Label>
                  <Form.Control
                    type="date"
                    value={student.enrolled!.toISOString().split("T")[0]}
                    {...register("enrolled")}
                    className={`form-control ${errors.enrolled ? "is-invalid" : ""}`}
                  />
                  <div className="invalid-feedback">
                    {errors.enrolled?.message}
                  </div>
                </Form.Group>
              </Col>
            </Row>
            <Row className={formPadding}>
              <Form.Group controlId="formHobbies">
                <Form.Label>Hobbies&nbsp;&nbsp;</Form.Label>
                <Controller
                  control={control}
                  name="hobbies"
                  render={({ field: { value, onChange } }) => (
                    <Multiselect
                      options={hobbyKeys}
                      isObject={false}
                      showCheckbox={true}
                      hidePlaceholder={true}
                      closeOnSelect={false}
                      onSelect={onChange}
                      onRemove={onChange}
                      selectedValues={student.hobbies}
                    />
                  )}
                />
                <Form.Text className="text-muted"> Select hobbies</Form.Text>
              </Form.Group>
            </Row>
            <Row className={formPadding}>
              <Form.Group controlId="formMajor">
                <Form.Label>
                  Major <Form.Text style={{ color: "red" }}>*</Form.Text>&nbsp;
                </Form.Label>
                <ButtonGroup
                  className={`form-control ${errors.major ? "is-invalid" : ""}`}
                >
                  {majorKeys.map((major) => (
                    <Form.Check
                      key={major}
                      inline
                      type="radio"
                      label={major}
                      id={major}
                      defaultValue={major}
                      checked={watchMajor === major}
                      {...register("major")}
                    />
                  ))}
                </ButtonGroup>
                <div className="invalid-feedback">{errors.major?.message}</div>
                <Form.Text>What is your major?</Form.Text>
              </Form.Group>
            </Row>
            <Button variant="primary" type="submit">
              Update
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default EditStudentForm;
