import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS, SIZES } from '../../constants/theme';

interface ScreenHeaderProps {
  title?: string;
  subtitle?: string;
  leftIcon?: keyof typeof Ionicons.glyphMap;
  rightIcon?: keyof typeof Ionicons.glyphMap;
  onLeftPress?: () => void;
  onRightPress?: () => void;
  showBack?: boolean;
  onBack?: () => void;
  style?: ViewStyle;
  transparent?: boolean;
}

export const ScreenHeader: React.FC<ScreenHeaderProps> = ({
  title,
  subtitle,
  leftIcon,
  rightIcon,
  onLeftPress,
  onRightPress,
  showBack = false,
  onBack,
  style,
  transparent = false,
}) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        { paddingTop: insets.top + SIZES.md },
        transparent && styles.transparent,
        style,
      ]}
    >
      <View style={styles.content}>
        {(showBack || leftIcon) && (
          <TouchableOpacity
            style={styles.iconButton}
            onPress={onBack || onLeftPress}
            activeOpacity={0.7}
          >
            <Ionicons
              name={showBack ? 'chevron-back' : leftIcon || 'menu'}
              size={28}
              color={COLORS.text}
            />
          </TouchableOpacity>
        )}

        {title && (
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{title}</Text>
            {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
          </View>
        )}

        {rightIcon && (
          <TouchableOpacity
            style={styles.iconButton}
            onPress={onRightPress}
            activeOpacity={0.7}
          >
            <Ionicons name={rightIcon} size={28} color={COLORS.text} />
          </TouchableOpacity>
        )}

        {!rightIcon && !leftIcon && !showBack && (
          <View style={styles.iconButton} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    paddingHorizontal: SIZES.lg,
    paddingBottom: SIZES.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray[100],
  },
  transparent: {
    backgroundColor: 'transparent',
    borderBottomWidth: 0,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.gray[50],
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 44,
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: SIZES.sm,
    paddingHorizontal: SIZES.xs,
  },
  title: {
    fontSize: SIZES.h3,
    fontWeight: 'bold',
    color: COLORS.text,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: SIZES.caption,
    color: COLORS.textSecondary,
    marginTop: 2,
    textAlign: 'center',
  },
});
