// src/screens/main/HomeTabs.tsx
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS, SHADOWS } from '../../constants/theme';

import DiscoverScreen from './DiscoverScreen';
import MatchesScreen from './MatchesScreen';
import MessagesScreen from './MessagesScreen';
import ProfileScreen from './ProfileScreen';

const Tab = createBottomTabNavigator();

interface HomeTabsProps {
  onLogout?: () => void;
}

export default function HomeTabs({ onLogout }: HomeTabsProps) {
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.textLight,

        // Configuration moderne avec SafeArea
        tabBarStyle: {
          position: 'absolute',
          borderTopWidth: 0,
          backgroundColor: COLORS.white,
          height: 60 + insets.bottom,
          paddingBottom: insets.bottom + 8,
          paddingTop: 8,
          shadowColor: SHADOWS.large.shadowColor,
          shadowOffset: SHADOWS.large.shadowOffset,
          shadowOpacity: SHADOWS.large.shadowOpacity,
          shadowRadius: SHADOWS.large.shadowRadius,
          elevation: SHADOWS.large.elevation,
        },

        tabBarItemStyle: {
          paddingTop: 4,
        },

        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
          marginBottom: 2,
        },

        tabBarIconStyle: {
          marginTop: 4,
        },

        // Empêche React Navigation d'ajouter du padding supplémentaire
        tabBarBackground: () => null,
      }}
    >
      <Tab.Screen
        name="Discover"
        component={DiscoverScreen}
        options={{
          tabBarLabel: 'Découvrir',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name="layers-outline"
              size={26}
              color={focused ? COLORS.primary : color}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Matches"
        component={MatchesScreen}
        options={{
          tabBarLabel: 'Matchs',
          tabBarIcon: ({ color, size, focused }) => (
            <View style={{ position: 'relative' }}>
              <Ionicons
                name={focused ? 'heart' : 'heart-outline'}
                size={26}
                color={focused ? COLORS.primary : color}
              />
              <View
                style={{
                  position: 'absolute',
                  top: -4,
                  right: -4,
                  width: 8,
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: COLORS.primary,
                }}
              />
            </View>
          ),
          tabBarBadge: 11,
          tabBarBadgeStyle: {
            backgroundColor: COLORS.primary,
            fontSize: 10,
            fontWeight: 'bold',
          },
        }}
      />

      <Tab.Screen
        name="Messages"
        component={MessagesScreen}
        options={{
          tabBarLabel: 'Messages',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? 'chatbubbles' : 'chatbubble-outline'}
              size={26}
              color={focused ? COLORS.primary : color}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        options={{
          tabBarLabel: 'Profil',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? 'person' : 'person-outline'}
              size={26}
              color={focused ? COLORS.primary : color}
            />
          ),
        }}
      >
        {() => <ProfileScreen onLogout={onLogout} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}
