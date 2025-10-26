
import React, { useState, useEffect, useCallback } from 'react';
import { Horoscope, ZodiacSign } from '../../types';
import { getHoroscope } from '../../services/horoscopeService';
import { ZODIAC_SIGNS } from '../../constants';
import { useAuth } from '../../hooks/useAuth';

const HoroscopeView: React.FC = () => {
  const { user, updateZodiacSign } = useAuth();
  const [selectedSign, setSelectedSign] = useState<ZodiacSign | null>(user?.zodiacSign || null);
  const [horoscope, setHoroscope] = useState<Horoscope | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchHoroscope = useCallback(async (sign: ZodiacSign) => {
    if (!sign) return;
    setLoading(true);
    setError(null);
    setHoroscope(null);
    try {
      const data = await getHoroscope(sign, 'today');
      setHoroscope(data);
    } catch (err) {
      setError('Failed to fetch horoscope. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (selectedSign) {
      fetchHoroscope(selectedSign);
    }
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  const handleSignSelect = (sign: ZodiacSign) => {
    setSelectedSign(sign);
    updateZodiacSign(sign);
    fetchHoroscope(sign);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Daily Horoscope</h1>
      
      <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-lg mb-8">
        <h2 className="text-xl font-semibold text-center text-gray-700 mb-4">Select Your Zodiac Sign</h2>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
          {ZODIAC_SIGNS.map(sign => (
            <button
              key={sign.name}
              onClick={() => handleSignSelect(sign.name)}
              className={`p-4 rounded-xl text-center transition-all duration-300 ${selectedSign === sign.name ? 'bg-purple-600 text-white shadow-lg scale-105' : 'bg-purple-100 text-purple-800 hover:bg-purple-200'}`}
            >
              <div className="text-3xl">{sign.symbol}</div>
              <div className="text-sm capitalize font-medium mt-1">{sign.name}</div>
            </button>
          ))}
        </div>
      </div>

      {loading && <Spinner />}
      {error && <p className="text-center text-red-500">{error}</p>}
      {horoscope && (
        <div className="bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-xl animate-fade-in">
          <h2 className="text-2xl font-bold text-purple-800 mb-2 capitalize">{selectedSign} Horoscope</h2>
          <p className="text-gray-500 mb-4">For {horoscope.current_date}</p>
          <p className="text-gray-700 leading-relaxed">{horoscope.description}</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 text-center">
            <InfoCard label="Mood" value={horoscope.mood} />
            <InfoCard label="Color" value={horoscope.color} />
            <InfoCard label="Lucky Number" value={horoscope.lucky_number} />
            <InfoCard label="Compatibility" value={horoscope.compatibility} />
          </div>
        </div>
      )}
    </div>
  );
};

const Spinner: React.FC = () => (
    <div className="flex justify-center items-center p-8">
        <div className="w-12 h-12 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
    </div>
);

const InfoCard: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="bg-purple-50 p-4 rounded-lg">
    <p className="text-sm font-semibold text-purple-500">{label}</p>
    <p className="text-lg font-bold text-purple-900">{value}</p>
  </div>
);

export default HoroscopeView;
