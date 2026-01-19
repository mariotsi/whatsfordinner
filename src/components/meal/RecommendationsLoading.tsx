'use client';

import { Box, Typography } from '@mui/material';
import { FC } from 'react';

const RecommendationsLoading: FC = () => (
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
      width="140"
      height="140"
      viewBox="0 0 140 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <style>
        {`
          @keyframes flipPage {
            0%, 100% { transform: rotateY(0deg); opacity: 1; }
            50% { transform: rotateY(-180deg); opacity: 0.3; }
          }
          @keyframes moveEyes {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-2px); }
            75% { transform: translateX(2px); }
          }
          .page1 { animation: flipPage 1.5s ease-in-out infinite; transform-origin: left center; }
          .page2 { animation: flipPage 1.5s ease-in-out infinite 0.3s; transform-origin: left center; }
          .page3 { animation: flipPage 1.5s ease-in-out infinite 0.6s; transform-origin: left center; }
          .eyes { animation: moveEyes 1.5s ease-in-out infinite; }
        `}
      </style>

      {/* Face */}
      <circle cx="70" cy="45" r="30" fill="#FFF3E0" />

      {/* Eyes - animated */}
      <g className="eyes">
        <circle cx="60" cy="42" r="4" fill="#5D4037" />
        <circle cx="80" cy="42" r="4" fill="#5D4037" />
        <circle cx="61" cy="41" r="1.5" fill="white" />
        <circle cx="81" cy="41" r="1.5" fill="white" />
      </g>

      {/* Smile */}
      <path
        d="M60 55 Q70 62 80 55"
        stroke="#5D4037"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
      />

      {/* Book base */}
      <rect x="35" y="85" width="70" height="45" rx="3" fill="#8D6E63" />
      <line x1="70" y1="85" x2="70" y2="130" stroke="#5D4037" strokeWidth="2" />

      {/* Animated pages */}
      <rect
        className="page1"
        x="72"
        y="88"
        width="30"
        height="39"
        fill="#FFF8E1"
        rx="1"
      />
      <rect
        className="page2"
        x="72"
        y="88"
        width="30"
        height="39"
        fill="#FFFDE7"
        rx="1"
      />
      <rect
        className="page3"
        x="72"
        y="88"
        width="30"
        height="39"
        fill="white"
        rx="1"
      />

      {/* Page lines */}
      <g className="page3">
        <line
          x1="76"
          y1="95"
          x2="98"
          y2="95"
          stroke="#E0E0E0"
          strokeWidth="1.5"
        />
        <line
          x1="76"
          y1="102"
          x2="98"
          y2="102"
          stroke="#E0E0E0"
          strokeWidth="1.5"
        />
        <line
          x1="76"
          y1="109"
          x2="95"
          y2="109"
          stroke="#E0E0E0"
          strokeWidth="1.5"
        />
        <line
          x1="76"
          y1="116"
          x2="98"
          y2="116"
          stroke="#E0E0E0"
          strokeWidth="1.5"
        />
      </g>

      {/* Left page (static) */}
      <rect x="38" y="88" width="30" height="39" fill="white" rx="1" />
      <line
        x1="42"
        y1="95"
        x2="64"
        y2="95"
        stroke="#E0E0E0"
        strokeWidth="1.5"
      />
      <line
        x1="42"
        y1="102"
        x2="64"
        y2="102"
        stroke="#E0E0E0"
        strokeWidth="1.5"
      />
      <line
        x1="42"
        y1="109"
        x2="61"
        y2="109"
        stroke="#E0E0E0"
        strokeWidth="1.5"
      />
      <line
        x1="42"
        y1="116"
        x2="64"
        y2="116"
        stroke="#E0E0E0"
        strokeWidth="1.5"
      />
    </svg>
    <Typography variant="h6" color="text.secondary">
      Finding the perfect recipe...
    </Typography>
    <Typography variant="body2" color="text.secondary">
      We&apos;re searching through delicious options for you
    </Typography>
  </Box>
);

export default RecommendationsLoading;
