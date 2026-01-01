import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Toast } from '../../components/common';
import AuthService from '../../services/auth/auth.service';
import { COLORS, SIZES } from '../../constants/theme';
import { useToast } from '../../hooks/useToast';

interface OTPVerificationScreenProps {
  onBack: () => void;
  onVerifySuccess: () => void;
  identifier: string;
  purpose: 'registration' | 'forgot-password';
  userId: string; // 👈 userId maintenant requis
}

export const OTPVerificationScreen: React.FC<OTPVerificationScreenProps> = ({
  onBack,
  onVerifySuccess,
  identifier,
  purpose,
  userId,
}) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const { toast, showToast, hideToast } = useToast();

  const inputRefs = useRef<TextInput[]>([]);
  const shakeAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => {
        setResendTimer(resendTimer - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [resendTimer]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs
      .toString()
      .padStart(2, '0')}`;
  };

  const shakeInputs = () => {
    Animated.sequence([
      Animated.timing(shakeAnimation, {
        toValue: 10,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: -10,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: 10,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: 0,
        duration: 50,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleOtpChange = (value: string, index: number) => {
    if (value.length > 1) {
      const digits = value.slice(0, 6).split('');
      const newOtp = [...otp];
      digits.forEach((digit, i) => {
        if (i < 6) newOtp[i] = digit;
      });
      setOtp(newOtp);
      const nextIndex = Math.min(digits.length, 5);
      setActiveIndex(nextIndex);
      inputRefs.current[nextIndex]?.focus();
      return;
    }

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      setActiveIndex(index + 1);
      inputRefs.current[index + 1]?.focus();
    }

    if (value && index === 5) {
      const fullCode = [...newOtp.slice(0, 5), value].join('');
      if (fullCode.length === 6) {
        handleVerify(fullCode);
      }
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      setActiveIndex(index - 1);
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleFocus = (index: number) => {
    setActiveIndex(index);
  };

  const handleVerify = async (code?: string) => {
    const otpCode = code || otp.join('');

    if (otpCode.length !== 6) {
      return;
    }

    setLoading(true);

    try {
      const response = await AuthService.verifyOTP({
        userId: userId,
        code: otpCode,
      });

      if (response.accessToken) {
        await AsyncStorage.setItem('accessToken', response.accessToken);
      }

      if (response.refreshToken) {
        await AsyncStorage.setItem('refreshToken', response.refreshToken);
      }

      setLoading(false);
      showToast('Compte vérifié avec succès !', 'success');

      setTimeout(() => {
        onVerifySuccess();
      }, 1500);
    } catch (error: any) {
      setLoading(false);
      shakeInputs();
      setOtp(['', '', '', '', '', '']);
      setActiveIndex(0);
      inputRefs.current[0]?.focus();

      showToast(
        error.message || 'Code de vérification invalide. Veuillez réessayer.',
        'error',
      );
    }
  };

  const handleResendCode = async () => {
    if (!canResend) return;

    setLoading(true);

    try {
      await AuthService.resendOTP(identifier, purpose);

      setCanResend(false);
      setResendTimer(60);
      setOtp(['', '', '', '', '', '']);
      setActiveIndex(0);
      inputRefs.current[0]?.focus();
      setLoading(false);

      showToast('Code renvoyé avec succès !', 'success');
    } catch (error: any) {
      setLoading(false);
      showToast(
        error.message || 'Impossible de renvoyer le code. Veuillez réessayer.',
        'error',
      );
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      <Toast
        visible={toast.visible}
        message={toast.message}
        type={toast.type}
        onHide={hideToast}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <View style={styles.backButton}>
          <TouchableOpacity
            style={styles.backButtonTouchable}
            onPress={onBack}
            activeOpacity={0.7}
          >
            <Ionicons name="chevron-back" size={24} color={COLORS.text} />
          </TouchableOpacity>
        </View>

        <View style={styles.timerContainer}>
          <Text style={styles.timer}>{formatTime(resendTimer)}</Text>
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>Tapez le code de vérification</Text>
          <Text style={styles.subtitle}>Code envoyé au {identifier}</Text>

          <Animated.View
            style={[
              styles.otpContainer,
              { transform: [{ translateX: shakeAnimation }] },
            ]}
          >
            {otp.map((digit, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.otpInputWrapper,
                  digit && styles.otpInputWrapperFilled,
                  activeIndex === index &&
                    !digit &&
                    styles.otpInputWrapperActive,
                ]}
                onPress={() => {
                  setActiveIndex(index);
                  inputRefs.current[index]?.focus();
                }}
                activeOpacity={1}
              >
                <TextInput
                  ref={(ref) => {
                    if (ref) inputRefs.current[index] = ref;
                  }}
                  style={styles.otpInput}
                  value={digit}
                  onChangeText={(value) => handleOtpChange(value, index)}
                  onKeyPress={(e) => handleKeyPress(e, index)}
                  onFocus={() => handleFocus(index)}
                  keyboardType="number-pad"
                  maxLength={1}
                  selectTextOnFocus
                  editable={!loading}
                />
                {!digit && <Text style={styles.placeholder}>0</Text>}
              </TouchableOpacity>
            ))}
          </Animated.View>
        </View>

        <TouchableOpacity
          onPress={handleResendCode}
          disabled={!canResend || loading}
          style={styles.resendButton}
        >
          <Text
            style={[
              styles.resendText,
              (!canResend || loading) && styles.resendTextDisabled,
            ]}
          >
            {loading ? 'Envoi...' : 'Renvoyer'}
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
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
    top: SIZES.xxl + 10,
    left: SIZES.md,
    zIndex: 10,
  },
  backButtonTouchable: {
    width: 40,
    height: 40,
    borderRadius: SIZES.radiusMd,
    backgroundColor: COLORS.gray[100],
    justifyContent: 'center',
    alignItems: 'center',
  },
  timerContainer: {
    alignItems: 'center',
    marginTop: SIZES.xxl + 60,
    marginBottom: SIZES.xl,
  },
  timer: {
    fontSize: 48,
    fontWeight: 'bold',
    color: COLORS.text,
    letterSpacing: 2,
  },
  content: {
    paddingHorizontal: SIZES.xl,
    alignItems: 'center',
    marginBottom: SIZES.xl,
  },
  title: {
    fontSize: SIZES.h3,
    fontWeight: '600',
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: SIZES.xs,
  },
  subtitle: {
    fontSize: SIZES.body,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: SIZES.xxl,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: SIZES.sm,
    marginBottom: SIZES.xxl,
  },
  otpInputWrapper: {
    width: 50,
    height: 60,
    borderRadius: SIZES.radiusLg,
    backgroundColor: COLORS.gray[100],
    borderWidth: 2,
    borderColor: COLORS.gray[200],
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  otpInputWrapperActive: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primaryLight,
  },
  otpInputWrapperFilled: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  otpInput: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.white,
    textAlign: 'center',
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  placeholder: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.gray[300],
    position: 'absolute',
  },
  resendButton: {
    alignSelf: 'center',
    paddingVertical: SIZES.md,
    marginBottom: SIZES.xl,
  },
  resendText: {
    fontSize: SIZES.body,
    color: COLORS.primary,
    fontWeight: '600',
  },
  resendTextDisabled: {
    color: COLORS.textLight,
  },
});
