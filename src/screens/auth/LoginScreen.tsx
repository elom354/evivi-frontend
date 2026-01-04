import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaContainer } from '../../components/layout';
import { Input, Toast } from '../../components/common';
import { useToast } from '../../hooks/useToast';
import AuthService from '../../services/auth/auth.service';
import { COLORS, SIZES } from '../../constants/theme';

interface LoginScreenProps {
  onLoginSuccess: () => void;
  onNavigateToRegister: () => void;
  onForgotPassword: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({
  onLoginSuccess,
  onNavigateToRegister,
  onForgotPassword,
}) => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [identifierError, setIdentifierError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loading, setLoading] = useState(false);

  const { toast, showToast, hideToast } = useToast();

  const validateIdentifier = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^(\+228|00228)?[0-9]{8}$/;
    return emailRegex.test(value) || phoneRegex.test(value.replace(/\s/g, ''));
  };

  const handleLogin = async () => {
    setIdentifierError('');
    setPasswordError('');

    let isValid = true;

    if (!identifier) {
      setIdentifierError('Numéro de téléphone requis');
      isValid = false;
    } else if (!validateIdentifier(identifier)) {
      setIdentifierError('Numéro de téléphone invalide');
      isValid = false;
    }

    if (!password) {
      setPasswordError('Le mot de passe est requis');
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError('Le mot de passe doit contenir au moins 6 caractères');
      isValid = false;
    }

    if (!isValid) return;

    setLoading(true);

    try {
      const response = await AuthService.login({
        identifier: identifier,
        password: password,
      });

      // Sauvegarder les tokens
      if (response.tokens?.accessToken) {
        await AsyncStorage.setItem('accessToken', response.tokens.accessToken);
      }

      if (response.tokens?.refreshToken) {
        await AsyncStorage.setItem(
          'refreshToken',
          response.tokens.refreshToken,
        );
      }

      // Sauvegarder les infos utilisateur (optionnel)
      if (response.user) {
        await AsyncStorage.setItem('user', JSON.stringify(response.user));
      }

      setLoading(false);
      showToast('Connexion réussie ! Bienvenue ', 'success');

      setTimeout(() => {
        onLoginSuccess();
      }, 1500);
    } catch (error: any) {
      setLoading(false);
      showToast(
        error.message || 'Identifiants incorrects. Veuillez réessayer.',
        'error',
      );
    }
  };

  const handleSocialLogin = (provider: string) => {
    showToast(`Connexion avec ${provider} bientôt disponible`, 'info');
  };

  return (
    <SafeAreaContainer style={styles.container}>
      <StatusBar style="dark" />

      {/* Toast */}
      <Toast
        visible={toast.visible}
        message={toast.message}
        type={toast.type}
        onHide={hideToast}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header avec gradient */}
          <LinearGradient
            colors={[COLORS.primaryLight + '40', 'transparent']}
            style={styles.headerGradient}
          >
            <View style={styles.header}>
              <View style={styles.iconContainer}>
                <Ionicons name="heart" size={40} color={COLORS.primary} />
              </View>
              <Text style={styles.title}>Bon retour !</Text>
              <Text style={styles.subtitle}>
                Connectez-vous pour continuer votre aventure
              </Text>
            </View>
          </LinearGradient>

          {/* Form */}
          <View style={styles.form}>
            <Input
              label="Numéro de téléphone"
              placeholder="+228 XX XX XX XX"
              value={identifier}
              onChangeText={setIdentifier}
              error={identifierError}
              icon="call-outline"
              keyboardType="phone-pad"
              autoCapitalize="none"
            />

            <Input
              label="Mot de passe"
              placeholder="Entrez votre mot de passe"
              value={password}
              onChangeText={setPassword}
              error={passwordError}
              icon="lock-closed-outline"
              isPassword
              autoCapitalize="none"
            />

            <TouchableOpacity
              style={styles.forgotPassword}
              onPress={onForgotPassword}
            >
              <Text style={styles.forgotPasswordText}>
                Mot de passe oublié ?
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.loginButton,
                loading && styles.loginButtonDisabled,
              ]}
              onPress={handleLogin}
              disabled={loading}
              activeOpacity={0.8}
            >
              <Text style={styles.loginButtonText}>
                {loading ? 'Connexion...' : 'Se connecter'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Divider */}
          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <View style={styles.dividerLine} />
          </View>
          {/* Register Link */}
          <View style={styles.registerContainer}>
            <Text style={styles.registerText}>Nouveau sur Evivi ? </Text>
            <TouchableOpacity onPress={onNavigateToRegister}>
              <Text style={styles.registerLink}>Créer un compte</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: SIZES.xl,
    paddingBottom: SIZES.xl,
  },
  headerGradient: {
    paddingTop: SIZES.xxl,
    paddingBottom: SIZES.xl,
    marginBottom: SIZES.lg,
    borderRadius: SIZES.radiusXl,
    marginHorizontal: -SIZES.xl,
    marginTop: -SIZES.xl,
  },
  header: {
    alignItems: 'center',
    paddingHorizontal: SIZES.xl,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SIZES.lg,
  },
  title: {
    fontSize: SIZES.h1,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SIZES.xs,
  },
  subtitle: {
    fontSize: SIZES.body,
    color: COLORS.textSecondary,
    textAlign: 'center',
    paddingHorizontal: SIZES.md,
  },
  form: {
    marginBottom: 24,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 24,
    marginTop: -4,
  },
  forgotPasswordText: {
    fontSize: SIZES.caption,
    color: COLORS.primary,
    fontWeight: '600',
  },
  loginButton: {
    height: SIZES.buttonHeight,
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.radiusFull,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: SIZES.sm,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  loginButtonDisabled: {
    opacity: 0.5,
  },
  loginButtonText: {
    fontSize: SIZES.body,
    fontWeight: '600',
    color: COLORS.white,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: SIZES.xl,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.gray[200],
  },
  dividerText: {
    marginHorizontal: SIZES.md,
    fontSize: SIZES.small,
    color: COLORS.textLight,
    fontWeight: '500',
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: SIZES.md,
    marginBottom: SIZES.xl,
  },
  socialButton: {
    width: 56,
    height: 56,
    borderRadius: SIZES.radiusMd,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: COLORS.gray[200],
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: SIZES.md,
    marginBottom: SIZES.xl,
  },
  registerText: {
    fontSize: SIZES.body,
    color: COLORS.textSecondary,
  },
  registerLink: {
    fontSize: SIZES.body,
    color: COLORS.primary,
    fontWeight: '700',
  },
});
