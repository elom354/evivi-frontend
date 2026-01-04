import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { COLORS } from '../../constants/theme';

interface SafeAreaContainerProps {
  children: React.ReactNode;
  style?: ViewStyle;
  edges?: ('top' | 'bottom' | 'left' | 'right')[];
  backgroundColor?: string;
}

export const SafeAreaContainer: React.FC<SafeAreaContainerProps> = ({
  children,
  style,
  edges = ['top', 'bottom'],
  backgroundColor = COLORS.white,
}) => {
  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor }, style]}
      edges={edges}
    >
      {children}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
