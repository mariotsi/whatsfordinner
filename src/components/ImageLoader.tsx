'use client';

import BrokenImageIcon from '@mui/icons-material/BrokenImage';
import { Box, Skeleton } from '@mui/material';
import Image, { ImageProps } from 'next/image';
import { FC, memo, ReactNode, useState } from 'react';

type Status = 'loading' | 'loaded' | 'error';

type ImageLoaderProps = Omit<ImageProps, 'onLoad' | 'onError'> & {
  skeletonVariant?: 'rectangular' | 'circular';
  fallback?: ReactNode;
};

const DefaultFallback = (
  <BrokenImageIcon sx={{ color: 'text.disabled', fontSize: 48 }} />
);

const ImageLoader: FC<ImageLoaderProps> = ({
  skeletonVariant = 'rectangular',
  alt,
  width,
  height,
  fill,
  fallback = DefaultFallback,
  ...rest
}) => {
  const [status, setStatus] = useState<Status>('loading');

  const dimensions = fill
    ? { width: '100%', height: '100%' }
    : { width, height };

  return (
    <Box
      sx={{
        position: 'relative',
        display: fill ? 'flex' : 'inline-flex',
        minHeight: 'inherit',
        ...dimensions,
      }}
    >
      {status === 'loading' && (
        <Skeleton
          role="progressbar"
          aria-label="Loading image"
          variant={skeletonVariant}
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            ...dimensions,
          }}
        />
      )}

      {status === 'error' && (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: 'action.hover',
            width: '100%',
            height: '100%',
            minHeight: 'inherit',
          }}
        >
          {fallback}
        </Box>
      )}

      {status !== 'error' && (
        <Image
          alt={alt}
          width={fill ? undefined : (width as number)}
          height={fill ? undefined : (height as number)}
          fill={fill}
          unoptimized
          onLoad={() => setStatus('loaded')}
          onError={() => setStatus('error')}
          style={{
            visibility: status === 'loaded' ? 'visible' : 'hidden',
          }}
          {...rest}
        />
      )}
    </Box>
  );
};

export default memo(ImageLoader);
