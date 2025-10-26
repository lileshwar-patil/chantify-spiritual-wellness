export interface User {
  email: string;
  name: string;
  avatarUrl: string;
  chantCount: number;
  zodiacSign?: ZodiacSign;
  isGuest?: boolean;
}

export interface Post {
  id: number;
  title: string;
  snippet: string;
  content: string;
}

export interface Horoscope {
  date_range: string;
  current_date: string;
  description: string;
  compatibility: string;
  mood: string;
  color: string;
  lucky_number: string;
  lucky_time: string;
}

export enum ZodiacSign {
  Aries = 'aries',
  Taurus = 'taurus',
  Gemini = 'gemini',
  Cancer = 'cancer',
  Leo = 'leo',
  Virgo = 'virgo',
  Libra = 'libra',
  Scorpio = 'scorpio',
  Sagittarius = 'sagittarius',
  Capricorn = 'capricorn',
  Aquarius = 'aquarius',
  Pisces = 'pisces',
}