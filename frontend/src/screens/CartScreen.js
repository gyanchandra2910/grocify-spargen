import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Table, Image, Form, Button, Card, Badge } from 'react-bootstrap'
import { addToCart, removeFromCart } from '../actions/cartActions'
import { useTheme } from '../ThemeContext'
import { bgClass, textClass, tableVariant } from '../themeUtils'
import Skeleton from 'react-loading-skeleton'

const CartScreen = ({ match, location, history }) => {
  const productId = match.params.id
  const [cartLoading, setCartLoading] = useState(true)

  const qty = location.search ? Number(location.search.split('=')[1]) : 1

  const dispatch = useDispatch()

  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart

  const { theme } = useTheme();

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty))
    }
    
    // Simulate cart loading for 1 second
    const timer = setTimeout(() => {
      setCartLoading(false)
    }, 1000)
    
    return () => clearTimeout(timer)
  }, [dispatch, productId, qty])

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id))
  }

  const checkoutHandler = () => {
    history.push('/login?redirect=shipping')
  }

  return (
    <>
      <div className="d-flex align-items-center justify-content-between mb-4">
        <h2 className="mb-0 fw-bold">
          <i className="fas fa-shopping-cart me-2 text-primary"></i>
          Your Shopping Cart
        </h2>
        <Link to="/" className={`btn btn-outline-${theme === 'dark' ? 'light' : 'primary'} rounded-pill`}>
          <i className="fas fa-arrow-left me-2"></i>
          Continue Shopping
        </Link>
      </div>
      <Row>
        <Col lg={8}>
          {cartLoading ? (
            <Card className={`border-0 shadow-sm ${bgClass(theme)}`}>
              <Card.Header className={`${bgClass(theme)} py-3`}>
                <Skeleton height={24} width={150} />
              </Card.Header>
              <Card.Body className={bgClass(theme)}>
                {Array.from({ length: 3 }).map((_, idx) => (
                  <div key={idx} className="d-flex mb-4">
                    <div className="me-3">
                      <Skeleton height={80} width={80} />
                    </div>
                    <div className="flex-grow-1">
                      <Skeleton height={25} width="60%" className="mb-2" />
                      <div className="d-flex justify-content-between">
                        <Skeleton height={20} width={60} />
                        <Skeleton height={35} width={100} />
                        <Skeleton height={20} width={70} />
                      </div>
                    </div>
                  </div>
                ))}
              </Card.Body>
            </Card>
          ) : cartItems.length === 0 ? (
            <div className={`text-center py-5 ${bgClass(theme)} ${textClass(theme)}`}>
              <div className="mb-4">
                <i className="fas fa-shopping-cart fa-4x text-muted"></i>
              </div>
              <h3>Your cart is empty</h3>
              <p className="text-muted mb-4">Looks like you haven't added any products to your cart yet.</p>
              <Link to="/" className={`btn btn-${theme === 'dark' ? 'light' : 'primary'} px-4 py-2`}>
                Start Shopping
              </Link>
            </div>
          ) : (
            <Card className={`border-0 shadow-sm ${bgClass(theme)} ${textClass(theme)}`}>
              <Card.Header className={`${bgClass(theme)} ${textClass(theme)} py-3`}>
                <h5 className="mb-0">Cart Items ({cartItems.reduce((acc, item) => acc + item.qty, 0)})</h5>
              </Card.Header>
              <Table responsive className={`mb-0 ${bgClass(theme)} ${textClass(theme)}`} variant={tableVariant(theme)}>
                <thead className={bgClass(theme)}>
                  <tr>
                    <th className="py-3 border-0">Product</th>
                    <th className="py-3 border-0">Price</th>
                    <th className="py-3 border-0">Quantity</th>
                    <th className="py-3 border-0">Total</th>
                    <th className="py-3 border-0"></th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => (
                    <tr key={item.product}>
                      <td className="align-middle">
                        <div className="d-flex align-items-center">                          <Image 
                            src={item.image} 
                            alt={item.name} 
                            width={70} 
                            height={70} 
                            className="img-thumbnail p-2 me-3"
                            loading="lazy"
                          />
                          <div>
                            <Link to={`/product/${item.product}`} className={`text-decoration-none ${textClass(theme)}`}>
                              <h6 className="mb-0">{item.name}</h6>
                            </Link>
                            <small className="text-muted">{item.category}</small>
                          </div>
                        </div>
                      </td>
                      <td className="align-middle">
                        <Badge bg={theme === 'dark' ? 'secondary' : 'light'} text={theme === 'dark' ? 'light' : 'dark'} className="px-3 py-2 fs-6">
                          ₹{item.price}
                        </Badge>
                      </td>
                      <td className="align-middle" style={{ maxWidth: '150px' }}>
                        <Form.Select
                          value={item.qty}
                          onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}
                          className={textClass(theme)}
                          style={{ backgroundColor: theme === 'dark' ? 'var(--bg-color-dark)' : 'var(--bg-color-light)', color: theme === 'dark' ? 'var(--text-color-dark)' : 'var(--text-color-light)' }}
                          aria-label="Product quantity"
                        >
                          {[...Array(item.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </Form.Select>
                      </td>
                      <td className="align-middle fw-bold">
                        ₹{(item.qty * item.price).toFixed(2)}
                      </td>
                      <td className="align-middle">
                        <Button
                          type="button"
                          variant={theme === 'dark' ? 'outline-light' : 'outline-danger'}
                          size="sm"
                          onClick={() => removeFromCartHandler(item.product)}
                          className="rounded-circle p-2"
                        >
                          <i className="fas fa-trash-alt"></i>
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card>
          )}
        </Col>
        <Col lg={4}>
          <Card className={`border-0 shadow-sm ${bgClass(theme)} ${textClass(theme)}`}>
            <Card.Header className={`${bgClass(theme)} ${textClass(theme)} py-3`}>
              <h5 className="mb-0">Order Summary</h5>
            </Card.Header>
            <Card.Body>
              <div className="d-flex justify-content-between mb-3">
                <span>Items ({cartItems.reduce((acc, item) => acc + item.qty, 0)}):</span>
                <span className="fw-bold">
                  ₹{cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
                </span>
              </div>
              <div className="d-flex justify-content-between mb-3">
                <span>Shipping:</span>
                <span className="text-success">Free</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between mb-4">
                <h5>Total:</h5>
                <h5>₹{cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}</h5>
              </div>
              <Button
                type="button"
                className="btn-block transition-all btn-hover-elevate"
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
                variant={theme === 'dark' ? 'light' : 'primary'}
              >
                <i className="fas fa-lock me-2"></i>
                Proceed To Checkout
              </Button>
              <div className="d-flex justify-content-center">
                <img 
                  src="/images/payment-methods.png" 
                  alt="Payment Methods" 
                  className="img-fluid" 
                  style={{ maxHeight: '30px', opacity: 0.7 }}
                />
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default CartScreen

