'use client';

import { useCuisines } from '@/hooks/useCuisines';
import { Autocomplete, Box, CircularProgress, TextField } from '@mui/material';
import { getFlagUrl } from '@/utils/cuisineFlags';
import ImageLoader from '@/components/ImageLoader';
import { useInspire } from '../InspireContext';

export default function CuisinesStep() {
  const { data: cuisines = [], isLoading, isError } = useCuisines();
  const { cuisine, setCuisine } = useInspire();

  return (
    <Autocomplete
      value={cuisine}
      onChange={(_, value) => setCuisine(value)}
      options={cuisines}
      loading={isLoading}
      size="small"
      sx={{ maxWidth: 300, mx: 'auto' }}
      renderOption={(props, option) => {
        const { key, ...rest } = props;
        const flagUrl = getFlagUrl(option);
        return (
          <Box
            component="li"
            key={key}
            {...rest}
            sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
          >
            {flagUrl && (
              <ImageLoader
                src={flagUrl}
                alt={`${option} flag`}
                width={20}
                height={15}
              />
            )}
            {option}
          </Box>
        );
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="What cuisine do you fancy?"
          error={isError}
          helperText={isError ? 'Failed to load cuisines' : undefined}
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
