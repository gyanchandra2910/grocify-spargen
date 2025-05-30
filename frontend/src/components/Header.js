import React from 'react'
import { Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, Container, NavDropdown, Badge, Button } from 'react-bootstrap'
import { FaSun, FaMoon } from 'react-icons/fa'
import SearchBox from './SearchBox'
import { logout } from '../actions/userActions'
import { useTheme } from '../ThemeContext'
import { bgClass, textClass } from '../themeUtils'

const Header = ({ theme }) => {
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  
  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart

  const { toggleTheme } = useTheme();

  const logoutHandler = () => {
    dispatch(logout())
  }

  return (
    <header>
      <Navbar
        bg={theme === 'dark' ? 'dark' : 'primary'}
        variant={theme === 'dark' ? 'dark' : 'dark'}
        expand='lg'
        className={`py-3 shadow-sm sticky-top ${bgClass(theme)} navbar-${theme}`}
        role="navigation"
        aria-label="Main navigation"
      >
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand className={`fw-bold fs-4 ${textClass(theme)} transition-colors`} tabIndex={0} aria-label="Go to home page">
              <i className="fas fa-leaf me-2" aria-hidden="true"></i>
              Grocery Store
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' aria-label="Toggle navigation menu" tabIndex={0} />
          <Navbar.Collapse id='basic-navbar-nav'>
            <div className="d-lg-none mb-3 mt-2 w-100">
              <Route render={({ history }) => <SearchBox history={history} />} />
            </div>
            <div className="d-none d-lg-block mx-auto" style={{width: "40%"}}>
              <Route render={({ history }) => <SearchBox history={history} />} />
            </div>
            <Nav className={`ms-auto align-items-center ${textClass(theme)}`} as="ul">
              <Button
                variant={theme === 'dark' ? 'outline-light' : 'outline-dark'}
                className="me-3 d-flex align-items-center theme-toggle transition-transform transition-all focus-visible"
                onClick={toggleTheme}
                aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                style={{ border: 'none', background: 'none', fontSize: '1.3rem' }}
                tabIndex={0}
              >
                {theme === 'dark' ? <FaSun aria-label="Light mode icon" /> : <FaMoon aria-label="Dark mode icon" />}
              </Button>
              <LinkContainer to='/all-products'>
                <Nav.Link className={`mx-2 ${textClass(theme)} transition-colors transition-all focus-visible`} tabIndex={0} aria-label="View all products" role="link">
                  <i className="fas fa-th-large me-1" aria-hidden="true"></i> All Products
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to='/cart'>
                <Nav.Link className={`position-relative me-2 ${textClass(theme)} transition-colors transition-all focus-visible`} tabIndex={0} aria-label="View cart" role="link">
                  <i className='fas fa-shopping-cart fs-5' aria-hidden="true"></i>
                  {cartItems.length > 0 && (
                    <Badge 
                      pill 
                      bg="danger" 
                      className="position-absolute top-0 start-100 translate-middle badge-notification"
                      aria-label={`${cartItems.reduce((acc, item) => acc + item.qty, 0)} items in cart`}
                    >
                      {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                    </Badge>
                  )}
                  <span className="ms-2 d-none d-lg-inline">Cart</span>
                </Nav.Link>
              </LinkContainer>
              {userInfo ? (
                <NavDropdown 
                  title={
                    <span className={textClass(theme)}>
                      <i className="fas fa-user-circle me-1" aria-hidden="true"></i>
                      {userInfo.name}
                    </span>
                  }
                  id='username'
                  align="end"
                  menuVariant={theme}
                  className={textClass(theme)}
                  aria-label="User menu"
                >
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item className={`${textClass(theme)} transition-colors focus-visible`} tabIndex={0} aria-label="Go to profile">
                      <i className="fas fa-user me-2 text-primary" aria-hidden="true"></i>
                      Profile
                    </NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={logoutHandler} className={`${textClass(theme)} transition-colors focus-visible`} tabIndex={0} aria-label="Logout">
                    <i className="fas fa-sign-out-alt me-2 text-danger" aria-hidden="true"></i>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to='/login'>
                  <Nav.Link className={`btn btn-outline-light ms-2 px-3 ${textClass(theme)} transition-all focus-visible`} tabIndex={0} aria-label="Sign in">
                    <i className='fas fa-user me-1' aria-hidden="true"></i> Sign In
                  </Nav.Link>
                </LinkContainer>
              )}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown 
                  title={
                    <span className={textClass(theme)}>
                      <i className="fas fa-cog me-1" aria-hidden="true"></i>
                      Admin
                    </span>
                  }
                  id='adminmenu'
                  align="end"
                  className={`ms-2 ${textClass(theme)} transition-colors`}
                  menuVariant={theme}
                  aria-label="Admin menu"
                >
                  <NavDropdown.Item as="div" className={`text-muted px-3 py-1 small fw-bold ${textClass(theme)} transition-colors focus-visible`} tabIndex={0} aria-label="Admin management section">
                    MANAGEMENT
                  </NavDropdown.Item>
                  <LinkContainer to='/admin/userlist'>
                    <NavDropdown.Item className={`${textClass(theme)} transition-colors focus-visible`} tabIndex={0} aria-label="Manage users">
                      <i className="fas fa-users me-2 text-primary" aria-hidden="true"></i>
                      Users
                    </NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/productlist'>
                    <NavDropdown.Item className={`${textClass(theme)} transition-colors focus-visible`} tabIndex={0} aria-label="Manage products">
                      <i className="fas fa-box me-2 text-success" aria-hidden="true"></i>
                      Products
                    </NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/orderlist'>
                    <NavDropdown.Item className={`${textClass(theme)} transition-colors focus-visible`} tabIndex={0} aria-label="Manage orders">
                      <i className="fas fa-clipboard-list me-2 text-warning" aria-hidden="true"></i>
                      Orders
                    </NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header


