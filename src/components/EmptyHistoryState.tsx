'use client';

import { Box, Button, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { FC, useCallback } from 'react';
import HungryPersonSvg from './HungryPersonSvg';

const EmptyHistoryState: FC = () => {
  const router = useRouter();

  const handleGetInspired = useCallback(() => {
    router.push('/inspire/cuisines');
  }, [router]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        py: 6,
        px: 3,
        flex: 1,
      }}
    >
      <HungryPersonSvg width={180} height={180} />
      <Typography variant="h5" sx={{ mt: 3, mb: 1, fontWeight: 500 }}>
        Feeling hungry?
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Let us help you discover your next delicious meal!
      </Typography>
      <Button
        variant="contained"
        size="large"
        onClick={handleGetInspired}
        sx={{ px: 4 }}
      >
        Get Inspired
      </Button>
    </Box>
  );
};

export default EmptyHistoryState;
