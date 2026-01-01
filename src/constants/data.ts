import { OnboardingSlide } from '../types';
import { COLORS } from './theme';

import { ImageSourcePropType } from 'react-native';

export const ONBOARDING_SLIDES: OnboardingSlide[] = [
  {
    id: '1',
    title: 'Algorithme',
    description: 'Les utilisateurs passent par un processus de vérification pour garantir que vous ne correspondrez jamais avec des bots.',
    image: require('../assets/images/onboarding1.png') as ImageSourcePropType,
    backgroundColor: COLORS.onboarding.slide1,
  },
  {
    id: '2',
    title: 'Correspondances',
    description: 'Nous vous mettons en relation avec des personnes qui ont un large éventail d\'intérêts similaires.',
    image: require('../assets/images/onboarding2.png') as ImageSourcePropType,
    backgroundColor: COLORS.onboarding.slide2,
  },
  {
    id: '3',
    title: 'Premium',
    description: 'Inscrivez-vous aujourd\'hui et profitez du premier mois d\'avantages premium offert par nos soins.',
    image: require('../assets/images/onboarding3.png') as ImageSourcePropType,
    backgroundColor: COLORS.onboarding.slide3,
  },
];
