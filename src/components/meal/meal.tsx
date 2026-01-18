'use client';

import { useMeal } from '@/hooks/useMeal';
import { MealId } from '@/types/MealsApi';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from '@mui/material';
import IngredientsList from './ingredientsList';

export default function Meal({ idMeal }: { idMeal: MealId }) {
  const { data: meal, isLoading, isError, error } = useMeal(idMeal);

  if (isError) {
    return <>{error.message}</>;
  }

  if (!meal) {
    return <>ops</>;
  }

  if (isLoading) {
    return <>Loading the perfect meal </>;
  }

  return (
    <Card
      sx={{
        display: 'flex',
        width: '100%',
        height: 'fit-content',
      }}
    >
      <CardMedia
        component="img"
        sx={{ width: 200, height: 'auto', objectFit: 'cover' }}
        image={meal?.strMealThumb}
        alt={meal?.strMeal + ' dish'}
      />

      <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <CardHeader
          title={meal?.strMeal}
          subheader={meal?.strCategory + ' ' + meal?.strArea}
        />

        <CardContent sx={{ flexGrow: 1, pt: 0, pb: 2 }}>
          <Typography
            variant="body2"
            sx={{ color: 'text.secondary' }}
          ></Typography>
        </CardContent>

        <Box>
          <CardContent sx={{ pt: 0 }}>
            <IngredientsList meal={meal} />
            <Typography sx={{ marginBottom: 2, marginTop: 4 }} variant="body1">
              Instructions
            </Typography>
            <Typography sx={{ marginBottom: 2 }} variant="body2">
              {meal?.strInstructions}
            </Typography>
          </CardContent>
        </Box>
      </Box>
    </Card>
  );
}
