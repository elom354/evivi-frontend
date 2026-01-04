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
import { SafeAreaContainer } from '../../components/layout';
import { Button, IconButton, Input } from '../../components/common';
import { COLORS, SIZES } from '../../constants/theme';

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
    setTimeout(() => {
      setLoading(false);
      onResetSuccess();
    }, 1500);
  };

  return (
    <SafeAreaContainer style={styles.container}>
      <StatusBar style="dark" />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        {/* Back Button */}
        <View style={styles.backButton}>
          <IconButton
            icon="arrow-back"
            onPress={() => {}}
            size={24}
            color={COLORS.text}
          />
        </View>

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
                <Ionicons name="key" size={40} color={COLORS.primary} />
              </View>
              <Text style={styles.title}>Nouveau mot de passe</Text>
              <Text style={styles.subtitle}>
                Créez un nouveau mot de passe sécurisé
              </Text>
            </View>
          </LinearGradient>

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
              name={
                password.length >= 6 ? 'checkmark-circle' : 'ellipse-outline'
              }
              size={20}
              color={password.length >= 6 ? COLORS.success : COLORS.textLight}
            />
            <Text style={styles.requirementText}>Au moins 6 caractères</Text>
          </View>
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
  backButton: {
    position: 'absolute',
    top: SIZES.xl,
    left: SIZES.md,
    zIndex: 10,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: SIZES.xl,
    paddingBottom: SIZES.xl,
  },
  headerGradient: {
    paddingTop: SIZES.xxl + 20,
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
    borderRadius: SIZES.radiusXl,
    backgroundColor: COLORS.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SIZES.lg,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SIZES.xs,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: SIZES.body,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
  },
  form: {
    marginBottom: SIZES.xl,
  },
  resetButton: {
    marginTop: SIZES.md,
  },
  requirementsBox: {
    backgroundColor: COLORS.gray[50],
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
