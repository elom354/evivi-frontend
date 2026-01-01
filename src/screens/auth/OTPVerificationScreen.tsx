import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { IconButton } from "../../components/common";
import { COLORS, SIZES } from "../../constants/theme";

interface OTPVerificationScreenProps {
  onBack: () => void;
  onVerifySuccess: () => void;
  identifier: string;
  purpose: "registration" | "forgot-password";
}

export const OTPVerificationScreen: React.FC<OTPVerificationScreenProps> = ({
  onBack,
  onVerifySuccess,
  identifier,
  purpose,
}) => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

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
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
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
      const digits = value.slice(0, 4).split("");
      const newOtp = [...otp];
      digits.forEach((digit, i) => {
        if (i < 4) newOtp[i] = digit;
      });
      setOtp(newOtp);
      const nextIndex = Math.min(digits.length, 3);
      setActiveIndex(nextIndex);
      inputRefs.current[nextIndex]?.focus();
      return;
    }

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 3) {
      setActiveIndex(index + 1);
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-vérifier quand les 4 chiffres sont remplis
    if (value && index === 3) {
      const fullCode = [...newOtp.slice(0, 3), value].join("");
      if (fullCode.length === 4) {
        handleVerify(fullCode);
      }
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === "Backspace" && !otp[index] && index > 0) {
      setActiveIndex(index - 1);
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleFocus = (index: number) => {
    setActiveIndex(index);
  };

  const handleVerify = async (code?: string) => {
    const otpCode = code || otp.join("");

    if (otpCode.length !== 4) {
      return;
    }

    setLoading(true);

    // TODO: Appel API
    setTimeout(() => {
      setLoading(false);
      if (otpCode === "1234") {
        onVerifySuccess();
      } else {
        shakeInputs();
        setOtp(["", "", "", ""]);
        setActiveIndex(0);
        inputRefs.current[0]?.focus();
      }
    }, 1000);
  };

  const handleResendCode = async () => {
    if (!canResend) return;
    setCanResend(false);
    setResendTimer(60);
    setOtp(["", "", "", ""]);
    setActiveIndex(0);
    inputRefs.current[0]?.focus();
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        {/* Back Button */}
        <View style={styles.backButton}>
          <TouchableOpacity
            style={styles.backButtonTouchable}
            onPress={onBack}
            activeOpacity={0.7}
          >
            <Ionicons name="chevron-back" size={24} color={COLORS.text} />
          </TouchableOpacity>
        </View>

        {/* Timer */}
        <View style={styles.timerContainer}>
          <Text style={styles.timer}>{formatTime(resendTimer)}</Text>
        </View>

        {/* Content */}
        <View style={styles.content}>
          <Text style={styles.title}>Tapez le code de vérification</Text>
          <Text style={styles.subtitle}>que nous vous avons envoyé</Text>

          {/* OTP Inputs */}
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

        {/* Resend */}
        <TouchableOpacity
          onPress={handleResendCode}
          disabled={!canResend}
          style={styles.resendButton}
        >
          <Text
            style={[styles.resendText, !canResend && styles.resendTextDisabled]}
          >
            Renvoyer
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
    position: "absolute",
    top: SIZES.xxl + 10,
    left: SIZES.md,
    zIndex: 10,
  },
  backButtonTouchable: {
    width: 40,
    height: 40,
    borderRadius: SIZES.radiusMd,
    backgroundColor: COLORS.gray[100],
    justifyContent: "center",
    alignItems: "center",
  },
  timerContainer: {
    alignItems: "center",
    marginTop: SIZES.xxl + 60,
    marginBottom: SIZES.xl,
  },
  timer: {
    fontSize: 48,
    fontWeight: "bold",
    color: COLORS.text,
    letterSpacing: 2,
  },
  content: {
    paddingHorizontal: SIZES.xl,
    alignItems: "center",
    marginBottom: SIZES.xl,
  },
  title: {
    fontSize: SIZES.h3,
    fontWeight: "600",
    color: COLORS.text,
    textAlign: "center",
    marginBottom: SIZES.xs,
  },
  subtitle: {
    fontSize: SIZES.body,
    color: COLORS.textSecondary,
    textAlign: "center",
    marginBottom: SIZES.xxl,
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: SIZES.md,
    marginBottom: SIZES.xxl,
  },
  otpInputWrapper: {
    width: 70,
    height: 70,
    borderRadius: SIZES.radiusLg,
    backgroundColor: COLORS.gray[100],
    borderWidth: 2,
    borderColor: COLORS.gray[200],
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
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
    fontSize: 32,
    fontWeight: "bold",
    color: COLORS.white,
    textAlign: "center",
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  placeholder: {
    fontSize: 32,
    fontWeight: "bold",
    color: COLORS.gray[300],
    position: "absolute",
  },
  resendButton: {
    alignSelf: "center",
    paddingVertical: SIZES.md,
    marginBottom: SIZES.xl,
  },
  resendText: {
    fontSize: SIZES.body,
    color: COLORS.primary,
    fontWeight: "600",
  },
  resendTextDisabled: {
    color: COLORS.textLight,
  },
});
