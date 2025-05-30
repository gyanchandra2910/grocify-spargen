import React from 'react';
import PropTypes from 'prop-types';

/**
 * Generates a banner with fallback gradient if the image is not available
 */
const BannerImage = ({ 
  src, 
  alt, 
  className, 
  height = '400px', 
  theme = 'light',
  overlayContent
}) => {
  // Set gradient fallbacks based on theme
  const gradients = {
    light: 'linear-gradient(135deg, #0f4c81 0%, #589f7a 100%)',
    dark: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)'
  };

  return (
    <div className="position-relative" style={{ height, overflow: 'hidden' }}>
      <img 
        src={src} 
        alt={alt} 
        className={className}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center'
        }}
        onError={(e) => {
          e.target.style.display = 'none';
          e.target.parentElement.style.background = gradients[theme];
        }}
      />
      {overlayContent && (
        <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center">
          <div className="container">
            {overlayContent}
          </div>
        </div>
      )}
    </div>
  );
};

BannerImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  className: PropTypes.string,
  height: PropTypes.string,
  theme: PropTypes.oneOf(['light', 'dark']),
  overlayContent: PropTypes.node
};

export default BannerImage;
