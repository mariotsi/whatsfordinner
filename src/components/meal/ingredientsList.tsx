'use client';

import {
  Box,
  Typography,
  ListItem,
  ListItemText,
  Divider,
  List,
  ListItemAvatar,
  Avatar,
} from '@mui/material';
import Image from 'next/image';
import { DetailedMeal } from '@/types/MealsApi';
import { getIngredients } from '@/utils/meal';
import { useMemo } from 'react';

export default function IngredientsList({ meal }: { meal: DetailedMeal }) {
  const ingredients = useMemo(() => getIngredients(meal), [meal]);
  if (ingredients.length === 0) return null;

  return (
    <Box component="section">
      <Typography
        sx={{ marginBottom: 1, marginTop: 4, fontWeight: 'bold' }}
        variant="body1"
      >
        Ingredients
      </Typography>

      <List dense sx={{ width: '100%', bgcolor: 'background.paper' }}>
        {ingredients.map((item, index) => (
          <Box key={item.ingredient}>
            <ListItem
              secondaryAction={
                <Typography variant="body2" color="text.secondary" noWrap>
                  {item.measure || 'Add to taste'}
                </Typography>
              }
              disablePadding
              sx={{ p: 1 }}
            >
              <ListItemAvatar>
                <Avatar
                  variant="rounded"
                  sx={{
                    bgcolor: 'transparent',
                    width: 40,
                    height: 40,
                    position: 'relative',
                  }}
                >
                  <Image
                    src={`https://www.themealdb.com/images/ingredients/${encodeURIComponent(item.ingredient)}-Small.png`}
                    alt={item.ingredient}
                    fill
                    sizes="40px"
                    style={{ objectFit: 'contain' }}
                  />
                </Avatar>
              </ListItemAvatar>

              <ListItemText primary={item.ingredient} />
            </ListItem>
            {index < ingredients.length - 1 && <Divider component="li" />}
          </Box>
        ))}
      </List>
    </Box>
  );
}
