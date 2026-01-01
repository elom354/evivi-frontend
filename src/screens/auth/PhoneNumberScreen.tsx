import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Modal,
  FlatList,
  TextInput,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES } from '../../constants/theme';

interface Country {
  code: string;
  dial_code: string;
  flag: string;
  name: string;
}

const COUNTRIES: Country[] = [
  { code: 'US', dial_code: '+1', flag: '🇺🇸', name: 'United States' },
  { code: 'TG', dial_code: '+228', flag: '🇹🇬', name: 'Togo' },
  { code: 'BJ', dial_code: '+229', flag: '🇧🇯', name: 'Bénin' },
  { code: 'CI', dial_code: '+225', flag: '🇨🇮', name: "Côte d'Ivoire" },
  { code: 'GH', dial_code: '+233', flag: '🇬🇭', name: 'Ghana' },
  { code: 'NG', dial_code: '+234', flag: '🇳🇬', name: 'Nigeria' },
  { code: 'SN', dial_code: '+221', flag: '🇸🇳', name: 'Sénégal' },
  { code: 'FR', dial_code: '+33', flag: '🇫🇷', name: 'France' },
];

interface PhoneNumberScreenProps {
  onContinue: (phone: string) => void;
  onBack?: () => void;
}

export const PhoneNumberScreen: React.FC<PhoneNumberScreenProps> = ({
  onContinue,
  onBack,
}) => {
  const [phone, setPhone] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<Country>(COUNTRIES[0]);
  const [showCountryPicker, setShowCountryPicker] = useState(false);
  const [phoneError, setPhoneError] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const formatPhoneNumber = (value: string) => {
    // Remove all non-digits
    const digits = value.replace(/\D/g, '');

    // Format as XXX XXX XXXX
    if (digits.length <= 3) {
      return digits;
    } else if (digits.length <= 6) {
      return `${digits.slice(0, 3)} ${digits.slice(3)}`;
    } else {
      return `${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6, 10)}`;
    }
  };

  const handlePhoneChange = (value: string) => {
    const formatted = formatPhoneNumber(value);
    setPhone(formatted);
    setPhoneError('');
  };

  const validatePhone = () => {
    const digits = phone.replace(/\s/g, '');
    if (!digits || digits.length < 10) {
      setPhoneError('Veuillez entrer un numéro de téléphone valide');
      return false;
    }
    return true;
  };

  const handleContinue = () => {
    if (validatePhone()) {
      const fullPhone = `${selectedCountry.dial_code} ${phone}`;
      onContinue(fullPhone);
    }
  };

  const isButtonActive = phone.replace(/\s/g, '').length >= 10;

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <View style={styles.content}>
          {/* Title */}
          <Text style={styles.title}>Mon mobile</Text>

          {/* Subtitle */}
          <Text style={styles.subtitle}>
            Veuillez entrer votre numéro de téléphone valide. Nous vous
            enverrons un code à 4 chiffres pour vérifier votre compte.
          </Text>

          {/* Phone Input */}
          <View style={styles.phoneInputContainer}>
            <View
              style={[
                styles.inputWrapper,
                isFocused && styles.inputWrapperFocused,
                phoneError && styles.inputWrapperError,
              ]}
            >
              {/* Country Selector */}
              <TouchableOpacity
                style={styles.countrySelector}
                onPress={() => setShowCountryPicker(true)}
                activeOpacity={0.7}
              >
                <Text style={styles.flag}>{selectedCountry.flag}</Text>
                <Text style={styles.dialCode}>{selectedCountry.dial_code}</Text>
                <Ionicons
                  name="chevron-down"
                  size={16}
                  color={COLORS.textSecondary}
                />
              </TouchableOpacity>

              {/* Divider */}
              <View style={styles.divider} />

              {/* Phone Input */}
              <TextInput
                style={styles.phoneInput}
                value={phone}
                onChangeText={handlePhoneChange}
                placeholder="Numéro de téléphone"
                placeholderTextColor={COLORS.textLight}
                keyboardType="phone-pad"
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                autoFocus
              />
            </View>

            {phoneError ? <Text style={styles.error}>{phoneError}</Text> : null}
          </View>

          {/* Continue Button */}
          <TouchableOpacity
            style={[
              styles.continueButton,
              isButtonActive && styles.continueButtonActive,
            ]}
            onPress={handleContinue}
            activeOpacity={0.8}
            disabled={!isButtonActive}
          >
            <Text
              style={[
                styles.continueButtonText,
                isButtonActive && styles.continueButtonTextActive,
              ]}
            >
              Continuer
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>

      {/* Country Picker Modal */}
      <Modal
        visible={showCountryPicker}
        transparent
        animationType="slide"
        onRequestClose={() => setShowCountryPicker(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Sélectionner un pays</Text>
              <TouchableOpacity onPress={() => setShowCountryPicker(false)}>
                <Ionicons name="close" size={24} color={COLORS.text} />
              </TouchableOpacity>
            </View>

            <FlatList
              data={COUNTRIES}
              keyExtractor={(item) => item.code}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.countryItem}
                  onPress={() => {
                    setSelectedCountry(item);
                    setShowCountryPicker(false);
                  }}
                  activeOpacity={0.7}
                >
                  <Text style={styles.countryFlag}>{item.flag}</Text>
                  <Text style={styles.countryName}>{item.name}</Text>
                  <Text style={styles.countryDialCode}>{item.dial_code}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>
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
  content: {
    flex: 1,
    paddingHorizontal: SIZES.xl,
    paddingTop: SIZES.xxl + 40,
    paddingBottom: SIZES.xl,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SIZES.md,
  },
  subtitle: {
    fontSize: SIZES.body,
    color: COLORS.textSecondary,
    lineHeight: 22,
    marginBottom: SIZES.xxl,
  },
  phoneInputContainer: {
    marginBottom: SIZES.xl,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 56,
    backgroundColor: COLORS.gray[100],
    borderRadius: SIZES.radiusLg,
    paddingHorizontal: SIZES.md,
    borderWidth: 1,
    borderColor: COLORS.gray[200],
  },
  inputWrapperFocused: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.white,
  },
  inputWrapperError: {
    borderColor: COLORS.error,
  },
  countrySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SIZES.xs,
    paddingRight: SIZES.sm,
  },
  flag: {
    fontSize: 24,
  },
  dialCode: {
    fontSize: SIZES.body,
    color: COLORS.text,
    fontWeight: '600',
  },
  divider: {
    width: 1,
    height: 24,
    backgroundColor: COLORS.gray[300],
    marginHorizontal: SIZES.md,
  },
  phoneInput: {
    flex: 1,
    fontSize: SIZES.body,
    color: COLORS.text,
  },
  error: {
    fontSize: SIZES.small,
    color: COLORS.error,
    marginTop: SIZES.sm,
  },
  continueButton: {
    height: 56,
    borderRadius: SIZES.radiusLg,
    backgroundColor: COLORS.gray[200],
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: SIZES.xl,
  },
  continueButtonActive: {
    backgroundColor: COLORS.primary,
  },
  continueButtonText: {
    fontSize: SIZES.body,
    fontWeight: '600',
    color: COLORS.textLight,
  },
  continueButtonTextActive: {
    color: COLORS.white,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: SIZES.radiusXl,
    borderTopRightRadius: SIZES.radiusXl,
    maxHeight: '70%',
    paddingBottom: SIZES.xl,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SIZES.lg,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray[200],
  },
  modalTitle: {
    fontSize: SIZES.h4,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  countryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SIZES.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray[100],
  },
  countryFlag: {
    fontSize: 24,
    marginRight: SIZES.md,
  },
  countryName: {
    flex: 1,
    fontSize: SIZES.body,
    color: COLORS.text,
  },
  countryDialCode: {
    fontSize: SIZES.body,
    color: COLORS.textSecondary,
    fontWeight: '600',
  },
});
