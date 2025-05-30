import React from 'react'
import { Alert } from 'react-bootstrap'

const Message = ({ variant, children }) => {
  // Map icons to Bootstrap variants
  const getIcon = () => {
    switch (variant) {
      case 'danger':
        return 'fas fa-exclamation-circle';
      case 'warning':
        return 'fas fa-exclamation-triangle';
      case 'success':
        return 'fas fa-check-circle';
      default:
        return 'fas fa-info-circle';
    }
  }
  
  return (
    <Alert variant={variant} className="d-flex align-items-center shadow-sm border-0">
      <i className={`${getIcon()} me-2 fs-5`}></i>
      <div>{children}</div>
    </Alert>
  )
}

Message.defaultProps = {
  variant: 'info',
}

export default Message

