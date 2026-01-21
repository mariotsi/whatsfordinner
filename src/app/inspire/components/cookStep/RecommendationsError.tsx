'use client';

import { Box, Typography } from '@mui/material';
import { FC } from 'react';

const RecommendationsError: FC = () => (
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
      aria-label="Sad face with tear indicating error"
    >
      <style>
        {`
          @keyframes tearDrop {
            0% { transform: translateY(0); opacity: 1; }
            100% { transform: translateY(15px); opacity: 0; }
          }
          .tear { animation: tearDrop 1.5s ease-in infinite; }
        `}
      </style>

      {/* Face */}
      <circle cx="60" cy="60" r="50" fill="#FFF3E0" />

      {/* Sad eyes */}
      <circle cx="40" cy="50" r="6" fill="#5D4037" />
      <circle cx="80" cy="50" r="6" fill="#5D4037" />
      <circle cx="41" cy="49" r="2" fill="white" />
      <circle cx="81" cy="49" r="2" fill="white" />

      {/* Sad mouth */}
      <path
        d="M40 80 Q60 70 80 80"
        stroke="#5D4037"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />

      {/* Tear */}
      <ellipse className="tear" cx="45" cy="62" rx="3" ry="5" fill="#64B5F6" />
    </svg>
    <Typography variant="h6" color="text.secondary">
      Oops, something went wrong!
    </Typography>
    <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 300 }}>
      We couldn&apos;t load the recipes right now. Please try again or choose a
      different combination.
    </Typography>
  </Box>
);

export default RecommendationsError;
