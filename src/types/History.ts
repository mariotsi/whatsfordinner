import { Meal } from './MealsApi';

export interface HistoryEntry extends Meal {
  isoTimestamp: string;
  vote: 'like' | 'dislike';
}
