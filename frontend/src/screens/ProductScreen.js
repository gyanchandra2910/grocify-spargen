import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'
import Rating from '../components/Rating'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Meta from '../components/Meta'
import {
  listProductDetails,
  createProductReview,
} from '../actions/productActions'
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants'
import { useTheme } from '../ThemeContext'
import { bgClass, textClass } from '../themeUtils'
import Skeleton from 'react-loading-skeleton'

const ProductScreen = ({ history, match }) => {
  const [qty, setQty] = useState(1)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')

  const dispatch = useDispatch()

  const productDetails = useSelector((state) => state.productDetails)
  const { loading, error, product } = productDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const productReviewCreate = useSelector((state) => state.productReviewCreate)
  const {
    success: successProductReview,
    loading: loadingProductReview,
    error: errorProductReview,
  } = productReviewCreate

  const { theme } = useTheme();

  useEffect(() => {
    if (successProductReview) {
      setRating(0)
      setComment('')
    }
    if (!product._id || product._id !== match.params.id) {
      dispatch(listProductDetails(match.params.id))
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
    }
  }, [dispatch, match, successProductReview, product._id])

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`)
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      createProductReview(match.params.id, {
        rating,
        comment,
      })
    )
  }

  return (
    <>
      <Link className={`btn my-3 ${theme === 'dark' ? 'btn-light text-dark' : 'btn-light'}`} to='/'>
        Go Back
      </Link>
      {loading ? (
        <Row>
          <Col md={6} className="mb-4">
            <Skeleton height={400} className="rounded mb-4" />
          </Col>
          <Col md={3}>
            <Skeleton height={40} className="mb-2" />
            <Skeleton height={30} className="mb-2" />
            <Skeleton height={30} className="mb-2" />
            <Skeleton height={50} className="mb-2" />
          </Col>
          <Col md={3}>
            <Card className={`shadow-sm border-0 ${bgClass(theme)}`}>
              <ListGroup variant='flush'>
                <ListGroup.Item className={bgClass(theme)}>
                  <Skeleton height={25} className="mb-2" />
                </ListGroup.Item>
                <ListGroup.Item className={bgClass(theme)}>
                  <Skeleton height={25} className="mb-2" />
                </ListGroup.Item>
                <ListGroup.Item className={bgClass(theme)}>
                  <Skeleton height={40} className="mb-1" />
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Meta title={product.name} />
          <Row>            <Col md={6}>
              <Image
                src={product.image}
                alt={product.name}
                fluid
                style={{ background: theme === 'dark' ? '#23272b' : '#fff', borderRadius: '0.5rem' }}
                loading="lazy"
                className="product-image-zoom"
              />
            </Col>
            <Col md={3}>
              <ListGroup variant='flush' className={`${bgClass(theme)} ${textClass(theme)}`}>
                <ListGroup.Item className={`${bgClass(theme)} ${textClass(theme)}`}>
                  <h3>{product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item className={`${bgClass(theme)} ${textClass(theme)}`}>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                  />
                </ListGroup.Item>
                <ListGroup.Item className={`${bgClass(theme)} ${textClass(theme)}`}>Price: ₹{product.price}</ListGroup.Item>
                <ListGroup.Item className={`${bgClass(theme)} ${textClass(theme)}`}>
                  Description: {product.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card className={`shadow-sm border-0 ${bgClass(theme)} ${textClass(theme)}`}>
                <ListGroup variant='flush'>
                  <ListGroup.Item className={`${bgClass(theme)} ${textClass(theme)}`}>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>₹{product.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item className={`${bgClass(theme)} ${textClass(theme)}`}>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        {product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  {product.countInStock > 0 && (
                    <ListGroup.Item className={`${bgClass(theme)} ${textClass(theme)}`}>
                      <Row>
                        <Col>Qty</Col>
                        <Col>
                          <Form.Control
                            as='select'
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                            className={`${bgClass(theme)} ${textClass(theme)}`}
                            style={{ backgroundColor: theme === 'dark' ? 'var(--bg-color-dark)' : 'var(--bg-color-light)', color: theme === 'dark' ? 'var(--text-color-dark)' : 'var(--text-color-light)' }}
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}

                  <ListGroup.Item className={`${bgClass(theme)} ${textClass(theme)}`}>
                    <Button
                      onClick={addToCartHandler}
                      className="btn-block transition-all btn-hover-elevate"
                      type='button'
                      disabled={product.countInStock === 0}
                    >
                      Add To Cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <h2>Reviews</h2>
              {product.reviews.length === 0 && <Message>No Reviews</Message>}
              <ListGroup variant='flush' className={`${bgClass(theme)} ${textClass(theme)}`}>
                {product.reviews.map((review) => (
                  <ListGroup.Item key={review._id} className={`${bgClass(theme)} ${textClass(theme)}`}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item className={`${bgClass(theme)} ${textClass(theme)}`}>
                  <h2>Write a Customer Review</h2>
                  {successProductReview && (
                    <Message variant='success'>
                      Review submitted successfully
                    </Message>
                  )}
                  {loadingProductReview && <Loader />}
                  {errorProductReview && (
                    <Message variant='danger'>{errorProductReview}</Message>
                  )}
                  {userInfo ? (
                    <Form onSubmit={submitHandler} className={`${bgClass(theme)} ${textClass(theme)}`}>
                      <Form.Group controlId='rating'>
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                          as='select'
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                          className={`${bgClass(theme)} ${textClass(theme)}`}
                          style={{ backgroundColor: theme === 'dark' ? 'var(--bg-color-dark)' : 'var(--bg-color-light)', color: theme === 'dark' ? 'var(--text-color-dark)' : 'var(--text-color-light)' }}
                        >
                          <option value=''>Select...</option>
                          <option value='1'>1 - Poor</option>
                          <option value='2'>2 - Fair</option>
                          <option value='3'>3 - Good</option>
                          <option value='4'>4 - Very Good</option>
                          <option value='5'>5 - Excellent</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId='comment'>
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as='textarea'
                          row='3'
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                          className={`${bgClass(theme)} ${textClass(theme)}`}
                          style={{ backgroundColor: theme === 'dark' ? 'var(--bg-color-dark)' : 'var(--bg-color-light)', color: theme === 'dark' ? 'var(--text-color-dark)' : 'var(--text-color-light)' }}
                        ></Form.Control>
                      </Form.Group>
                      <Button
                        disabled={loadingProductReview}
                        type='submit'
                        className={`mt-2 ${theme === 'dark' ? 'btn-light text-dark' : 'btn-primary'}`}
                      >
                        Submit
                      </Button>
                    </Form>
                  ) : (
                    <Message>
                      Please <Link to='/login'>sign in</Link> to write a review{' '}
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  )
}

export default ProductScreen
