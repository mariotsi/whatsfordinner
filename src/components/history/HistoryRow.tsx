import { HistoryEntry } from '@/types/History';
import ImageLoader from '@/components/ImageLoader';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import {
  ListItemButton,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Box,
  Tooltip,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { formatDistanceToNow, format } from 'date-fns';
import { FC, useCallback, useMemo } from 'react';
import { useHistoryContext } from './HistoryContext';
import { useRouter } from 'next/navigation';

interface HistoryRowProps {
  entry: HistoryEntry;
}

const HistoryRow: FC<HistoryRowProps> = ({ entry }) => {
  const { selectEntry, selectedEntry } = useHistoryContext();
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const { relativeTime, fullDate } = useMemo(() => {
    const date = new Date(entry.isoTimestamp);
    return {
      relativeTime: formatDistanceToNow(date, { addSuffix: true }),
      fullDate: format(date, 'PPpp'),
    };
  }, [entry.isoTimestamp]);

  const voteLabel = useMemo(
    () => (entry.vote === 'like' ? 'Liked' : 'Disliked'),
    [entry.vote]
  );

  const isSelected = useMemo(
    () =>
      selectedEntry?.idMeal === entry.idMeal &&
      selectedEntry?.isoTimestamp === entry.isoTimestamp,
    [selectedEntry, entry.idMeal, entry.isoTimestamp]
  );

  const handleClick = useCallback(() => {
    selectEntry(entry);
    if (isMobile) {
      router.push(`/meal/${entry.idMeal}`);
    }
  }, [entry, isMobile, router, selectEntry]);

  return (
    <ListItemButton
      sx={{ py: 1.5, px: 2 }}
      selected={isSelected}
      onClick={handleClick}
    >
      <ListItemAvatar>
        <Avatar variant="rounded" sx={{ width: 60, height: 60, mr: 2 }}>
          <ImageLoader
            src={entry.strMealThumb}
            alt={entry.strMeal}
            fill
            style={{ objectFit: 'cover' }}
          />
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={entry.strMeal}
        secondary={
          <Tooltip title={fullDate} arrow>
            <span>{relativeTime}</span>
          </Tooltip>
        }
        slotProps={{
          primary: {
            fontWeight: 500,
            noWrap: true,
          },
          secondary: {
            variant: 'caption',
            color: 'text.secondary',
            component: 'div',
          },
        }}
      />
      <Tooltip title={voteLabel} arrow>
        <Box
          sx={{ display: 'flex', alignItems: 'center', ml: 1 }}
          role="img"
          aria-label={voteLabel}
        >
          {entry.vote === 'like' ? (
            <ThumbUpIcon color="success" fontSize="small" />
          ) : (
            <ThumbDownIcon color="error" fontSize="small" />
          )}
        </Box>
      </Tooltip>
    </ListItemButton>
  );
};

export default HistoryRow;
