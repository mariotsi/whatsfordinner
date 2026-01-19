import { HistoryEntry } from '@/types/History';
import HistoryRow from './HistoryRow';
import { Box, Button, Divider, List, Stack, Typography } from '@mui/material';
import Link from 'next/link';
import { FC } from 'react';

const History: FC<{
  entries: HistoryEntry[];
}> = ({ entries }) => {
  return (
    <Box sx={{ flexShrink: 0 }}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ mb: 2 }}
      >
        <Typography variant="h6" component="h2">
          Recently viewed
        </Typography>
        <Button
          component={Link}
          href="/inspire/cuisines"
          variant="contained"
          size="small"
        >
          Get inspired, again!
        </Button>
      </Stack>
      <List sx={{ width: '100%', minWidth: 500, bgcolor: 'background.paper' }}>
        {entries.map((historyEntry, index) => (
          <Box key={historyEntry.idMeal + '@@' + historyEntry.isoTimestamp}>
            <HistoryRow entry={historyEntry} />
            {index < entries.length - 1 && <Divider component="li" />}
          </Box>
        ))}
      </List>
    </Box>
  );
};

export default History;
