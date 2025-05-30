import React from 'react'

const Rating = ({ value, text, color }) => {
  return (
    <div className='d-flex align-items-center'>
      <div className='me-2'>
        {[1, 2, 3, 4, 5].map((index) => (
          <i
            key={index}
            style={{ color }}
            className={
              value >= index
                ? 'fas fa-star'
                : value >= index - 0.5
                ? 'fas fa-star-half-alt'
                : 'far fa-star'
            }
          ></i>
        ))}
      </div>
      {text && (
        <small className='text-muted ms-1'>
          {text}
        </small>
      )}
    </div>
  )
}

Rating.defaultProps = {
  color: '#ffb100',
}

export default Rating

