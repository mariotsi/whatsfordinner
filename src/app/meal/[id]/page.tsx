'use client';

import Meal from '@/components/meal/meal';
import { Box, Button, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { MealId } from '@/types/MealsApi';
import { FC, memo } from 'react';

const MealPage: FC = () => {
  const params = useParams();
  const id = params.id as MealId;

  return (
    <Box sx={{ p: 3 }}>
      <Typography
        variant="h4"
        component="h1"
        sx={{ mb: 4, fontWeight: 600, textAlign: 'center' }}
      >
        🍽️ What&apos;s for Dinner
      </Typography>
      <Meal idMeal={id} />
      <Button
        component={Link}
        href="/"
        startIcon={<ArrowBackIcon />}
        sx={{ mt: 3 }}
      >
        Back to home
      </Button>
    </Box>
  );
};

export default memo(MealPage);
