import React, { useState } from 'react';
import { Image } from 'react-bootstrap';

/**
 * A wrapper component for React Bootstrap Image that handles lazy loading
 * and provides a placeholder while the image is loading
 */
const ImageWithFallback = ({ 
  src, 
  alt, 
  fluid = false, 
  rounded = false,
  width,
  height,
  className = '',
  style = {},
  ...props 
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  
  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setIsLoaded(true);
    setHasError(true);
  };

  return (
    <div className={`position-relative ${className}`} style={{ width, height, ...style }}>
      {!isLoaded && (
        <div 
          className="position-absolute w-100 h-100 d-flex align-items-center justify-content-center"
          style={{ 
            backgroundColor: '#e9ecef', 
            opacity: 0.8,
            top: 0,
            left: 0
          }}
        >
          <div className="spinner-border spinner-border-sm text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
      
      <Image 
        src={hasError ? '/images/placeholder.jpg' : src}
        alt={alt}
        fluid={fluid}
        rounded={rounded}
        width={width}
        height={height}
        loading="lazy"
        onLoad={handleLoad}
        onError={handleError}
        style={{ 
          opacity: isLoaded ? 1 : 0,
          transition: 'opacity 0.3s ease-in-out',
          width: fluid ? '100%' : undefined,
          height: fluid ? 'auto' : undefined,
          ...style
        }}
        {...props}
      />
    </div>
  );
};

export default ImageWithFallback;
