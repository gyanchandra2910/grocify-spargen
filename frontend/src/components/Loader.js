import React from 'react'
import { Spinner } from 'react-bootstrap'

const Loader = () => {
  return (
    <div className="d-flex flex-column align-items-center">
      <Spinner
        animation='border'
        role='status'
        variant='primary'
        style={{
          width: '50px',
          height: '50px',
        }}
      >
        <span className='visually-hidden'>Loading...</span>
      </Spinner>
      <div className="mt-2 text-primary fw-bold">Loading...</div>
    </div>
  )
}

export default Loader

