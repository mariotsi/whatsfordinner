'use client';

import { useIngredients } from '@/hooks/useIngredients';
import { Ingredient } from '@/types/MealsApi';
import { Autocomplete, Box, CircularProgress, TextField } from '@mui/material';
import Image from 'next/image';
import { useMemo } from 'react';
import { useInspire } from '../InspireContext';

export default function IngredientsStep() {
  const { data: ingredients = [], isLoading, isError } = useIngredients();
  const { ingredient, setIngredient } = useInspire();

  const selectedOption = useMemo(
    () => ingredients.find((i) => i.strIngredient === ingredient) ?? null,
    [ingredients, ingredient]
  );

  return (
    <Autocomplete<Ingredient>
      value={selectedOption}
      onChange={(_, value) => setIngredient(value?.strIngredient ?? null)}
      options={ingredients}
      getOptionLabel={(option) => option.strIngredient}
      loading={isLoading}
      size="small"
      sx={{ maxWidth: 450, mx: 'auto' }}
      renderOption={(props, option) => {
        const { key, ...rest } = props;
        return (
          <Box
            component="li"
            key={key}
            {...rest}
            sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
          >
            {option.strThumb && (
              <Image
                src={option.strThumb}
                alt={`${option} thumbnail`}
                width={20}
                height={15}
                unoptimized
              />
            )}
            {option.strIngredient}
          </Box>
        );
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="What's the main ingredient you want to use?"
          error={isError}
          helperText={isError ? 'Failed to load ingredients' : undefined}
          slotProps={{
            input: {
              ...params.InputProps,
              endAdornment: (
                <>
                  {isLoading && <CircularProgress color="inherit" size={20} />}
                  {params.InputProps.endAdornment}
                </>
              ),
            },
          }}
        />
      )}
    />
  );
}
