import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import CheckoutSteps from '../components/CheckoutSteps'
import { createOrder } from '../actions/orderActions'
import { ORDER_CREATE_RESET } from '../constants/orderConstants'
import { useTheme } from '../ThemeContext'
import { bgClass, textClass } from '../themeUtils'
import Skeleton from 'react-loading-skeleton'

const PlaceOrderScreen = ({ history }) => {
  const dispatch = useDispatch()
  const { theme } = useTheme();
  const [placeOrderLoading, setPlaceOrderLoading] = useState(true)

  const cart = useSelector((state) => state.cart)

  //   Calculate prices
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2)
  }

  
  cart.itemsPrice = addDecimals(
    cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  )
  cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 100)
  cart.taxPrice = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)))
  cart.totalPrice = (
    Number(cart.itemsPrice) +
    Number(cart.shippingPrice) +
    Number(cart.taxPrice)
  ).toFixed(2)

  const orderCreate = useSelector((state) => state.orderCreate)
  const { order, success, error } = orderCreate

  useEffect(() => {
    if (success) {
      history.push(`/order/${order._id}`)
      dispatch({ type: ORDER_CREATE_RESET })
    }
    
    // Simulate order data loading for 1 second
    const timer = setTimeout(() => {
      setPlaceOrderLoading(false)
    }, 1000)
    
    return () => clearTimeout(timer)
    // eslint-disable-next-line
  }, [history, success])

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
    )
  }

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      {placeOrderLoading ? (
        <Row>
          <Col md={8}>
            <Skeleton height={100} className="mb-3" />
            <Skeleton height={80} className="mb-3" />
            <Card className={`${bgClass(theme)} border-0 shadow-sm`}>
              <Card.Body>
                <Skeleton height={30} width="40%" className="mb-3" />
                {Array.from({ length: 3 }).map((_, idx) => (
                  <div key={idx} className="d-flex mb-4">
                    <Skeleton height={60} width={60} className="me-3" />
                    <div className="flex-grow-1">
                      <Skeleton height={20} width="70%" className="mb-2" />
                      <Skeleton height={15} width="25%" />
                    </div>
                  </div>
                ))}
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className={`${bgClass(theme)} shadow-sm border-0`}>
              <Card.Body>
                <Skeleton height={30} width="60%" className="mb-3" />
                {Array.from({ length: 4 }).map((_, idx) => (
                  <div key={idx} className="d-flex justify-content-between mb-3">
                    <Skeleton height={20} width="30%" />
                    <Skeleton height={20} width="20%" />
                  </div>
                ))}
                <Skeleton height={40} className="mt-3" />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      ) : (
        <Row>
          <Col md={8}>
            <ListGroup variant='flush' className={`${bgClass(theme)} ${textClass(theme)}`}>
              <ListGroup.Item className={`${bgClass(theme)} ${textClass(theme)}`}>
                <h2>Shipping</h2>
                <p>
                  <strong>Address:</strong>
                  {cart.shippingAddress.address}, {cart.shippingAddress.city}{' '}
                  {cart.shippingAddress.postalCode},{' '}
                  {cart.shippingAddress.country}
                </p>
              </ListGroup.Item>

              <ListGroup.Item className={`${bgClass(theme)} ${textClass(theme)}`}>
                <h2>Payment Method</h2>
                <strong>Method: </strong>
                {cart.paymentMethod}
              </ListGroup.Item>

              <ListGroup.Item className={`${bgClass(theme)} ${textClass(theme)}`}>
                <h2>Order Items</h2>
                {cart.cartItems.length === 0 ? (
                  <Message>{'Your cart is empty'}</Message>
                ) : (
                  <ListGroup variant='flush'>
                    {cart.cartItems.map((item, index) => (
                      <ListGroup.Item key={index} className={`${bgClass(theme)} ${textClass(theme)}`}>
                        <Row>
                          <Col md={1}>                            <Image
                              src={item.image}
                              alt={item.name}
                              fluid
                              rounded
                              style={{ background: theme === 'dark' ? '#23272b' : '#fff', borderRadius: '0.5rem' }}
                              loading="lazy"
                            />
                          </Col>
                          <Col>
                            <Link to={`/product/${item.product}`} className={`text-decoration-none ${textClass(theme)}`}>
                              {item.name}
                            </Link>
                          </Col>
                          <Col md={4}>
                            {item.qty} x ₹{item.price} = ₹{item.qty * item.price}
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                )}
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={4}>
            <Card className={`shadow-sm border-0 ${bgClass(theme)} ${textClass(theme)}`}>
              <ListGroup variant='flush'>
                <ListGroup.Item className={`${bgClass(theme)} ${textClass(theme)}`}>
                  <h2>Order Summary</h2>
                </ListGroup.Item>
                <ListGroup.Item className={`${bgClass(theme)} ${textClass(theme)}`}>
                  <Row>
                    <Col>Items</Col>
                    <Col>₹{cart.itemsPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item className={`${bgClass(theme)} ${textClass(theme)}`}>
                  <Row>
                    <Col>Shipping</Col>
                    <Col>₹{cart.shippingPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item className={`${bgClass(theme)} ${textClass(theme)}`}>
                  <Row>
                    <Col>Tax</Col>
                    <Col>₹{cart.taxPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item className={`${bgClass(theme)} ${textClass(theme)}`}>
                  <Row>
                    <Col>Total</Col>
                    <Col>₹{cart.totalPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item className={`${bgClass(theme)} ${textClass(theme)}`}>
                  {error && <Message variant='danger'>{error}</Message>}
                </ListGroup.Item>
                <ListGroup.Item className={`${bgClass(theme)} ${textClass(theme)}`}>
                  <Button
                    type="button"
                    className="btn-block transition-all btn-hover-elevate"
                    disabled={cart.cartItems.length === 0}
                    onClick={placeOrderHandler}
                  >
                    Place Order
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </>
  )
}

export default PlaceOrderScreen
