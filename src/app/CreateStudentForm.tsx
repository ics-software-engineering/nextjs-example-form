"use client";

import { useState } from "react";
import { Hobby, Level, Major } from "@prisma/client";
import { Form, Button, Col, Container, Card, Row } from "react-bootstrap";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import swal from "sweetalert";
import {
  CreateStudentSchema,
  gpaValues,
  ICreateStudentForm,
} from "@/lib/validationSchemas";

const CreateStudentForm = () => {
  const formPadding = "py-1";
  const levelKeys = Object.keys(Level).filter((key) => isNaN(Number(key)));
  const hobbyKeys = Object.keys(Hobby).filter((key) => isNaN(Number(key)));
  const majorKeys = Object.keys(Major).filter((key) => isNaN(Number(key)));

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(CreateStudentSchema),
  });

  const onSubmit: SubmitHandler<ICreateStudentForm> = (data) =>
    console.log(data);

  return (
    <Container>
      <Card>
        <Card.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row className={formPadding}>
              <Col>
                <Form.Group controlId="formName">
                  <Form.Label>
                    Name <Form.Text style={{ color: "red" }}>*</Form.Text>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Your name"
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
                  <Form.Control
                    type="email"
                    placeholder="Your email"
                    {...register("email")}
                    className={`form-control ${errors.email ? "is-invalid" : ""}`}
                  />
                  <div className="invalid-feedback">
                    {errors.email?.message}
                  </div>
                </Form.Group>
              </Col>
            </Row>
            <Row className={formPadding}>
              <Form.Group controlId="formBio">
                <Form.Label>Biographical Statement</Form.Label>
                <Form.Control
                  as="textarea"
                  placeholder="A bit about you"
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
                      <option key={level} value={level}>
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
                  <Form.Select>
                    {gpaValues.map((gpa, index) => (
                      <option key={gpa} value={index}>
                        {gpa}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Text>Select one</Form.Text>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formEnrolled">
                  <Form.Label>Date Enrolled</Form.Label>
                  <Form.Control type="date" />
                </Form.Group>
              </Col>
            </Row>
            <Row className={formPadding}>
              <Form.Group controlId="formHobbies">
                <Form.Label>Hobbies&nbsp;&nbsp;</Form.Label>
                {hobbyKeys.map((hobby) => (
                  <Form.Check
                    key={hobby}
                    inline
                    type="checkbox"
                    label={hobby}
                    id={hobby}
                    {...register("hobbies")}
                  />
                ))}
                <Form.Text className="text-muted"> Select hobbies</Form.Text>
              </Form.Group>
            </Row>
            <Row className={formPadding}>
              <Form.Group controlId="formMajor">
                <Form.Label>
                  Major <Form.Text style={{ color: "red" }}>*</Form.Text>&nbsp;
                </Form.Label>
                {majorKeys.map((major) => (
                  <Form.Check
                    key={major}
                    inline
                    type="radio"
                    label={major}
                    id={major}
                    {...register("major")}
                  />
                ))}
                <Form.Text>What is your major?</Form.Text>
              </Form.Group>
            </Row>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default CreateStudentForm;
