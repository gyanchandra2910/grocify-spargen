import React, { useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Card, Button, Badge } from 'react-bootstrap'
import BannerImage from '../components/BannerImage'
import Meta from '../components/Meta'
import Rating from '../components/Rating'
import { listProducts } from '../actions/productActions'
import { useTheme } from '../ThemeContext'
import { bgClass, textClass } from '../themeUtils'
import { FaLeaf, FaShoppingBasket, FaCarrot, FaAppleAlt } from 'react-icons/fa'
import '../banner.css'

const HomeScreen = ({ match, history }) => {
  const keyword = match.params.keyword

  const pageNumber = match.params.pageNumber || 1

  const dispatch = useDispatch()

  const productList = useSelector((state) => state.productList)
  const { products } = productList

  const { theme } = useTheme();

  // Get unique categories from products for dynamic category buttons
  const topCategories = useMemo(() => {
    if (!products || products.length === 0) return []
    
    // Get all categories, count their occurrences, and get the top 4
    const categoryCounts = products.reduce((acc, product) => {
      const category = product.category
      if (category) {
        acc[category] = (acc[category] || 0) + 1
      }
      return acc
    }, {})
    
    // Convert to array of [category, count] pairs and sort by count (descending)
    return Object.entries(categoryCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 4)
      .map(([category]) => category)
  }, [products])

  // Handle category click - navigate to all products with the selected category
  const handleCategoryClick = (category) => {
    history.push(`/all-products?category=${category}`)
  }

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber))
  }, [dispatch, keyword, pageNumber])
  return (
    <>
      <Meta />      {!keyword ? (
        <div className="hero-banner mb-5">
          <BannerImage 
            src="/images/banner-groceries.jpg"
            alt="Fresh groceries"
            className="hero-banner-img"
            height="400px"
            theme={theme}
            overlayContent={
              <div className="hero-banner-content">
                <h1 className="hero-title">Fresh & Healthy Groceries</h1>
                <p className="hero-subtitle">
                  Shop quality products at the best prices with fast delivery to your door
                </p>
                <Button 
                  variant={theme === 'dark' ? 'light' : 'success'}
                  className="hero-btn"
                  onClick={() => history.push('/all-products')}
                  aria-label="Shop now"
                >
                  Shop Now <i className="fas fa-arrow-right ms-2"></i>
                </Button>
              </div>
            }
          />
        </div>
      ) : (
        <div className="d-flex align-items-center mb-4">
          <Link to='/' className={`btn btn-outline-${theme === 'dark' ? 'light' : 'primary'} rounded-pill`}>
            <i className="fas fa-arrow-left me-2"></i>
            Back to Home
          </Link>
          <h4 className="mb-0 ms-3">
            Search Results for: <span className={theme === 'dark' ? 'text-warning' : 'text-primary'}>{keyword}</span>
          </h4>
        </div>
      )}
      
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className={`section-title ${textClass(theme)}`}>
          {keyword ? 'Search Results' : 'Latest Products'}
        </h2>
      </div>
      
      {!keyword && products && products.length > 0 && (
        <div className="featured-products mb-5">
          <h2 className={`section-title mb-4 ${textClass(theme)}`}>
            Featured Products
          </h2>
          <div className="position-relative">
            <Row>
              {products
                .filter(product => product.rating >= 4)
                .slice(0, 4)
                .map((product) => (
                  <Col key={product._id} md={6} lg={3} className="mb-4">
                    <Card className={`my-3 h-100 product-card featured-card ${bgClass(theme)} ${textClass(theme)}`}>
                      <div className="position-relative overflow-hidden">
                        <Badge
                          bg={theme === 'dark' ? 'warning' : 'warning'}
                          className="position-absolute top-0 start-0 m-2 py-2 px-3 rounded-pill"
                          style={{ zIndex: 2 }}
                        >
                          <i className="fas fa-star me-1"></i> Featured
                        </Badge>
                        <Link to={`/product/${product._id}`}>
                          <Card.Img 
                            src={product.image} 
                            alt={product.name}
                            className="product-card-img"
                            loading="lazy"
                          />
                        </Link>
                      </div>
                      
                      <Card.Body className={`d-flex flex-column ${bgClass(theme)}`}>
                        <Link to={`/product/${product._id}`} className="text-decoration-none">
                          <Card.Title as='h3' className="product-title">
                            {product.name}
                          </Card.Title>
                        </Link>
                        
                        <div className="mb-2">
                          <Rating value={product.rating} text={`${product.numReviews} reviews`} />
                        </div>
                        
                        <div className="mt-2">
                          <p className="product-price mb-2">₹{product.price}</p>
                        </div>
                        
                        <Button 
                          variant={theme === 'dark' ? 'light' : 'success'} 
                          className="add-to-cart-btn mt-auto"
                          onClick={() => window.location.href = `/cart/${product._id}?qty=1`}
                        >
                          <i className="fas fa-shopping-cart me-1"></i> Add to Cart
                        </Button>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
            </Row>
          </div>
        </div>
      )}
      
      {!keyword && (
        <div className="category-badges">
          {topCategories.length > 0 ? (
            topCategories.map((category, index) => {
              // Choose an icon based on category name or index
              let icon;
              const lowerCategory = category.toLowerCase();
              if (lowerCategory.includes('fruit') || lowerCategory.includes('apple')) {
                icon = <FaAppleAlt />;
              } else if (lowerCategory.includes('veg') || lowerCategory.includes('fresh')) {
                icon = <FaCarrot />;
              } else if (index % 2 === 0) {
                icon = <FaLeaf />;
              } else {
                icon = <FaShoppingBasket />;
              }
              
              return (
                <Button
                  key={category}
                  onClick={() => handleCategoryClick(category)}
                  variant={`${theme === 'dark' ? 'light' : 'success'}`}
                  className="category-badge"
                  aria-label={`Filter by ${category}`}
                >
                  {icon} {category}
                </Button>
              );
            })
          ) : (
            <Button 
              variant={`${theme === 'dark' ? 'light' : 'success'}`}
              className="category-badge"
              onClick={() => history.push('/all-products')}
            >
              <FaShoppingBasket /> All Products
            </Button>
          )}
        </div>
      )}

      {!keyword && products && products.length > 0 && (
        <div className="promo-section mb-5 mt-5">
          <Row className="g-4">
            <Col md={6} lg={4}>
              <div className={`promo-card ${bgClass(theme)}`}>
                <div className="promo-icon">
                  <i className="fas fa-shipping-fast"></i>
                </div>
                <div className="promo-content">
                  <h4 className="promo-title">Free Shipping</h4>
                  <p className="promo-text mb-0">On all orders over ₹500</p>
                </div>
              </div>
            </Col>
            <Col md={6} lg={4}>
              <div className={`promo-card ${bgClass(theme)}`}>
                <div className="promo-icon">
                  <i className="fas fa-sync-alt"></i>
                </div>
                <div className="promo-content">
                  <h4 className="promo-title">Easy Returns</h4>
                  <p className="promo-text mb-0">30 day return policy</p>
                </div>
              </div>
            </Col>
            <Col md={12} lg={4}>
              <div className={`promo-card ${bgClass(theme)}`}>
                <div className="promo-icon">
                  <i className="fas fa-headset"></i>
                </div>
                <div className="promo-content">
                  <h4 className="promo-title">24/7 Support</h4>
                  <p className="promo-text mb-0">Customer support</p>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      )}
    </>
  )
}

export default HomeScreen

