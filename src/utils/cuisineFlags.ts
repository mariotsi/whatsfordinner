import { Cousine } from '@/api/mealdb';

const cuisineToCountry: Record<string, string> = {
  Algerian: 'dz',
  American: 'us',
  Argentinian: 'ar',
  Australian: 'au',
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
  Norwegian: 'no',
  Polish: 'pl',
  Portuguese: 'pt',
  Russian: 'ru',
  'Saudi Arabian': 'sa',
  Slovakian: 'sk',
  Spanish: 'es',
  Syrian: 'sy',
  Thai: 'th',
  Tunisian: 'tn',
  Turkish: 'tr',
  Ukrainian: 'ua',
  Uruguayan: 'uy',
  Venezulan: 've',
  Vietnamese: 'vn',
};

export function getFlagUrl(cuisine: Cousine): string | null {
  const code = cuisineToCountry[cuisine];
  return code ? `https://flagcdn.com/w40/${code}.png` : null;
}
