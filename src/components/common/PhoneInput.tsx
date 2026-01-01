import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from 'react-native';
import { COLORS, SHADOWS, SIZES } from '../../constants/theme';

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

interface PhoneInputProps extends Omit<
  TextInputProps,
  'value' | 'onChangeText'
> {
  label?: string;
  error?: string;
  value: string;
  onChangeText: (value: string) => void;
  onChangeCountry?: (country: Country) => void;
  containerStyle?: any;
}

export const PhoneInput: React.FC<PhoneInputProps> = ({
  label,
  error,
  value,
  onChangeText,
  onChangeCountry,
  containerStyle,
  ...props
}) => {
  const [selectedCountry, setSelectedCountry] = useState<Country>(COUNTRIES[0]);
  const [showCountryPicker, setShowCountryPicker] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const handleSelectCountry = (country: Country) => {
    setSelectedCountry(country);
    onChangeCountry?.(country);
    setShowCountryPicker(false);
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}

      <View
        style={[
          styles.inputContainer,
          isFocused && styles.inputContainerFocused,
          error && styles.inputContainerError,
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
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          placeholderTextColor={COLORS.textLight}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          keyboardType="phone-pad"
          {...props}
        />
      </View>

      {error && <Text style={styles.error}>{error}</Text>}

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
              <Text style={styles.modalTitle}>Select Country</Text>
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
                  onPress={() => handleSelectCountry(item)}
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
    marginBottom: SIZES.md,
  },
  label: {
    fontSize: SIZES.caption,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SIZES.xs,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 56,
    backgroundColor: COLORS.gray[100],
    borderRadius: SIZES.radiusLg,
    borderWidth: 1,
    borderColor: 'transparent',
    paddingHorizontal: SIZES.md,
  },
  inputContainerFocused: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.white,
    ...SHADOWS.small,
  },
  inputContainerError: {
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
  input: {
    flex: 1,
    fontSize: SIZES.body,
    color: COLORS.text,
  },
  error: {
    fontSize: SIZES.small,
    color: COLORS.error,
    marginTop: SIZES.xs,
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
