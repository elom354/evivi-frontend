import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { Button, Input, IconButton } from '../../components/common';
import { COLORS, SIZES, SHADOWS } from '../../constants/theme';

interface RegisterScreenProps {
    onRegisterSuccess: (phone: string) => void;
    onNavigateToLogin: () => void;
    onBack: () => void;
  }

export const RegisterScreen: React.FC<RegisterScreenProps> = ({
  onRegisterSuccess,
  onNavigateToLogin,
  onBack,
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [nameError, setNameError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const [loading, setLoading] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);

  const validatePhone = (phone: string) => {
    // Format togolais: commence par +228 ou 00228 ou directement 8 chiffres
    const phoneRegex = /^(\+228|00228)?[0-9]{8}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  };

  const handleRegister = async () => {
    // Reset errors
    setNameError('');
    setPhoneError('');
    setPasswordError('');
    setConfirmPasswordError('');

    // Validation
    let isValid = true;

    if (!name || name.length < 2) {
      setNameError('Le nom doit contenir au moins 2 caractères');
      isValid = false;
    }

    if (!phone) {
      setPhoneError('Le numéro de téléphone est requis');
      isValid = false;
    } else if (!validatePhone(phone)) {
      setPhoneError('Numéro de téléphone invalide (ex: +228 XX XX XX XX)');
      isValid = false;
    }

    if (!password) {
      setPasswordError('Le mot de passe est requis');
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError('Le mot de passe doit contenir au moins 6 caractères');
      isValid = false;
    }

    if (!confirmPassword) {
      setConfirmPasswordError('Veuillez confirmer votre mot de passe');
      isValid = false;
    } else if (password !== confirmPassword) {
      setConfirmPasswordError('Les mots de passe ne correspondent pas');
      isValid = false;
    }

    if (!acceptTerms) {
      alert('Veuillez accepter les conditions d\'utilisation');
      isValid = false;
    }

    if (!isValid) return;

    setLoading(true);

    // TODO: Appel API au backend NestJS
    // const response = await fetch('YOUR_API_URL/auth/register', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ name, phone, password }),
    // });

    setTimeout(() => {
      setLoading(false);
      onRegisterSuccess(phone);
    }, 1500);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <StatusBar style="dark" />

      {/* Back Button */}
      <View style={styles.backButton}>
        <IconButton
          icon="arrow-back"
          onPress={onBack}
          size={24}
          color={COLORS.text}
        />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <LinearGradient
              colors={[COLORS.primary, COLORS.secondary]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.logoGradient}
            >
              <Ionicons name="heart" size={40} color={COLORS.white} />
            </LinearGradient>
          </View>
          <Text style={styles.title}>Créer un compte</Text>
          <Text style={styles.subtitle}>
            Rejoignez notre communauté
          </Text>
        </View>

        {/* Form */}
        <View style={styles.form}>
          <Input
            label="Nom complet"
            placeholder="Jean Koffi"
            value={name}
            onChangeText={setName}
            error={nameError}
            icon="person-outline"
            autoCapitalize="words"
          />

          <Input
            label="Numéro de téléphone"
            placeholder="+228 XX XX XX XX"
            value={phone}
            onChangeText={setPhone}
            error={phoneError}
            icon="call-outline"
            keyboardType="phone-pad"
            autoCapitalize="none"
          />

          <Input
            label="Mot de passe"
            placeholder="••••••••"
            value={password}
            onChangeText={setPassword}
            error={passwordError}
            icon="lock-closed-outline"
            isPassword
            autoCapitalize="none"
          />

          <Input
            label="Confirmer le mot de passe"
            placeholder="••••••••"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            error={confirmPasswordError}
            icon="lock-closed-outline"
            isPassword
            autoCapitalize="none"
          />

          {/* Terms and Conditions */}
          <TouchableOpacity
            style={styles.termsContainer}
            onPress={() => setAcceptTerms(!acceptTerms)}
            activeOpacity={0.7}
          >
            <View style={[styles.checkbox, acceptTerms && styles.checkboxActive]}>
              {acceptTerms && (
                <Ionicons name="checkmark" size={16} color={COLORS.white} />
              )}
            </View>
            <Text style={styles.termsText}>
              J'accepte les{' '}
              <Text style={styles.termsLink}>conditions d'utilisation</Text>
              {' '}et la{' '}
              <Text style={styles.termsLink}>politique de confidentialité</Text>
            </Text>
          </TouchableOpacity>

          <Button
            title="S'inscrire"
            onPress={handleRegister}
            loading={loading}
            fullWidth
            style={styles.registerButton}
          />
        </View>

        {/* Login Link */}
        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>Vous avez déjà un compte ? </Text>
          <TouchableOpacity onPress={onNavigateToLogin}>
            <Text style={styles.loginLink}>Se connecter</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  backButton: {
    position: 'absolute',
    top: SIZES.xxl + 10,
    left: SIZES.md,
    zIndex: 10,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: SIZES.xl,
    paddingTop: SIZES.xxl + 20,
    paddingBottom: SIZES.xl,
  },
  header: {
    alignItems: 'center',
    marginBottom: SIZES.xl,
  },
  logoContainer: {
    marginBottom: SIZES.lg,
  },
  logoGradient: {
    width: 80,
    height: 80,
    borderRadius: SIZES.radiusXl,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.medium,
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
  },
  form: {
    marginBottom: SIZES.lg,
  },
  infoBox: {
    flexDirection: 'row',
    backgroundColor: COLORS.primary + '10',
    padding: SIZES.md,
    borderRadius: SIZES.radiusMd,
    marginBottom: SIZES.md,
    gap: SIZES.sm,
  },
  infoText: {
    flex: 1,
    fontSize: SIZES.caption,
    color: COLORS.primary,
    lineHeight: 18,
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: SIZES.lg,
    marginTop: SIZES.xs,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: SIZES.radiusSm,
    borderWidth: 2,
    borderColor: COLORS.gray[300],
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SIZES.sm,
  },
  checkboxActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  termsText: {
    flex: 1,
    fontSize: SIZES.caption,
    color: COLORS.textSecondary,
    lineHeight: 20,
  },
  termsLink: {
    color: COLORS.primary,
    fontWeight: '600',
  },
  registerButton: {
    marginTop: SIZES.sm,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginText: {
    fontSize: SIZES.body,
    color: COLORS.textSecondary,
  },
  loginLink: {
    fontSize: SIZES.body,
    color: COLORS.primary,
    fontWeight: '700',
  },
});
