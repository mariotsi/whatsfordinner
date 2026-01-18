export const getYoutubeId = (url: string | undefined | null) => {
  if (!url) return null;
  try {
    const urlObj = new URL(url);
    return urlObj.searchParams.get('v');
  } catch {
    return null;
  }
};
