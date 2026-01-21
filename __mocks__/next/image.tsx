import React from 'react';

interface MockImageProps {
  src: string;
  alt: string;
  fill?: boolean;
  style?: React.CSSProperties;
  priority?: boolean;
  unoptimized?: boolean;
  onLoad?: () => void;
  onError?: () => void;
}

const MockImage: React.FC<MockImageProps> = ({
  src,
  alt,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  fill,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  priority,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  unoptimized,
  style,
  onLoad,
  onError,
  ...props
}) => (
  // eslint-disable-next-line @next/next/no-img-element
  <img
    src={src}
    alt={alt}
    style={style}
    data-testid="next-image"
    onLoad={onLoad}
    onError={onError}
    {...props}
  />
);

export default MockImage;
