import React from 'react'
import { Container, Row, Col, Form, Button, InputGroup } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useTheme } from '../ThemeContext'
import { bgClass, textClass } from '../themeUtils'

const Footer = () => {
  const { theme } = useTheme();
  
  return (
    <footer className={`mt-5 pt-5 pb-4 border-0 ${bgClass(theme)} ${textClass(theme)}`}>
      <Container>
        <Row className="mb-4">
          <Col lg={4} md={6} className="mb-4 mb-md-0">
            <div className="mb-4">
              <div className="d-flex align-items-center mb-3">
                <i className="fas fa-leaf me-2 fs-3 text-success"></i>
                <span className="fw-bold fs-4">Grocery Store</span>
              </div>
              <p className="mb-3">
                Your one-stop destination for fresh groceries and everyday essentials.
                We deliver quality products right to your door.
              </p>
              <div className="d-flex gap-3 mb-3">
                {/* Social icons - use button for accessibility */}
                <button type="button" className={`${textClass(theme)} fs-5 btn btn-link p-0`} aria-label="Facebook">
                  <i className="fab fa-facebook-f"></i>
                </button>
                <button type="button" className={`${textClass(theme)} fs-5 btn btn-link p-0`} aria-label="Twitter">
                  <i className="fab fa-twitter"></i>
                </button>
                <button type="button" className={`${textClass(theme)} fs-5 btn btn-link p-0`} aria-label="Instagram">
                  <i className="fab fa-instagram"></i>
                </button>
                <button type="button" className={`${textClass(theme)} fs-5 btn btn-link p-0`} aria-label="Pinterest">
                  <i className="fab fa-pinterest"></i>
                </button>
              </div>
            </div>
          </Col>
          
          <Col lg={2} md={6} className="mb-4 mb-md-0">
            <h5 className="text-uppercase mb-4 fw-bold">Quick Links</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/" className={`${textClass(theme)} text-decoration-none`}>
                  <i className="fas fa-angle-right me-2"></i>Home
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/all-products" className={`${textClass(theme)} text-decoration-none`}>
                  <i className="fas fa-angle-right me-2"></i>All Products
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/cart" className={`${textClass(theme)} text-decoration-none`}>
                  <i className="fas fa-angle-right me-2"></i>Cart
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/login" className={`${textClass(theme)} text-decoration-none`}>
                  <i className="fas fa-angle-right me-2"></i>Account
                </Link>
              </li>
            </ul>
          </Col>
          
          <Col lg={3} md={6} className="mb-4 mb-md-0">
            <h5 className="text-uppercase mb-4 fw-bold">Contact Us</h5>
            <ul className="list-unstyled">
              <li className="mb-3">
                <i className="fas fa-map-marker-alt me-2 text-success"></i>
                123 Grocery St, Market City
              </li>
              <li className="mb-3">
                <i className="fas fa-envelope me-2 text-success"></i>
                support@grocerystore.com
              </li>
              <li className="mb-3">
                <i className="fas fa-phone-alt me-2 text-success"></i>
                +1 (234) 567-8900
              </li>
              <li className="mb-3">
                <i className="fas fa-clock me-2 text-success"></i>
                Mon-Sat: 8:00 AM - 8:00 PM
              </li>
            </ul>
          </Col>
          
          <Col lg={3} md={6}>
            <h5 className="text-uppercase mb-4 fw-bold">Subscribe</h5>
            <p className="mb-3">Subscribe to our newsletter for updates and offers</p>
            <InputGroup className="mb-3">
              <Form.Control
                placeholder="Your email"
                aria-label="Subscribe to newsletter"
                aria-describedby="subscribe-button"
                className="border-end-0"
              />
              <Button 
                id="subscribe-button" 
                variant={theme === 'dark' ? 'light' : 'success'}
                className="border-start-0"
              >
                <i className="fas fa-paper-plane"></i>
              </Button>
            </InputGroup>
            <img 
              src="/images/payment-methods.png" 
              alt="Payment methods" 
              className="img-fluid mt-2"
              style={{ maxHeight: '30px' }}
            />
          </Col>
        </Row>
        
        <hr className={theme === 'dark' ? 'border-secondary' : 'border-success'} />
        
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center">
          <div className="text-center text-md-start mb-3 mb-md-0">
            &copy; {new Date().getFullYear()} Grocery Store. All rights reserved.
          </div>
          <div>
            <Link to="#" className={`${textClass(theme)} text-decoration-none mx-2`}>Privacy Policy</Link>
            <Link to="#" className={`${textClass(theme)} text-decoration-none mx-2`}>Terms of Service</Link>
          </div>
        </div>
      </Container>
    </footer>
  )
}

export default Footer

