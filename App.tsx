import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreenExpo from 'expo-splash-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SplashScreen } from './src/screens/splash/SplashScreen';
import { OnboardingScreen } from './src/screens/onboarding/OnboardingScreen';
import { LoginScreen } from './src/screens/auth/LoginScreen';
import { RegisterScreen } from './src/screens/auth/RegisterScreen';
import { ForgotPasswordScreen } from './src/screens/auth/ForgotPasswordScreen';
import { OTPVerificationScreen } from './src/screens/auth/OTPVerificationScreen';
import { ResetPasswordScreen } from './src/screens/auth/ResetPasswordScreen';
import { COLORS } from './src/constants/theme';

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
  const [otpPurpose, setOtpPurpose] = useState<'registration' | 'forgot-password'>('registration');

  useEffect(() => {
    async function prepare() {
      try {
        await loadResources();

        const hasSeenOnboarding = await AsyncStorage.getItem('hasSeenOnboarding');
        const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');

        if (isLoggedIn === 'true') {
          setAppState('main');
        } else if (hasSeenOnboarding === 'true') {
          setAppState('login');
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
    await AsyncStorage.setItem('hasSeenOnboarding', 'true');
    setAppState('login');
  };

  const handleRegisterSuccess = (phone: string) => {
    setUserIdentifier(phone);
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
      // Après vérification OTP d'inscription, connecter l'utilisateur
      handleLoginSuccess();
    } else {
      // Après vérification OTP de mot de passe oublié, aller à reset password
      setAppState('reset-password');
    }
  };

  const handleResetPasswordSuccess = () => {
    Alert.alert(
      'Succès !',
      'Votre mot de passe a été réinitialisé avec succès.',
      [{ text: 'OK', onPress: () => setAppState('login') }]
    );
  };

  if (!appIsReady) {
    return null;
  }

  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <StatusBar style={appState === 'splash' ? 'light' : 'dark'} />

      {appState === 'splash' && (
        <SplashScreen onFinish={handleSplashFinish} />
      )}

      {appState === 'onboarding' && (
        <OnboardingScreen onFinish={handleOnboardingFinish} />
      )}

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
          onBack={() => setAppState(otpPurpose === 'registration' ? 'register' : 'forgot-password')}
          onVerifySuccess={handleOTPVerifySuccess}
          identifier={userIdentifier}
          purpose={otpPurpose}
        />
      )}

      {appState === 'reset-password' && (
        <ResetPasswordScreen
          onResetSuccess={handleResetPasswordSuccess}
          identifier={userIdentifier}
        />
      )}

      {appState === 'main' && (
        <View style={styles.placeholder}>
          {/* Main App - À créer prochainement */}
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
