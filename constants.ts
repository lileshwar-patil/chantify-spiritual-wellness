import { Post, ZodiacSign } from './types';

export const SPIRITUAL_POSTS: Post[] = [
  {
    id: 1,
    title: 'The Power of "Om": The Sacred Sound',
    snippet: 'Explore the profound meaning and vibrational power of the universal mantra, Om.',
    content: 'The mantra "Om" is considered the primordial sound of the universe. Chanting it connects us to our divine essence and the cosmic vibration. It is said to encompass all of creation. The sound is a combination of three syllables: A, U, and M, representing the waking, dreaming, and deep sleep states of consciousness. The silence that follows represents the fourth state, Turiya, which is pure consciousness itself. Regular chanting of Om can bring peace, clarity, and a deep sense of connection to all things.',
  },
  {
    id: 2,
    title: 'Understanding Karma: Cause and Effect',
    snippet: 'Dive into the principle of Karma and how it shapes our lives and spiritual journey.',
    content: 'Karma is the universal law of cause and effect. Every action, thought, and word we put out into the world creates a ripple that eventually returns to us. It is not about punishment or reward, but about learning and growth. Understanding Karma empowers us to take responsibility for our lives. By cultivating positive actions (good karma), we can create a more harmonious and fulfilling existence for ourselves and others. It encourages mindfulness and conscious living.',
  },
  {
    id: 3,
    title: 'Introduction to Bhakti Yoga: The Path of Devotion',
    snippet: 'Discover Bhakti Yoga, the spiritual path of love and devotion, and how to practice it.',
    content: 'Bhakti Yoga is one of the main paths of yoga, focusing on cultivating love and devotion towards the divine. It involves practices like chanting (kirtan), prayer, and selfless service. The core of Bhakti is to see the divine in everything and everyone. It is a path of the heart, transforming emotions into a powerful force for spiritual connection. Unlike other paths that may emphasize discipline or knowledge, Bhakti is accessible to everyone, as it relies on the universal emotion of love.',
  },
  {
    id: 4,
    title: 'The Art of Mindfulness Meditation',
    snippet: 'Learn to be present in the moment and observe your thoughts without judgment.',
    content: 'Mindfulness is the practice of paying attention to the present moment intentionally and non-judgmentally. It involves observing your thoughts, feelings, bodily sensations, and surrounding environment. Through mindfulness meditation, you can reduce stress, improve focus, and gain a deeper understanding of yourself. It is a simple yet powerful practice that can be integrated into daily life to cultivate a sense of calm and awareness.',
  },
  {
    id: 5,
    title: 'An Introduction to the Chakras',
    snippet: 'Understand the seven main energy centers in the body and their significance.',
    content: 'Chakras are energy centers within the human body that help to regulate all its processes, from organ function to the immune system and emotions. There are seven main chakras, starting from the base of the spine to the crown of the head. Each chakra has its own vibrational frequency, color, and governs specific functions. Balancing these chakras is believed to lead to physical, mental, and spiritual well-being.',
  },
  {
    id: 6,
    title: 'Pranayama: The Power of Breath',
    snippet: 'Explore ancient breathing techniques to control your energy and calm your mind.',
    content: 'Pranayama is the yogic practice of focusing on breath. In Sanskrit, "prana" means life energy, and "ayama" means to extend or draw out. Together, they mean the control or extension of the life force. These breathing exercises are a central part of yoga, designed to clear physical and emotional obstacles in the body to free the breath and the flow of prana. Regular practice can increase energy, reduce stress, and improve mental clarity.',
  },
  {
    id: 7,
    title: 'Ahimsa: The Path of Non-Violence',
    snippet: 'Discover the principle of causing no harm in thought, word, and deed.',
    content: 'Ahimsa, or non-violence, is a fundamental tenet of many Eastern religions, including Hinduism, Buddhism, and Jainism. It extends beyond physical violence to include thoughts and words. Practicing Ahimsa means cultivating compassion and harmlessness towards all living beings, including oneself. It is about promoting peace and love in every aspect of life, leading to a more harmonious existence with the world around us.',
  },
  {
    id: 8,
    title: 'Finding Your Dharma: Life\'s Purpose',
    snippet: 'Explore the concept of Dharma and how to align with your unique life path.',
    content: 'In Hindu philosophy, Dharma signifies the cosmic law and order, but it also means one\'s true purpose or calling in life. Living in accordance with your Dharma is believed to lead to contentment, fulfillment, and spiritual growth. It is about understanding your unique talents and duties and using them for the greater good. Discovering your Dharma is a journey of self-exploration and living an authentic, purpose-driven life.',
  },
  {
    id: 9,
    title: 'The Guru-Disciple Relationship',
    snippet: 'Understand the sacred bond between a spiritual teacher and a student.',
    content: 'The Guru-shishya tradition is a sacred relationship in which a spiritual teacher (Guru) guides a student (shishya) on their spiritual path. The Guru is seen as a dispeller of darkness, who imparts wisdom and helps the disciple overcome ignorance. This relationship is built on trust, respect, and devotion. It is a transformative journey that accelerates the student\'s spiritual progress and leads them toward self-realization.',
  },
  {
    id: 10,
    title: 'The Power of Gratitude (Kritajnata)',
    snippet: 'Learn how practicing gratitude can transform your perspective and well-being.',
    content: 'Kritajnata, or gratitude, is the quality of being thankful and showing appreciation. It is a powerful spiritual practice that shifts focus from what is lacking to the abundance that is already present. Cultivating a daily habit of gratitude can lead to increased happiness, reduced stress, and improved relationships. It opens the heart and helps us recognize the divine blessings in every moment of our lives, fostering a positive and content mindset.',
  },
];

export const ZODIAC_SIGNS: { name: ZodiacSign; symbol: string }[] = [
  { name: ZodiacSign.Aries, symbol: '♈' },
  { name: ZodiacSign.Taurus, symbol: '♉' },
  { name: ZodiacSign.Gemini, symbol: '♊' },
  { name: ZodiacSign.Cancer, symbol: '♋' },
  { name: ZodiacSign.Leo, symbol: '♌' },
  { name: ZodiacSign.Virgo, symbol: '♍' },
  { name: ZodiacSign.Libra, symbol: '♎' },
  { name: ZodiacSign.Scorpio, symbol: '♏' },
  { name: ZodiacSign.Sagittarius, symbol: '♐' },
  { name: ZodiacSign.Capricorn, symbol: '♑' },
  { name: ZodiacSign.Aquarius, symbol: '♒' },
  { name: ZodiacSign.Pisces, symbol: '♓' },
];