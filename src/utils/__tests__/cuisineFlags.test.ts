import { getFlagUrl } from '../cuisineFlags';
import { Cousine } from '@/types/MealsApi';

describe('cuisineFlags utilities', () => {
  describe('getFlagUrl', () => {
    it('returns correct flag URL for known cuisines', () => {
      expect(getFlagUrl('Italian' as Cousine)).toBe(
        'https://flagcdn.com/w40/it.png'
      );
      expect(getFlagUrl('American' as Cousine)).toBe(
        'https://flagcdn.com/w40/us.png'
      );
      expect(getFlagUrl('Japanese' as Cousine)).toBe(
        'https://flagcdn.com/w40/jp.png'
      );
      expect(getFlagUrl('Mexican' as Cousine)).toBe(
        'https://flagcdn.com/w40/mx.png'
      );
    });

    it('returns null for unknown cuisines', () => {
      expect(getFlagUrl('Unknown' as Cousine)).toBeNull();
      expect(getFlagUrl('Martian' as Cousine)).toBeNull();
    });

    it('handles multi-word cuisine names', () => {
      expect(getFlagUrl('Saudi Arabian' as Cousine)).toBe(
        'https://flagcdn.com/w40/sa.png'
      );
    });

    it('is case-sensitive', () => {
      expect(getFlagUrl('italian' as Cousine)).toBeNull();
      expect(getFlagUrl('ITALIAN' as Cousine)).toBeNull();
    });
  });
});
