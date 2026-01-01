import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Button, IconButton, Input, Toast } from "../../components/common";
import { COLORS, SIZES } from "../../constants/theme";
import AuthService from "../../services/auth/auth.service";
import { useToast } from "../../hooks/useToast";

interface RegisterScreenProps {
  onRegisterSuccess: (phone: string, userId: string) => void;
  onNavigateToLogin: () => void;
  onBack: () => void;
}

export const RegisterScreen: React.FC<RegisterScreenProps> = ({
  onRegisterSuccess,
  onNavigateToLogin,
  onBack,
}) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [nameError, setNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const [loading, setLoading] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);

  const { toast, showToast, hideToast } = useToast();

  const validatePhone = (phone: string) => {
    const phoneRegex = /^(\+228|00228)?[0-9]{8}$/;
    return phoneRegex.test(phone.replace(/\s/g, ""));
  };

  const handleRegister = async () => {
    setNameError("");
    setPhoneError("");
    setPasswordError("");
    setConfirmPasswordError("");

    let isValid = true;

    if (!name || name.length < 2) {
      setNameError("Le nom doit contenir au moins 2 caractères");
      isValid = false;
    }

    if (!phone) {
      setPhoneError("Le numéro de téléphone est requis");
      isValid = false;
    } else if (!validatePhone(phone)) {
      setPhoneError("Numéro de téléphone invalide (ex: +228 XX XX XX XX)");
      isValid = false;
    }

    if (!password) {
      setPasswordError("Le mot de passe est requis");
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError("Le mot de passe doit contenir au moins 6 caractères");
      isValid = false;
    }

    if (!confirmPassword) {
      setConfirmPasswordError("Veuillez confirmer votre mot de passe");
      isValid = false;
    } else if (password !== confirmPassword) {
      setConfirmPasswordError("Les mots de passe ne correspondent pas");
      isValid = false;
    }

    if (!acceptTerms) {
      showToast("Veuillez accepter les conditions d'utilisation", "warning");
      return;
    }

    if (!isValid) return;

    setLoading(true);

    try {
      const response = await AuthService.register({
        fullName: name,
        phone: phone,
        phoneCountryCode: "+228",
        password: password,
        otpMethod: "sms",
      });

      setLoading(false);
      showToast("Inscription réussie ! Vérifiez votre téléphone.", "success");

      setTimeout(() => {
        onRegisterSuccess(phone, response.user._id || "");
      }, 1500);
    } catch (error: any) {
      setLoading(false);
      showToast(
        error.message || "Une erreur est survenue lors de l'inscription",
        "error"
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
        <View style={styles.header}>
          <Text style={styles.title}>Créer un compte</Text>
          <Text style={styles.subtitle}>
            Rejoignez des milliers de célibataires
          </Text>
        </View>

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
            placeholder="Créez un mot de passe"
            value={password}
            onChangeText={setPassword}
            error={passwordError}
            icon="lock-closed-outline"
            isPassword
            autoCapitalize="none"
          />

          <Input
            label="Confirmer le mot de passe"
            placeholder="Confirmez votre mot de passe"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            error={confirmPasswordError}
            icon="lock-closed-outline"
            isPassword
            autoCapitalize="none"
          />

          <TouchableOpacity
            style={styles.termsContainer}
            onPress={() => setAcceptTerms(!acceptTerms)}
            activeOpacity={0.7}
          >
            <View
              style={[styles.checkbox, acceptTerms && styles.checkboxActive]}
            >
              {acceptTerms ? (
                <Ionicons name="checkmark" size={16} color={COLORS.white} />
              ) : null}
            </View>
            <View style={styles.termsTextContainer}>
              <Text style={styles.termsText}>
                J'accepte les <Text style={styles.termsLink}>conditions d'utilisation</Text> et la <Text style={styles.termsLink}>politique de confidentialité</Text>
              </Text>
            </View>
          </TouchableOpacity>

          <Button
            title="Créer mon compte"
            onPress={handleRegister}
            loading={loading}
            fullWidth
            style={styles.registerButton}
          />
        </View>

        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>Vous avez déjà un compte ? </Text>
          <TouchableOpacity onPress={onNavigateToLogin}>
            <Text style={styles.loginLink}>Se connecter</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  backButton: {
    position: "absolute",
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
    alignItems: "center",
    marginBottom: SIZES.xl,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: COLORS.text,
    marginBottom: SIZES.xs,
  },
  subtitle: {
    fontSize: SIZES.body,
    color: COLORS.textSecondary,
    textAlign: "center",
  },
  form: {
    marginBottom: SIZES.lg,
  },
  termsContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: SIZES.lg,
    marginTop: SIZES.xs,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: SIZES.radiusSm,
    borderWidth: 2,
    borderColor: COLORS.gray[300],
    justifyContent: "center",
    alignItems: "center",
    marginRight: SIZES.sm,
    marginTop: 2,
  },
  checkboxActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  termsTextContainer: {
    flex: 1,
  },
  termsText: {
    fontSize: SIZES.caption,
    color: COLORS.textSecondary,
    lineHeight: 20,
  },
  termsLink: {
    color: COLORS.primary,
    fontWeight: "600",
  },
  registerButton: {
    marginTop: SIZES.sm,
  },
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: SIZES.md,
  },
  loginText: {
    fontSize: SIZES.body,
    color: COLORS.textSecondary,
  },
  loginLink: {
    fontSize: SIZES.body,
    color: COLORS.primary,
    fontWeight: "700",
  },
});
