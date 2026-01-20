'use client';

import { Box, Typography } from '@mui/material';
import { FC } from 'react';

const NoMoreRecommendations: FC = () => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 2,
      py: 6,
      textAlign: 'center',
    }}
  >
    <svg
      width="120"
      height="120"
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="60" cy="60" r="50" fill="#FFF3E0" />
      <circle cx="40" cy="50" r="8" fill="#5D4037" />
      <circle cx="80" cy="50" r="8" fill="#5D4037" />
      <circle cx="42" cy="48" r="2" fill="white" />
      <circle cx="82" cy="48" r="2" fill="white" />
      <ellipse cx="60" cy="80" rx="15" ry="10" fill="#5D4037" />
      <path
        d="M25 35 Q20 25 30 30"
        stroke="#5D4037"
        strokeWidth="3"
        fill="none"
      />
      <path
        d="M95 35 Q100 25 90 30"
        stroke="#5D4037"
        strokeWidth="3"
        fill="none"
      />
    </svg>
    <Typography variant="h6" color="text.secondary">
      Oh no, we&apos;ve run out of ideas!
    </Typography>
    <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 300 }}>
      Looks like we&apos;ve shown you all the recipes for this combination. Try
      a different cuisine or ingredient to discover more delicious meals!
    </Typography>
  </Box>
);

export default NoMoreRecommendations;
