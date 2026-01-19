import { HistoryEntry } from '@/types/History';
import { MealId } from '@/types/MealsApi';
import HistoryRow from './HistoryRow';
import { Box, Divider, List, Typography } from '@mui/material';
import { FC } from 'react';

const history: HistoryEntry[] = [
  {
    idMeal: '52771' as MealId,
    strMeal: 'Spicy Arrabiata Penne',
    strMealThumb: 'https://picsum.photos/seed/penne/300/300',
    isoTimestamp: '2026-01-19T10:30:00.000Z',
    vote: 'like',
  },
  {
    idMeal: '52772' as MealId,
    strMeal: 'Teriyaki Chicken Casserole',
    strMealThumb: 'https://picsum.photos/seed/chicken/300/300',
    isoTimestamp: '2026-01-18T18:45:00.000Z',
    vote: 'dislike',
  },
  {
    idMeal: '52773' as MealId,
    strMeal: 'Honey Teriyaki Salmon',
    strMealThumb: 'https://picsum.photos/seed/salmon/300/300',
    isoTimestamp: '2026-01-17T12:00:00.000Z',
    vote: 'like',
  },
  {
    idMeal: '52774' as MealId,
    strMeal: 'Pad See Ew',
    strMealThumb: 'https://picsum.photos/seed/padseew/300/300',
    isoTimestamp: '2026-01-16T20:15:00.000Z',
    vote: 'like',
  },
  {
    idMeal: '52775' as MealId,
    strMeal: 'Vegetable Stir Fry',
    strMealThumb: 'https://picsum.photos/seed/stirfry/300/300',
    isoTimestamp: '2026-01-15T14:30:00.000Z',
    vote: 'dislike',
  },
];

const History: FC = () => {
  return (
    <Box>
      <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
        Recently viewed
      </Typography>
      <List sx={{ width: '100%', minWidth: 500, bgcolor: 'background.paper' }}>
        {history.map((historyEntry, index) => (
          <Box key={historyEntry.idMeal + '@@' + historyEntry.isoTimestamp}>
            <HistoryRow entry={historyEntry} />
            {index < history.length - 1 && <Divider component="li" />}
          </Box>
        ))}
      </List>
    </Box>
  );
};

export default History;
