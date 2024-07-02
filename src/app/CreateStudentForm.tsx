"use client";

import { useState } from "react";
import { Hobby, Level, Major } from "@prisma/client";
import { Form, Button, Col, Container, Card, Row } from "react-bootstrap";

const CreateStudentForm = () => {
  const formPadding = "py-1";
  const levelKeys = Object.keys(Level).filter((key) => isNaN(Number(key)));
  const hobbyKeys = Object.keys(Hobby).filter((key) => isNaN(Number(key)));
  const majorKeys = Object.keys(Major).filter((key) => isNaN(Number(key)));
  const gpaValues = ["0.0-0.9", "1.0-1.9", "2.0-2.9", "3.0-3.9", "4.0+"];

  return (
    <Container>
      <Card>
        <Card.Body>
          <Form>
            <Row className={formPadding}>
              <Col>
                <Form.Group controlId="formName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control type="text" placeholder="Your name" />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" placeholder="Your email" />
                </Form.Group>
              </Col>
            </Row>
            <Row className={formPadding}>
              <Form.Group controlId="formBio">
                <Form.Label>Biographical Statement</Form.Label>
                <Form.Control as="textarea" placeholder="A bit about you" />
              </Form.Group>
            </Row>
            <Row className={formPadding}>
              <Col>
                <Form.Group controlId="formLevel">
                  <Form.Label>Level</Form.Label>
                  <Form.Select>
                    {levelKeys.map((level) => (
                      <option key={level} value={level}>
                        {level}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Text style={{ color: "red" }}>
                    What is your level? (required)
                  </Form.Text>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formGPA">
                  <Form.Label>GPA</Form.Label>
                  <Form.Select>
                    {gpaValues.map((gpa, index) => (
                      <option key={gpa} value={index}>
                        {gpa}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Text style={{ color: "red" }}>
                    Select one (required)
                  </Form.Text>
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
                  />
                ))}
                <Form.Text className="text-muted">
                  {" "}
                  Select hobbies (optional)
                </Form.Text>
              </Form.Group>
            </Row>
            <Row className={formPadding}>
              <Form.Group controlId="formMajor">
                <Form.Label>Major&nbsp;&nbsp;</Form.Label>
                {majorKeys.map((major) => (
                  <Form.Check
                    key={major}
                    inline
                    type="radio"
                    name="major"
                    label={major}
                    id={major}
                  />
                ))}
                <Form.Text style={{ color: "red" }}>
                  What is your major? (required)
                </Form.Text>
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
