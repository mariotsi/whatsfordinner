import { getYoutubeId } from '../common';

describe('common utilities', () => {
  describe('getYoutubeId', () => {
    it('extracts video ID from standard YouTube URL', () => {
      expect(getYoutubeId('https://www.youtube.com/watch?v=dQw4w9WgXcQ')).toBe(
        'dQw4w9WgXcQ'
      );
    });

    it('extracts video ID from URL with additional parameters', () => {
      expect(getYoutubeId('https://www.youtube.com/watch?v=abc123&t=120')).toBe(
        'abc123'
      );
    });

    it('handles invalid inputs', () => {
      expect(getYoutubeId(null)).toBeNull();
      expect(getYoutubeId(undefined)).toBeNull();
      expect(getYoutubeId('')).toBeNull();
      expect(getYoutubeId('not-a-url')).toBeNull();
      expect(getYoutubeId('https://www.youtube.com/watch')).toBeNull();
    });
  });
});
