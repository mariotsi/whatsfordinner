const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

export interface Area {
  strArea: string;
}

interface AreasResponse {
  meals: Area[];
}

export async function fetchAreas(): Promise<Area[]> {
  const response = await fetch(`${BASE_URL}/list.php?a=list`);

  if (!response.ok) {
    throw new Error('Failed to fetch areas');
  }

  const data: AreasResponse = await response.json();
  return data.meals;
}
