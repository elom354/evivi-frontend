import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Button, Input } from "../../components/common";
import { COLORS, SHADOWS, SIZES } from "../../constants/theme";

interface LoginScreenProps {
  onLoginSuccess: () => void;
  onNavigateToRegister: () => void;
  onForgotPassword: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({
  onLoginSuccess,
  onNavigateToRegister,
  onForgotPassword
}) => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [identifierError, setIdentifierError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);

  const validateIdentifier = (value: string) => {
    // Vérifier si c'est un email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // Vérifier si c'est un téléphone togolais
    const phoneRegex = /^(\+228|00228)?[0-9]{8}$/;

    return emailRegex.test(value) || phoneRegex.test(value.replace(/\s/g, ""));
  };

  const handleLogin = async () => {
    // Reset errors
    setIdentifierError("");
    setPasswordError("");

    // Validation
    let isValid = true;

    if (!identifier) {
      setIdentifierError("Email ou numéro de téléphone requis");
      isValid = false;
    } else if (!validateIdentifier(identifier)) {
      setIdentifierError("Email ou numéro de téléphone invalide");
      isValid = false;
    }

    if (!password) {
      setPasswordError("Le mot de passe est requis");
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError("Le mot de passe doit contenir au moins 6 caractères");
      isValid = false;
    }

    if (!isValid) return;

    setLoading(true);

    // TODO: Appel API au backend NestJS
    // const response = await fetch('YOUR_API_URL/auth/login', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ identifier, password }),
    // });

    setTimeout(() => {
      setLoading(false);
      onLoginSuccess();
    }, 1500);
  };

  const handleSocialLogin = (provider: string) => {
    console.log(`Login with ${provider}`);
    // Implémenter plus tard
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
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
          <Text style={styles.title}>Bienvenue !</Text>
          <Text style={styles.subtitle}>Connectez-vous pour continuer</Text>
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

          <Input
            label="Mot de passe"
            placeholder="••••••••"
            value={password}
            onChangeText={setPassword}
            error={passwordError}
            icon="lock-closed-outline"
            isPassword
            autoCapitalize="none"
            autoComplete="password"
          />

          <TouchableOpacity
            style={styles.forgotPassword}
            onPress={onForgotPassword}
          >
            <Text style={styles.forgotPasswordText}>Mot de passe oublié ?</Text>
          </TouchableOpacity>

          <Button
            title="Se connecter"
            onPress={handleLogin}
            loading={loading}
            fullWidth
            style={styles.loginButton}
          />
        </View>

        {/* Divider */}
        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>OU</Text>
          <View style={styles.dividerLine} />
        </View>
        {/* Register Link */}
        <View style={styles.registerContainer}>
          <Text style={styles.registerText}>Vous n'avez pas de compte ? </Text>
          <TouchableOpacity onPress={onNavigateToRegister}>
            <Text style={styles.registerLink}>S'inscrire</Text>
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
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: SIZES.xl,
    paddingTop: SIZES.xxl + 20,
    paddingBottom: SIZES.xl,
  },
  header: {
    alignItems: "center",
    marginBottom: SIZES.xxl,
  },
  logoContainer: {
    marginBottom: SIZES.lg,
  },
  logoGradient: {
    width: 80,
    height: 80,
    borderRadius: SIZES.radiusXl,
    justifyContent: "center",
    alignItems: "center",
    ...SHADOWS.medium,
  },
  title: {
    fontSize: SIZES.h1,
    fontWeight: "bold",
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
  forgotPassword: {
    alignSelf: "flex-end",
    marginBottom: SIZES.lg,
  },
  forgotPasswordText: {
    fontSize: SIZES.caption,
    color: COLORS.primary,
    fontWeight: "600",
  },
  loginButton: {
    marginTop: SIZES.sm,
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: SIZES.xl,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.gray[200],
  },
  dividerText: {
    marginHorizontal: SIZES.md,
    fontSize: SIZES.caption,
    color: COLORS.textSecondary,
    fontWeight: "600",
  },
  socialContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: SIZES.md,
    marginBottom: SIZES.xl,
  },
  socialButton: {
    width: 60,
    height: 60,
    borderRadius: SIZES.radiusLg,
    backgroundColor: COLORS.white,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.gray[200],
    ...SHADOWS.small,
  },
  registerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  registerText: {
    fontSize: SIZES.body,
    color: COLORS.textSecondary,
  },
  registerLink: {
    fontSize: SIZES.body,
    color: COLORS.primary,
    fontWeight: "700",
  },
});
