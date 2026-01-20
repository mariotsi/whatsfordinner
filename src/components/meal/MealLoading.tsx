'use client';

import { Box, Typography } from '@mui/material';
import { FC } from 'react';

const MealLoading: FC = () => (
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
      <style>
        {`
          @keyframes steam {
            0%, 100% { transform: translateY(0); opacity: 0.8; }
            50% { transform: translateY(-8px); opacity: 0.3; }
          }
          .steam1 { animation: steam 2s ease-in-out infinite; }
          .steam2 { animation: steam 2s ease-in-out infinite 0.3s; }
          .steam3 { animation: steam 2s ease-in-out infinite 0.6s; }
        `}
      </style>

      {/* Plate */}
      <ellipse cx="60" cy="85" rx="45" ry="12" fill="#E0E0E0" />
      <ellipse cx="60" cy="82" rx="40" ry="10" fill="#F5F5F5" />

      {/* Food dome */}
      <path
        d="M25 82 Q25 40 60 35 Q95 40 95 82"
        fill="#FFB74D"
        stroke="#F57C00"
        strokeWidth="2"
      />

      {/* Steam */}
      <path
        className="steam1"
        d="M45 30 Q42 25 45 20 Q48 15 45 10"
        stroke="#9E9E9E"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
      <path
        className="steam2"
        d="M60 28 Q57 23 60 18 Q63 13 60 8"
        stroke="#9E9E9E"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
      <path
        className="steam3"
        d="M75 30 Q72 25 75 20 Q78 15 75 10"
        stroke="#9E9E9E"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
    <Typography variant="h6" color="text.secondary">
      Loading the perfect meal...
    </Typography>
  </Box>
);

export default MealLoading;
