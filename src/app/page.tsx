'use client';

import EmptyHistoryState from '@/components/EmptyHistoryState';
import History from '@/components/history/History';
import { useHistoryContext } from '@/components/history/HistoryContext';
import Meal from '@/components/meal/meal';
import { Box, Stack, Typography } from '@mui/material';
import styles from './page.module.css';

export default function Home() {
  const { history, selectedEntry, isLoading } = useHistoryContext();

  const hasHistory = history.length > 0;

  if (isLoading) {
    return null;
  }

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Typography
          variant="h4"
          component="h1"
          sx={{ mb: 4, fontWeight: 600, textAlign: 'center' }}
        >
          🍽️ What&apos;s for Dinner
        </Typography>
        {hasHistory ? (
          <Stack
            direction={{ sm: 'column', md: 'row' }}
            spacing={{ xs: 1, sm: 2, md: 4 }}
            sx={{ width: '100%', flex: 1 }}
          >
            <History entries={history} />
            <Box sx={{ flex: 1, minWidth: 0, display: 'flex' }}>
              {selectedEntry && <Meal idMeal={selectedEntry.idMeal} />}
            </Box>
          </Stack>
        ) : (
          <EmptyHistoryState />
        )}
      </main>
    </div>
  );
}
