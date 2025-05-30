import React from 'react'
import { Link } from 'react-router-dom'
import { Card, Badge, Button } from 'react-bootstrap'
import Rating from './Rating'
import { useTheme } from '../ThemeContext'
import { bgClass, textClass } from '../themeUtils'
import '../banner.css' // Import the new styles

const Product = ({ product }) => {
  const { theme } = useTheme();  return (
    <Card className={`my-3 h-100 product-card ${bgClass(theme)} ${textClass(theme)}`}>
      <div className="position-relative overflow-hidden">
        <Link to={`/product/${product._id}`}>
          <Card.Img 
            src={product.image} 
            variant='top' 
            className="product-card-img"
            alt={product.name}
            loading="lazy"
          />
        </Link>

        {/* Stock badges with improved styling */}
        {product.countInStock === 0 && (
          <Badge 
            bg="danger" 
            className="position-absolute top-0 end-0 m-2 py-2 px-3"
            style={{ zIndex: 10, fontSize: '0.8rem', borderRadius: '0.5rem' }}
          >
            Out of Stock
          </Badge>
        )}
        {product.countInStock > 0 && product.countInStock <= 5 && (
          <Badge 
            bg="warning" 
            className="position-absolute top-0 end-0 m-2 py-2 px-3 text-dark"
            style={{ zIndex: 10, fontSize: '0.8rem', borderRadius: '0.5rem' }}
          >
            Low Stock
          </Badge>
        )}
        
        {/* Category tag */}
        {product.category && (
          <Badge
            bg={theme === 'dark' ? 'dark' : 'light'}
            text={theme === 'dark' ? 'light' : 'dark'}
            className="position-absolute top-0 start-0 m-2 text-capitalize"
            style={{ fontSize: '0.75rem', borderRadius: '0.5rem' }}
          >
            {product.category}
          </Badge>
        )}
      </div>

      <Card.Body className={`d-flex flex-column ${bgClass(theme)} ${textClass(theme)}`}> 
        <Link to={`/product/${product._id}`} className="text-decoration-none">
          <Card.Title as='h3' className="product-title">
            {product.name}
          </Card.Title>
        </Link>

        <Card.Text as='div' className="mb-2">
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
        </Card.Text>

        <div className="mt-2">
          <p className="product-price mb-3">₹{product.price}</p>
        </div>

        <div className="d-flex justify-content-between align-items-center mt-auto">
          <Link to={`/product/${product._id}`} className="text-decoration-none me-2">
            <Button 
              variant={theme === 'dark' ? 'outline-light' : 'outline-primary'}
              className="rounded-pill btn-sm"
            >
              <i className="fas fa-eye me-1"></i> Details
            </Button>
          </Link>          <Button 
            variant={theme === 'dark' ? 'light' : 'success'} 
            className="add-to-cart-btn flex-grow-1"
            onClick={() => window.location.href = `/cart/${product._id}?qty=1`}
          >
            <i className="fas fa-shopping-cart me-1"></i> Add to Cart
          </Button>
        </div>
      </Card.Body>
        {/* Quick action overlay on hover */}
      <div 
        className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center product-hover-overlay"
        style={{ 
          background: 'rgba(0,0,0,0.5)', 
          opacity: 0,
          visibility: 'hidden',
          transition: 'all 0.3s ease',
          zIndex: 5,
          borderRadius: '12px'
        }}
      >
        <Link to={`/product/${product._id}`}>
          <Button 
            variant="light" 
            className="mx-2 rounded-circle" 
            style={{width: '45px', height: '45px'}}
            aria-label="View product details"
          >
            <i className="fas fa-eye"></i>
          </Button>
        </Link>
        <Button 
          variant="success" 
          className="mx-2 rounded-circle"
          style={{width: '45px', height: '45px'}} 
          onClick={() => window.location.href = `/cart/${product._id}?qty=1`}
          aria-label="Add to cart"
        >
          <i className="fas fa-shopping-cart"></i>
        </Button>
      </div>
    </Card>
  )
}

export default Product

