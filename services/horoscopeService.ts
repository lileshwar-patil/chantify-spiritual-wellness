
import { Horoscope, ZodiacSign } from '../types';

const API_URL = 'https://aztro.sameerkumar.website/';

export const getHoroscope = async (sign: ZodiacSign, day: 'today' | 'yesterday' | 'tomorrow'): Promise<Horoscope> => {
  const response = await fetch(`${API_URL}?sign=${sign}&day=${day}`, {
    method: 'POST',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch horoscope data');
  }
  
  const data = await response.json();
  return data as Horoscope;
};
