'use client';

import { Box, Typography } from '@mui/material';
import { FC } from 'react';

const MealNotFound: FC = () => (
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
      {/* Empty plate */}
      <ellipse cx="60" cy="70" rx="45" ry="15" fill="#E0E0E0" />
      <ellipse cx="60" cy="67" rx="40" ry="12" fill="#F5F5F5" />
      <ellipse cx="60" cy="65" rx="30" ry="8" fill="#FAFAFA" />

      {/* Question mark */}
      <text
        x="60"
        y="55"
        textAnchor="middle"
        fontSize="40"
        fill="#BDBDBD"
        fontFamily="Arial"
        fontWeight="bold"
      >
        ?
      </text>

      {/* Magnifying glass */}
      <circle
        cx="85"
        cy="35"
        r="15"
        fill="none"
        stroke="#9E9E9E"
        strokeWidth="3"
      />
      <line
        x1="96"
        y1="46"
        x2="105"
        y2="55"
        stroke="#9E9E9E"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
    <Typography variant="h6" color="text.secondary">
      Meal not found
    </Typography>
    <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 300 }}>
      We couldn&apos;t find this meal. It may have been removed or the link
      might be incorrect.
    </Typography>
  </Box>
);

export default MealNotFound;
