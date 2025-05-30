import React, { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Card, Button, Form } from 'react-bootstrap';
import { listProducts } from '../actions/productActions';
import Product from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { useTheme } from '../ThemeContext';
import { bgClass, textClass } from '../themeUtils';

const AllProductsScreen = ({ location }) => {
  const dispatch = useDispatch();
  const { theme } = useTheme();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products = [] } = productList;
  
  // Parse query parameters
  const query = new URLSearchParams(location.search);
  const categoryFromUrl = query.get('category');

  // Get unique categories from products
  const categoryOptions = useMemo(() => {
    if (!products || products.length === 0) return [];
    
    const categories = products
      .map(product => product.category)
      .filter((category, index, self) => 
        category && self.indexOf(category) === index
      );
    
    return categories.sort();
  }, [products]);
  // Filter state
  const [selectedCategories, setSelectedCategories] = useState(
    categoryFromUrl ? [categoryFromUrl] : []
  );
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [inStockOnly, setInStockOnly] = useState(false);

  // Update browser URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (selectedCategories.length === 1) {
      params.set('category', selectedCategories[0]);
    } else {
      params.delete('category');
    }
    
    const newUrl = 
      window.location.pathname + 
      (params.toString() ? `?${params.toString()}` : '');
    
    window.history.replaceState({}, '', newUrl);
  }, [selectedCategories]);

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);  // Helper function for case-insensitive category matching
  const matchesCategory = (productCategory, selectedCategories) => {
    if (!selectedCategories.length) return true;
    
    return selectedCategories.some(
      category => productCategory.toLowerCase() === category.toLowerCase()
    );
  };

  // Filtering logic
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Category filter - Skip if no categories selected or if product category is in selected categories
      if (selectedCategories.length > 0 && !matchesCategory(product.category, selectedCategories)) {
        return false;
      }
      
      // Price filter
      if (minPrice && Number(product.price) < Number(minPrice)) {
        return false;
      }
      if (maxPrice && Number(product.price) > Number(maxPrice)) {
        return false;
      }
      
      // In stock filter
      if (inStockOnly && product.countInStock <= 0) {
        return false;
      }
      
      return true;
    });
  }, [products, selectedCategories, minPrice, maxPrice, inStockOnly]);  // Handlers
  const handleCategoryChange = (cat) => {
    setSelectedCategories((prev) => {
      // Check if category already exists (case-insensitive)
      const existingIndex = prev.findIndex(
        c => c.toLowerCase() === cat.toLowerCase()
      );
      
      let newCategories;
      if (existingIndex >= 0) {
        // Remove existing category
        newCategories = [...prev];
        newCategories.splice(existingIndex, 1);
      } else {
        // Add new category
        newCategories = [...prev, cat];
      }
      
      console.log('Selected categories:', newCategories);
      return newCategories;
    });
  };
  const handleMinPriceChange = (e) => setMinPrice(e.target.value.replace(/[^0-9.]/g, ''));
  const handleMaxPriceChange = (e) => setMaxPrice(e.target.value.replace(/[^0-9.]/g, ''));
  const handleInStockChange = () => setInStockOnly((prev) => !prev);
  const handleClearFilters = () => {
    setSelectedCategories([]);
    setMinPrice('');
    setMaxPrice('');
    setInStockOnly(false);
  };
  return (
    <main role="main" className="container-fluid py-4">
      <h1 className={`mb-4 fw-bold ${textClass(theme)}`}>
        {selectedCategories.length === 1 ? (
          <>
            <span className="text-capitalize">{selectedCategories[0]}</span> Products
          </>
        ) : (
          'All Products'
        )}
      </h1>
      <Card className={`mb-4 p-3 shadow-sm ${bgClass(theme)} ${textClass(theme)}`}
        aria-label="Product filters panel"
      >
        <Form className="row g-3 align-items-end" autoComplete="off">          {/* Category Filter */}
          <Form.Group as={Col} md={4} xs={12} controlId="filter-category">
            <Form.Label className="fw-semibold">Category</Form.Label>
            <div role="group" aria-label="Product categories">
              {categoryOptions.length > 0 ? (
                categoryOptions.map((cat) => (
                  <Form.Check
                    key={cat}
                    type="checkbox"
                    id={`cat-${cat}`}
                    label={cat}
                    checked={selectedCategories.includes(cat)}
                    onChange={() => handleCategoryChange(cat)}
                    className="me-3 mb-1"
                    tabIndex={0}
                    aria-checked={selectedCategories.includes(cat)}
                  />
                ))
              ) : (
                <div className="text-muted">Loading categories...</div>
              )}
            </div>
          </Form.Group>
          {/* Price Range Filter */}
          <Form.Group as={Col} md={3} xs={6} controlId="filter-min-price">
            <Form.Label className="fw-semibold">Min Price</Form.Label>
            <Form.Control
              type="number"
              min="0"
              value={minPrice}
              onChange={handleMinPriceChange}
              placeholder="₹ Min"
              aria-label="Minimum price"
              className="transition-all"
            />
          </Form.Group>
          <Form.Group as={Col} md={3} xs={6} controlId="filter-max-price">
            <Form.Label className="fw-semibold">Max Price</Form.Label>
            <Form.Control
              type="number"
              min="0"
              value={maxPrice}
              onChange={handleMaxPriceChange}
              placeholder="₹ Max"
              aria-label="Maximum price"
              className="transition-all"
            />
          </Form.Group>
          {/* In Stock Only */}
          <Form.Group as={Col} md={2} xs={12} controlId="filter-instock">
            <Form.Check
              type="checkbox"
              label="In Stock Only"
              checked={inStockOnly}
              onChange={handleInStockChange}
              tabIndex={0}
              aria-checked={inStockOnly}
              className="fw-semibold"
            />
          </Form.Group>
          <Col xs={12} className="d-flex gap-2 mt-2">
            <Button
              variant={theme === 'dark' ? 'light' : 'primary'}
              onClick={handleClearFilters}
              className="transition-all btn-hover-elevate"
              aria-label="Clear all filters"
              type="button"
            >
              Clear Filters
            </Button>            <span className="ms-2 text-muted small align-self-center">
              Showing <b>{filteredProducts.length}</b> of <b>{products.length}</b> products
              {selectedCategories.length > 0 && (
                <span className="ms-2">
                  | Categories: <b>{selectedCategories.join(', ')}</b>
                </span>
              )}
              {minPrice && (
                <span className="ms-2">
                  | Min: <b>₹{minPrice}</b>
                </span>
              )}
              {maxPrice && (
                <span className="ms-2">
                  | Max: <b>₹{maxPrice}</b>
                </span>
              )}
              {inStockOnly && (
                <span className="ms-2">
                  | <b>In Stock Only</b>
                </span>
              )}
            </span>
          </Col>
        </Form>
      </Card>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : filteredProducts.length === 0 ? (
        <Card className={`p-4 text-center ${bgClass(theme)} ${textClass(theme)}`}>
          <Card.Body>
            <i className="fas fa-search fa-3x text-muted mb-3" aria-hidden="true"></i>
            <h3>No Products Found</h3>
            <p className="text-muted">Try adjusting your filters or clear all filters to see more products.</p>
            <Button
              variant={theme === 'dark' ? 'light' : 'primary'}
              onClick={handleClearFilters}
              className="transition-all btn-hover-elevate"
              aria-label="Clear all filters"
            >
              Clear Filters
            </Button>
          </Card.Body>
        </Card>
      ) : (
        <Row>
          {filteredProducts.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3} className="mb-4">
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </main>
  );
};

export default AllProductsScreen;
