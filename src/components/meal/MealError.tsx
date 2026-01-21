'use client';

import { Box, Typography } from '@mui/material';
import { FC } from 'react';

const MealError: FC<{ message?: string }> = ({ message }) => (
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
      role="img"
      aria-label="Error loading meal"
    >
      {/* Broken plate */}
      <ellipse cx="60" cy="75" rx="40" ry="10" fill="#E0E0E0" />
      <path d="M60 65 L65 75 L55 75 Z" fill="#BDBDBD" />

      {/* Sad fork */}
      <rect x="30" y="40" width="4" height="35" rx="2" fill="#9E9E9E" />
      <rect x="26" y="30" width="3" height="15" rx="1" fill="#9E9E9E" />
      <rect x="31" y="30" width="3" height="15" rx="1" fill="#9E9E9E" />
      <rect x="36" y="30" width="3" height="15" rx="1" fill="#9E9E9E" />

      {/* Sad knife */}
      <rect x="86" y="40" width="4" height="35" rx="2" fill="#9E9E9E" />
      <path d="M86 30 L90 30 L92 45 L86 45 Z" fill="#BDBDBD" />

      {/* X mark */}
      <circle cx="60" cy="45" r="20" fill="#FFCDD2" />
      <path
        d="M50 35 L70 55 M70 35 L50 55"
        stroke="#E53935"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
    <Typography variant="h6" color="text.secondary">
      Oops, something went wrong!
    </Typography>
    {message && (
      <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 300 }}>
        {message}
      </Typography>
    )}
  </Box>
);

export default MealError;
