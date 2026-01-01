import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreenExpo from 'expo-splash-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SplashScreen } from './src/screens/splash/SplashScreen';
import { OnboardingScreen } from './src/screens/onboarding/OnboardingScreen';
import { COLORS } from './src/constants/theme';

// Empêche le splash screen natif de se cacher automatiquement
SplashScreenExpo.preventAutoHideAsync();

type AppState = 'loading' | 'splash' | 'onboarding' | 'auth' | 'main';

export default function App() {
  const [appState, setAppState] = useState<AppState>('loading');
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Charger les ressources, fonts, etc.
        await loadResources();

        // Vérifier si l'utilisateur a déjà vu l'onboarding
        const hasSeenOnboarding = await AsyncStorage.getItem('hasSeenOnboarding');

        if (hasSeenOnboarding === 'true') {
          // Si oui, aller directement à l'écran d'authentification
          // Pour l'instant on reste sur onboarding pour le développement
          setAppState('splash');
        } else {
          setAppState('splash');
        }
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const loadResources = async () => {
    // Ici tu pourras charger les fonts, images, etc.
    // Pour l'instant, on simule un chargement
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreenExpo.hideAsync();
    }
  }, [appIsReady]);

  const handleSplashFinish = () => {
    setAppState('onboarding');
  };

  const handleOnboardingFinish = async () => {
    // Sauvegarder que l'utilisateur a vu l'onboarding
    await AsyncStorage.setItem('hasSeenOnboarding', 'true');
    // Aller vers l'écran d'authentification (à créer)
    setAppState('auth');
  };

  if (!appIsReady) {
    return null;
  }

  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <StatusBar style="light" />

      {appState === 'splash' && (
        <SplashScreen onFinish={handleSplashFinish} />
      )}

      {appState === 'onboarding' && (
        <OnboardingScreen onFinish={handleOnboardingFinish} />
      )}

      {appState === 'auth' && (
        <View style={styles.placeholder}>
          {/* Écran d'authentification à créer prochainement */}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  placeholder: {
    flex: 1,
    backgroundColor: COLORS.backgroundDark,
  },
});
