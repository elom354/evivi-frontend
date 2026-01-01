import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES } from '../../constants/theme';

const { width, height } = Dimensions.get('window');

interface SplashScreenProps {
  onFinish: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.3)).current;
  const heartBeat = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Animation séquencée
    Animated.sequence([
      // Apparition du logo
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 10,
          friction: 3,
          useNativeDriver: true,
        }),
      ]),
      // Pause
      Animated.delay(500),
      // Battement de coeur
      Animated.loop(
        Animated.sequence([
          Animated.timing(heartBeat, {
            toValue: 1.2,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(heartBeat, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }),
        ]),
        { iterations: 2 }
      ),
    ]).start(() => {
      // Transition vers onboarding après 2.5s
      setTimeout(onFinish, 500);
    });
  }, []);

  return (
    <LinearGradient
      colors={[COLORS.primary, COLORS.secondary]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <Animated.View
        style={[
          styles.logoContainer,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <Animated.View
          style={{
            transform: [{ scale: heartBeat }],
          }}
        >
          <Ionicons name="heart" size={100} color={COLORS.white} />
        </Animated.View>
        <Text style={styles.appName}>Togo Dating</Text>
        <Text style={styles.tagline}>Trouvez votre match parfait</Text>
      </Animated.View>

      <Animated.View style={[styles.footer, { opacity: fadeAnim }]}>
        <Text style={styles.footerText}>Créé avec ❤️ au Togo</Text>
      </Animated.View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
  },
  appName: {
    fontSize: SIZES.h1 + 8,
    fontWeight: 'bold',
    color: COLORS.white,
    marginTop: SIZES.lg,
    letterSpacing: 1,
  },
  tagline: {
    fontSize: SIZES.body,
    color: COLORS.white,
    opacity: 0.9,
    marginTop: SIZES.sm,
  },
  footer: {
    position: 'absolute',
    bottom: SIZES.xxl,
  },
  footerText: {
    fontSize: SIZES.caption,
    color: COLORS.white,
    opacity: 0.8,
  },
});
