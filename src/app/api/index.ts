//utils
import { ICategory } from '@/utils/api';
import { API_URL_TEST } from '@/utils/contants';

// FETCH ALL CATEGORIES
export const getAllCategories = async (): Promise<ICategory[]> => {
  const res = await fetch(`${API_URL_TEST}/categories`, {
    cache: 'no-cache',
  });
  if (!res.ok) {
    throw new Error(res.statusText);
  }

  return res.json();
};
