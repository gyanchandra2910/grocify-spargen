import React from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap'

const FormContainer = ({ children, variant = 'default' }) => {
  // Variant can be 'default', 'signin', 'payment', etc. to control styling
  return (
    <Container>
      <Row className='justify-content-md-center py-3'>
        <Col xs={12} md={8} lg={6}>
          <Card className='border-0 shadow-sm'>
            <Card.Body className='p-4'>
              {children}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default FormContainer


