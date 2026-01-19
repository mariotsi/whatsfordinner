import styles from './page.module.css';
import History from '@/components/history/History';
import { Typography } from '@mui/material';

export default function Home() {
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
        <History />
      </main>
    </div>
  );
}
