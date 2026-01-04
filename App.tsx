// App.tsx
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import * as SplashScreenExpo from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useEffect, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { COLORS } from './src/constants/theme';

// Écrans
import { ForgotPasswordScreen } from './src/screens/auth/ForgotPasswordScreen';
import { LoginScreen } from './src/screens/auth/LoginScreen';
import { OTPVerificationScreen } from './src/screens/auth/OTPVerificationScreen';
import { RegisterScreen } from './src/screens/auth/RegisterScreen';
import { ResetPasswordScreen } from './src/screens/auth/ResetPasswordScreen';
import HomeTabs from './src/screens/main/HomeTabs';
import { OnboardingScreen } from './src/screens/onboarding/OnboardingScreen';
import { SplashScreen } from './src/screens/splash/SplashScreen';

// Empêche le splash screen de se cacher automatiquement
SplashScreenExpo.preventAutoHideAsync();

type AppState =
  | 'loading'
  | 'splash'
  | 'onboarding'
  | 'login'
  | 'register'
  | 'forgot-password'
  | 'otp-verification'
  | 'reset-password'
  | 'main';

export default function App() {
  const [appState, setAppState] = useState<AppState>('loading');
  const [appIsReady, setAppIsReady] = useState(false);
  const [userIdentifier, setUserIdentifier] = useState('');
  const [userId, setUserId] = useState('');
  const [otpPurpose, setOtpPurpose] = useState<
    'registration' | 'forgot-password'
  >('registration');

  // Chargement initial de l'app (ressources + état persistant)
  useEffect(() => {
    async function prepare() {
      try {
        // Simule le chargement de polices, assets, etc.
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const hasSeenOnboarding =
          await AsyncStorage.getItem('hasSeenOnboarding');
        const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');

        if (isLoggedIn === 'true') {
          setAppState('main');
        } else if (hasSeenOnboarding === 'true') {
          setAppState('login');
        } else {
          setAppState('splash');
        }
      } catch (error) {
        console.warn('Erreur lors du chargement initial :', error);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  // Cache le splash screen natif une fois que l'app est prête
  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreenExpo.hideAsync();
    }
  }, [appIsReady]);

  // Handlers de navigation
  const handleSplashFinish = () => setAppState('onboarding');

  const handleOnboardingFinish = async () => {
    await AsyncStorage.setItem('hasSeenOnboarding', 'true');
    setAppState('login');
  };

  const handleRegisterSuccess = (phone: string, userId: string) => {
    setUserIdentifier(phone);
    setUserId(userId);
    setOtpPurpose('registration');
    setAppState('otp-verification');
  };

  const handleLoginSuccess = async () => {
    await AsyncStorage.setItem('isLoggedIn', 'true');
    setAppState('main');
  };

  const handleForgotPasswordCodeSent = (identifier: string) => {
    setUserIdentifier(identifier);
    setOtpPurpose('forgot-password');
    setAppState('otp-verification');
  };

  const handleOTPVerifySuccess = () => {
    if (otpPurpose === 'registration') {
      handleLoginSuccess();
    } else {
      setAppState('reset-password');
    }
  };

  const handleResetPasswordSuccess = () => {
    Alert.alert(
      'Succès !',
      'Votre mot de passe a été réinitialisé avec succès.',
      [{ text: 'OK', onPress: () => setAppState('login') }],
    );
  };

  const handleLogout = async () => {
    await AsyncStorage.multiRemove([
      'isLoggedIn',
      'accessToken',
      'refreshToken',
    ]);
    setAppState('login');
  };

  // Pendant le chargement
  if (!appIsReady) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <View style={styles.container} onLayout={onLayoutRootView}>
        <StatusBar style={appState === 'splash' ? 'light' : 'dark'} />

        {/* Écran Splash personnalisé */}
        {appState === 'splash' && (
          <SplashScreen onFinish={handleSplashFinish} />
        )}

        {/* Onboarding */}
        {appState === 'onboarding' && (
          <OnboardingScreen onFinish={handleOnboardingFinish} />
        )}

        {/* Authentification */}
        {appState === 'login' && (
          <LoginScreen
            onLoginSuccess={handleLoginSuccess}
            onNavigateToRegister={() => setAppState('register')}
            onForgotPassword={() => setAppState('forgot-password')}
          />
        )}

        {appState === 'register' && (
          <RegisterScreen
            onRegisterSuccess={handleRegisterSuccess}
            onNavigateToLogin={() => setAppState('login')}
            onBack={() => setAppState('login')}
          />
        )}

        {appState === 'forgot-password' && (
          <ForgotPasswordScreen
            onBack={() => setAppState('login')}
            onCodeSent={handleForgotPasswordCodeSent}
          />
        )}

        {appState === 'otp-verification' && (
          <OTPVerificationScreen
            onBack={() =>
              setAppState(
                otpPurpose === 'registration' ? 'register' : 'forgot-password',
              )
            }
            onVerifySuccess={handleOTPVerifySuccess}
            identifier={userIdentifier}
            purpose={otpPurpose}
            userId={userId}
          />
        )}

        {appState === 'reset-password' && (
          <ResetPasswordScreen
            onResetSuccess={handleResetPasswordSuccess}
            identifier={userIdentifier}
          />
        )}

        {/* Application principale avec navigation par tabs */}
        {appState === 'main' && (
          <NavigationContainer>
            <HomeTabs onLogout={handleLogout} />
          </NavigationContainer>
        )}
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
});
