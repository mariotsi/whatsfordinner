'use client';

import { useMeal } from '@/hooks/useMeal';
import { MealId } from '@/types/MealsApi';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Typography,
  Button,
  Link,
  Stack,
  Divider,
} from '@mui/material';
import IngredientsList from './ingredientsList';
import LaunchIcon from '@mui/icons-material/Launch';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { getYoutubeId } from '@/utils/common';
import { useMemo } from 'react';
import ImageLoader from '@/components/ImageLoader';
import MealImageFallback from '@/components/MealImageFallback';

export default function Meal({ idMeal }: { idMeal: MealId }) {
  const { data: meal, isLoading, isError, error } = useMeal(idMeal);
  const youtubeId = useMemo(
    () => getYoutubeId(meal?.strYoutube),
    [meal?.strYoutube]
  );

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
        flexDirection: { xs: 'column', md: 'row' },
      }}
    >
      <Box
        sx={{
          position: 'relative',
          width: { xs: '100%', md: '50%' },
          minHeight: 300,
          flexShrink: 0,
        }}
      >
        <ImageLoader
          src={meal.strMealThumb}
          alt={meal.strMeal + ' dish'}
          fill
          style={{ objectFit: 'cover' }}
          fallback={<MealImageFallback />}
        />
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <CardHeader
          title={meal.strMeal}
          subheader={meal.strCategory + ' • ' + meal.strArea}
        />
        <Box>
          <CardContent sx={{ pt: 0 }}>
            <IngredientsList meal={meal} />
            <Typography
              sx={{ marginBottom: 1, marginTop: 4, fontWeight: 'bold' }}
              variant="body1"
            >
              Instructions
            </Typography>
            <Typography
              sx={{ marginBottom: 3, whiteSpace: 'pre-line' }}
              variant="body2"
              color="text.secondary"
            >
              {meal.strInstructions}
            </Typography>
            <Divider sx={{ my: 3 }} />
            <Stack spacing={3}>
              {youtubeId && (
                <Box>
                  <Typography
                    variant="subtitle2"
                    sx={{
                      mb: 1,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                    }}
                  >
                    <YouTubeIcon color="error" fontSize="small" /> Video
                    Tutorial
                  </Typography>
                  <Box
                    sx={{
                      position: 'relative',
                      width: '100%',
                      paddingTop: '56.25%', // Trick to keep the 16:9 aspect ratio
                      borderRadius: 1,
                      overflow: 'hidden',
                      bgcolor: 'black',
                    }}
                  >
                    <iframe
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        border: 0,
                      }}
                      src={`https://www.youtube.com/embed/${youtubeId}`}
                      title="YouTube video player"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </Box>
                </Box>
              )}
              {meal?.strSource && (
                <Button
                  component={Link}
                  href={meal.strSource}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="outlined"
                  size="small"
                  startIcon={<LaunchIcon />}
                  sx={{ alignSelf: 'flex-start', textTransform: 'none' }}
                >
                  View original source
                </Button>
              )}
            </Stack>
          </CardContent>
        </Box>
      </Box>
    </Card>
  );
}
