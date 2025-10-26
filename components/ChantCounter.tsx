
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useAuth } from '../hooks/useAuth';

// Fix: Define interfaces for the SpeechRecognition API to provide types and prevent errors.
interface SpeechRecognition {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onresult: (event: any) => void;
  onend: () => void;
  onerror: (event: any) => void;
  start: () => void;
  stop: () => void;
}

interface SpeechRecognitionStatic {
  new (): SpeechRecognition;
}

// Polyfill for webkitSpeechRecognition
const SpeechRecognition: SpeechRecognitionStatic =
  (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

const ChantCounter: React.FC = () => {
  const { user, updateChantCount } = useAuth();
  const [count, setCount] = useState(user?.chantCount || 0);
  const [isListening, setIsListening] = useState(false);
  // Fix: This now correctly refers to the `SpeechRecognition` interface defined above.
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    if (!SpeechRecognition) {
      console.warn("Speech Recognition API is not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onresult = (event) => {
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          const transcript = event.results[i][0].transcript.trim().toLowerCase();
          // Simple check for "om" or other common mantras
          if (transcript.includes('om') || transcript.includes('aum')) {
            setCount(prev => prev + 1);
          }
        }
      }
    };
    
    recognition.onend = () => {
      if (isListening) {
        // Restart recognition if it stops unexpectedly while still in listening mode
        recognition.start();
      }
    };
    
    recognition.onerror = (event) => {
        console.error('Speech recognition error', event.error);
        setIsListening(false);
    };

    recognitionRef.current = recognition;
  }, [isListening]);

  useEffect(() => {
    updateChantCount(count);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);
  
  const handleManualChant = () => {
    setCount(prev => prev + 1);
  };

  const toggleListen = useCallback(() => {
    const recognition = recognitionRef.current;
    if (!recognition) return;

    if (isListening) {
      recognition.stop();
      setIsListening(false);
    } else {
      try {
        recognition.start();
        setIsListening(true);
      } catch (e) {
        console.error("Could not start recognition", e);
      }
    }
  }, [isListening]);

  return (
    <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-lg">
      <h2 className="text-xl font-semibold text-center text-gray-700 mb-4">Mantra Counter</h2>
      <div className="text-7xl font-bold text-center text-purple-800 my-6">{count.toLocaleString()}</div>
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
        <button 
          onClick={handleManualChant}
          className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold rounded-lg shadow-md hover:scale-105 transform transition-transform duration-300"
        >
          Tap to Chant
        </button>
        {SpeechRecognition && (
             <button 
                onClick={toggleListen}
                className={`w-full sm:w-auto px-6 py-4 font-bold rounded-lg shadow-md flex items-center justify-center gap-2 transition-all duration-300 ${isListening ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
             >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
                {isListening ? 'Stop Listening' : 'Voice Chant'}
            </button>
        )}
      </div>
       {!SpeechRecognition && (
          <p className="text-center text-sm text-gray-500 mt-4">Voice chanting is not supported by your browser.</p>
       )}
    </div>
  );
};

export default ChantCounter;