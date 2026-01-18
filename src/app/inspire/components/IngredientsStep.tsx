'use client';

import { useIngredients } from '@/hooks/useIngredients';
import { Autocomplete, Box, CircularProgress, TextField } from '@mui/material';
import Image from 'next/image';

export default function IngredientsStep() {
  const { data: ingredients = [], isLoading, isError } = useIngredients();
  return (
    <Autocomplete
      options={ingredients}
      getOptionLabel={(option) => option.strIngredient}
      loading={isLoading}
      size="small"
      sx={{ maxWidth: 350, mx: 'auto' }}
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
          label="What ingredients do you want to use?"
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
