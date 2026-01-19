'use client';

import { FC } from 'react';

interface HungryPersonSvgProps {
  width?: number;
  height?: number;
}

const HungryPersonSvg: FC<HungryPersonSvgProps> = ({
  width = 200,
  height = 200,
}) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 200 200"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-label="Hungry person thinking about food"
  >
    {/* Head */}
    <circle
      cx="100"
      cy="60"
      r="40"
      fill="#FFD9B3"
      stroke="#333"
      strokeWidth="2"
    />

    {/* Eyes */}
    <ellipse cx="85" cy="55" rx="5" ry="6" fill="#333" />
    <ellipse cx="115" cy="55" rx="5" ry="6" fill="#333" />

    {/* Eyebrows (worried) */}
    <path d="M75 45 Q85 42 92 48" stroke="#333" strokeWidth="2" fill="none" />
    <path
      d="M125 45 Q115 42 108 48"
      stroke="#333"
      strokeWidth="2"
      fill="none"
    />

    {/* Mouth (hungry/sad) */}
    <path d="M85 75 Q100 68 115 75" stroke="#333" strokeWidth="2" fill="none" />

    {/* Body */}
    <path
      d="M70 100 Q60 140 65 180"
      stroke="#333"
      strokeWidth="2"
      fill="none"
    />
    <path
      d="M130 100 Q140 140 135 180"
      stroke="#333"
      strokeWidth="2"
      fill="none"
    />
    <ellipse
      cx="100"
      cy="130"
      rx="35"
      ry="30"
      fill="#6B9DFC"
      stroke="#333"
      strokeWidth="2"
    />

    {/* Arms */}
    <path
      d="M65 115 Q40 130 50 150"
      stroke="#333"
      strokeWidth="2"
      fill="none"
    />
    <path
      d="M135 115 Q160 130 150 150"
      stroke="#333"
      strokeWidth="2"
      fill="none"
    />

    {/* Thought bubble */}
    <circle
      cx="160"
      cy="25"
      r="20"
      fill="#FFF"
      stroke="#333"
      strokeWidth="1.5"
    />
    <circle
      cx="145"
      cy="45"
      r="8"
      fill="#FFF"
      stroke="#333"
      strokeWidth="1.5"
    />
    <circle
      cx="138"
      cy="58"
      r="5"
      fill="#FFF"
      stroke="#333"
      strokeWidth="1.5"
    />

    {/* Food in thought (plate with food) */}
    <ellipse
      cx="160"
      cy="28"
      rx="12"
      ry="4"
      fill="#DDD"
      stroke="#333"
      strokeWidth="1"
    />
    <path
      d="M152 24 Q160 15 168 24"
      fill="#E57373"
      stroke="#333"
      strokeWidth="1"
    />

    {/* Rumbling stomach lines */}
    <path
      d="M80 135 Q85 132 90 135"
      stroke="#333"
      strokeWidth="1"
      opacity="0.5"
    />
    <path
      d="M110 135 Q115 132 120 135"
      stroke="#333"
      strokeWidth="1"
      opacity="0.5"
    />
  </svg>
);

export default HungryPersonSvg;
