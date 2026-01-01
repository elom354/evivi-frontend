import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { Button, IconButton } from '../../components/common';
import { COLORS, SIZES, SHADOWS } from '../../constants/theme';

interface OTPVerificationScreenProps {
  onBack: () => void;
  onVerifySuccess: () => void;
  identifier: string;
  purpose: 'registration' | 'forgot-password';
}

export const OTPVerificationScreen: React.FC<OTPVerificationScreenProps> = ({
  onBack,
  onVerifySuccess,
  identifier,
  purpose,
}) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);

  const inputRefs = useRef<TextInput[]>([]);

  useEffect(() => {
    // Timer pour le renvoi du code
    if (resendTimer > 0) {
      const timer = setTimeout(() => {
        setResendTimer(resendTimer - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [resendTimer]);

  const handleOtpChange = (value: string, index: number) => {
    setError('');

    if (value.length > 1) {
      // Si l'utilisateur colle un code complet
      const digits = value.slice(0, 6).split('');
      const newOtp = [...otp];
      digits.forEach((digit, i) => {
        if (i < 6) newOtp[i] = digit;
      });
      setOtp(newOtp);

      // Focus sur le dernier input rempli ou le suivant vide
      const nextIndex = Math.min(digits.length, 5);
      inputRefs.current[nextIndex]?.focus();
      return;
    }

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus sur le prochain input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async () => {
    const otpCode = otp.join('');

    if (otpCode.length !== 6) {
      setError('Veuillez entrer le code à 6 chiffres');
      return;
    }

    setLoading(true);

    // TODO: Appel API au backend NestJS
    // const response = await fetch('YOUR_API_URL/auth/verify-otp', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ identifier, otp: otpCode, purpose }),
    // });

    setTimeout(() => {
      setLoading(false);
      // Simuler la vérification
      if (otpCode === '123456') {
        onVerifySuccess();
      } else {
        setError('Code incorrect. Veuillez réessayer.');
        setOtp(['', '', '', '', '', '']);
        inputRefs.current[0]?.focus();
      }
    }, 1500);
  };

  const handleResendCode = async () => {
    if (!canResend) return;

    setCanResend(false);
    setResendTimer(60);
    setError('');

    // TODO: Appel API pour renvoyer le code
    // await fetch('YOUR_API_URL/auth/resend-otp', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ identifier, purpose }),
    // });
  };

  const getTitle = () => {
    return purpose === 'registration'
      ? 'Vérification du compte'
      : 'Réinitialisation du mot de passe';
  };

  const getSubtitle = () => {
    const maskedIdentifier = identifier.includes('@')
      ? identifier.replace(/(.{2})(.*)(@.*)/, '$1***$3')
      : identifier.replace(/(\+228)(.{2})(.*)(.{2})/, '$1$2***$4');

    return `Entrez le code à 6 chiffres envoyé à ${maskedIdentifier}`;
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
              <Ionicons name="shield-checkmark" size={40} color={COLORS.white} />
            </LinearGradient>
          </View>
          <Text style={styles.title}>{getTitle()}</Text>
          <Text style={styles.subtitle}>{getSubtitle()}</Text>
        </View>

        {/* OTP Input */}
        <View style={styles.otpContainer}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref) => {
                if (ref) inputRefs.current[index] = ref;
              }}
              style={[
                styles.otpInput,
                digit && styles.otpInputFilled,
                error && styles.otpInputError,
              ]}
              value={digit}
              onChangeText={(value) => handleOtpChange(value, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
              keyboardType="number-pad"
              maxLength={1}
              selectTextOnFocus
              autoFocus={index === 0}
            />
          ))}
        </View>

        {error && (
          <View style={styles.errorContainer}>
            <Ionicons name="alert-circle" size={16} color={COLORS.error} />
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}

        {/* Verify Button */}
        <Button
          title="Vérifier"
          onPress={handleVerify}
          loading={loading}
          fullWidth
          style={styles.verifyButton}
        />

        {/* Resend Code */}
        <View style={styles.resendContainer}>
          <Text style={styles.resendText}>
            Vous n'avez pas reçu le code ?{' '}
          </Text>
          {canResend ? (
            <TouchableOpacity onPress={handleResendCode}>
              <Text style={styles.resendLink}>Renvoyer</Text>
            </TouchableOpacity>
          ) : (
            <Text style={styles.resendTimer}>
              Renvoyer dans {resendTimer}s
            </Text>
          )}
        </View>

        {/* Info */}
        <View style={styles.infoBox}>
          <Ionicons name="information-circle-outline" size={20} color={COLORS.primary} />
          <Text style={styles.infoText}>
            Le code est valide pendant 10 minutes. Vérifiez votre dossier spam si vous ne le trouvez pas.
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
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SIZES.lg,
    gap: SIZES.sm,
  },
  otpInput: {
    flex: 1,
    height: 60,
    borderRadius: SIZES.radiusMd,
    borderWidth: 2,
    borderColor: COLORS.gray[200],
    backgroundColor: COLORS.backgroundDark,
    textAlign: 'center',
    fontSize: SIZES.h2,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  otpInputFilled: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.white,
  },
  otpInputError: {
    borderColor: COLORS.error,
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SIZES.xs,
    marginBottom: SIZES.md,
  },
  errorText: {
    fontSize: SIZES.caption,
    color: COLORS.error,
  },
  verifyButton: {
    marginBottom: SIZES.lg,
  },
  resendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SIZES.xl,
  },
  resendText: {
    fontSize: SIZES.body,
    color: COLORS.textSecondary,
  },
  resendLink: {
    fontSize: SIZES.body,
    color: COLORS.primary,
    fontWeight: '700',
  },
  resendTimer: {
    fontSize: SIZES.body,
    color: COLORS.textLight,
    fontWeight: '600',
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
