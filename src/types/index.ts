export interface User {
  id: string;
  name: string;
  age: number;
  bio: string;
  photos: string[];
  location: {
    city: string;
    country: string;
  };
  interests: string[];
  gender: 'male' | 'female' | 'other';
  lookingFor: 'male' | 'female' | 'both';
}

export interface OnboardingSlide {
  id: string;
  title: string;
  description: string;
  image: any; // ImageSourcePropType ou null
  backgroundColor: string;
}

export interface Match {
  id: string;
  user: User;
  matchedAt: Date;
  lastMessage?: string;
  unreadCount: number;
}
