import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES, SHADOWS } from '../../constants/theme';

interface IconButtonProps {
  icon: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
  size?: number;
  color?: string;
  backgroundColor?: string;
  style?: ViewStyle;
  disabled?: boolean;
}

export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  onPress,
  size = 24,
  color = COLORS.text,
  backgroundColor = COLORS.white,
  style,
  disabled = false,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
      style={[
        styles.container,
        { backgroundColor },
        disabled && styles.disabled,
        style,
      ]}
    >
      <Ionicons name={icon} size={size} color={color} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 48,
    height: 48,
    borderRadius: SIZES.radiusFull,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.small,
  },
  disabled: {
    opacity: 0.5,
  },
});
