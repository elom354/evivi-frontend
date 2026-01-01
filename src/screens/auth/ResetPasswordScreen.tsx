import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { Button, Input } from '../../components/common';
import { COLORS, SIZES, SHADOWS } from '../../constants/theme';

interface ResetPasswordScreenProps {
  onResetSuccess: () => void;
  identifier: string;
}

export const ResetPasswordScreen: React.FC<ResetPasswordScreenProps> = ({
  onResetSuccess,
  identifier,
}) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async () => {
    setPasswordError('');
    setConfirmPasswordError('');

    let isValid = true;

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

    if (!isValid) return;

    setLoading(true);

    // TODO: Appel API au backend NestJS
    // const response = await fetch('YOUR_API_URL/auth/reset-password', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ identifier, password }),
    // });

    setTimeout(() => {
      setLoading(false);
      onResetSuccess();
    }, 1500);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <StatusBar style="dark" />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <LinearGradient
              colors={[COLORS.primary, COLORS.secondary]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.iconGradient}
            >
              <Ionicons name="key" size={40} color={COLORS.white} />
            </LinearGradient>
          </View>
          <Text style={styles.title}>Nouveau mot de passe</Text>
          <Text style={styles.subtitle}>
            Créez un nouveau mot de passe sécurisé
          </Text>
        </View>

        {/* Form */}
        <View style={styles.form}>
          <Input
            label="Nouveau mot de passe"
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

          <Button
            title="Réinitialiser le mot de passe"
            onPress={handleResetPassword}
            loading={loading}
            fullWidth
            style={styles.resetButton}
          />
        </View>

        {/* Password Requirements */}
        <View style={styles.requirementsBox}>
          <Text style={styles.requirementsTitle}>
            Le mot de passe doit contenir :
          </Text>
          <View style={styles.requirement}>
            <Ionicons
              name={password.length >= 6 ? 'checkmark-circle' : 'ellipse-outline'}
              size={20}
              color={password.length >= 6 ? COLORS.success : COLORS.textLight}
            />
            <Text style={styles.requirementText}>
              Au moins 6 caractères
            </Text>
          </View>
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
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: SIZES.xl,
    paddingTop: SIZES.xxl + 20,
    paddingBottom: SIZES.xl,
  },
  header: {
    alignItems: 'center',
    marginBottom: SIZES.xxl,
  },
  iconContainer: {
    marginBottom: SIZES.lg,
  },
  iconGradient: {
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
    textAlign: 'center',
  },
  subtitle: {
    fontSize: SIZES.body,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  form: {
    marginBottom: SIZES.xl,
  },
  resetButton: {
    marginTop: SIZES.md,
  },
  requirementsBox: {
    backgroundColor: COLORS.backgroundDark,
    padding: SIZES.md,
    borderRadius: SIZES.radiusMd,
  },
  requirementsTitle: {
    fontSize: SIZES.caption,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SIZES.sm,
  },
  requirement: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SIZES.sm,
  },
  requirementText: {
    fontSize: SIZES.caption,
    color: COLORS.textSecondary,
  },
});
