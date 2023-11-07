// Header.js
import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {
  Form as BootstrapForm,
  Button as BootstrapButton,
} from 'react-bootstrap'; // Using aliases

const Main = () => {
  return (
    <>
      <Container fluid className="p-0 m-0">
        <Row className="align-items-center" style={{ paddingTop: '10%' }}>
          <Col md={6}>
            <h1 className="display-1 my-big-text">
              Finding Your Next Job Has Never Been So Easy
            </h1>
          </Col>
          <Col md={6}>
            <BootstrapForm>
              <Row>
                <Col sm={8}>
                  <BootstrapForm.Group controlId="jobPosition">
                    <BootstrapForm.Control
                      type="text"
                      placeholder="Job Position"
                      style={{ border: '1px solid', fontSize: '1rem' }}
                    />
                  </BootstrapForm.Group>
                </Col>
              </Row>
              <Row>
                <Col sm={8}>
                  <BootstrapForm.Group controlId="location">
                    <BootstrapForm.Control
                      type="text"
                      placeholder="Location"
                      style={{
                        border: '1px solid',
                        fontSize: '1rem',
                        marginTop: '1rem',
                      }}
                    />
                  </BootstrapForm.Group>
                </Col>
              </Row>
              <BootstrapButton variant="primary" type="submit" className="mt-3">
                Search
              </BootstrapButton>
            </BootstrapForm>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Main;
