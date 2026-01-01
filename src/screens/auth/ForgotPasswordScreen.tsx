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
import { Button, Input, IconButton } from '../../components/common';
import { COLORS, SIZES, SHADOWS } from '../../constants/theme';

interface ForgotPasswordScreenProps {
  onBack: () => void;
  onCodeSent: (identifier: string) => void;
}

export const ForgotPasswordScreen: React.FC<ForgotPasswordScreenProps> = ({
  onBack,
  onCodeSent,
}) => {
  const [identifier, setIdentifier] = useState('');
  const [identifierError, setIdentifierError] = useState('');
  const [loading, setLoading] = useState(false);

  const validateIdentifier = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^(\+228|00228)?[0-9]{8}$/;
    return emailRegex.test(value) || phoneRegex.test(value.replace(/\s/g, ''));
  };

  const handleSendCode = async () => {
    setIdentifierError('');

    if (!identifier) {
      setIdentifierError('Email ou numéro de téléphone requis');
      return;
    }

    if (!validateIdentifier(identifier)) {
      setIdentifierError('Email ou numéro de téléphone invalide');
      return;
    }

    setLoading(true);

    // TODO: Appel API au backend NestJS
    // const response = await fetch('YOUR_API_URL/auth/forgot-password', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ identifier }),
    // });

    setTimeout(() => {
      setLoading(false);
      onCodeSent(identifier);
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
          <View style={styles.iconContainer}>
            <LinearGradient
              colors={[COLORS.primary, COLORS.secondary]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.iconGradient}
            >
              <Ionicons name="lock-closed" size={40} color={COLORS.white} />
            </LinearGradient>
          </View>
          <Text style={styles.title}>Mot de passe oublié ?</Text>
          <Text style={styles.subtitle}>
            Entrez votre email ou numéro de téléphone pour recevoir un code de réinitialisation
          </Text>
        </View>

        {/* Form */}
        <View style={styles.form}>
          <Input
            label="Email ou Téléphone"
            placeholder="exemple@email.com ou +228 XX XX XX XX"
            value={identifier}
            onChangeText={setIdentifier}
            error={identifierError}
            icon="mail-outline"
            keyboardType="default"
            autoCapitalize="none"
          />

          <Button
            title="Envoyer le code"
            onPress={handleSendCode}
            loading={loading}
            fullWidth
            style={styles.sendButton}
          />
        </View>

        {/* Info */}
        <View style={styles.infoBox}>
          <Ionicons name="information-circle-outline" size={20} color={COLORS.primary} />
          <Text style={styles.infoText}>
            Vous recevrez un code à 6 chiffres par SMS ou email selon votre choix
          </Text>
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
    lineHeight: 24,
    paddingHorizontal: SIZES.md,
  },
  form: {
    marginBottom: SIZES.xl,
  },
  sendButton: {
    marginTop: SIZES.md,
  },
  infoBox: {
    flexDirection: 'row',
    backgroundColor: COLORS.primary + '10',
    padding: SIZES.md,
    borderRadius: SIZES.radiusMd,
    gap: SIZES.sm,
  },
  infoText: {
    flex: 1,
    fontSize: SIZES.caption,
    color: COLORS.primary,
    lineHeight: 18,
  },
});
