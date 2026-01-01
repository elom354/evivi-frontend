import { OnboardingSlide } from '../types';
import { COLORS } from './theme';

export const ONBOARDING_SLIDES: OnboardingSlide[] = [
  {
    id: '1',
    title: 'Rencontrez des personnes incroyables',
    description: 'Découvrez des célibataires près de chez vous au Togo',
    image: null, // On utilisera des placeholders pour l'instant
    backgroundColor: COLORS.primary,
  },
  {
    id: '2',
    title: 'Connectez-vous facilement',
    description: 'Swipez, matchez et commencez à discuter instantanément',
    image: null,
    backgroundColor: COLORS.secondary,
  },
  {
    id: '3',
    title: 'Trouvez votre match parfait',
    description: 'Rencontrez quelqu\'un de spécial aujourd\'hui',
    image: null,
    backgroundColor: COLORS.accent,
  },
];
