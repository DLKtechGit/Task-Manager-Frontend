import React from 'react';
import './Image.css';

function Image({
  src,
  alt = "Image Name",
  className = "",
  ...props
}) {
  const handleError = (e) => {
    e.target.src = "/assets/images/no_image.png";
    e.target.classList.add("image-fallback");
  };

  return (
    <img
      src={src}
      alt={alt}
      className={`image ${className}`.trim()}
      onError={handleError}
      {...props}
    />
  );
}

export default Image;