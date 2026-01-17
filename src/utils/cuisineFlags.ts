const cuisineToCountry: Record<string, string> = {
  American: 'us',
  British: 'gb',
  Canadian: 'ca',
  Chinese: 'cn',
  Croatian: 'hr',
  Dutch: 'nl',
  Egyptian: 'eg',
  Filipino: 'ph',
  French: 'fr',
  Greek: 'gr',
  Indian: 'in',
  Irish: 'ie',
  Italian: 'it',
  Jamaican: 'jm',
  Japanese: 'jp',
  Kenyan: 'ke',
  Malaysian: 'my',
  Mexican: 'mx',
  Moroccan: 'ma',
  Polish: 'pl',
  Portuguese: 'pt',
  Russian: 'ru',
  Spanish: 'es',
  Thai: 'th',
  Tunisian: 'tn',
  Turkish: 'tr',
  Ukrainian: 'ua',
  Vietnamese: 'vn',
};

export function getFlagUrl(cuisine: string): string | null {
  const code = cuisineToCountry[cuisine];
  return code ? `https://flagcdn.com/w40/${code}.png` : null;
}
