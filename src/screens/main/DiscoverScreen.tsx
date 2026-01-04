// src/screens/main/DiscoverScreen.tsx
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaContainer, ScreenHeader } from '../../components/layout';
import { COLORS, SHADOWS, SIZES } from '../../constants/theme';

// Image de Jessica Parker
const PROFILE_IMAGE_URI =
  'https://images.pexels.com/photos/16966922/pexels-photo-16966922/free-photo-of-woman-posing-in-sunglasses-in-black-and-white.jpeg';

export default function DiscoverScreen() {
  return (
    <SafeAreaContainer style={styles.container} edges={['top']}>
      {/* Header avec titre et sous-titre */}
      <View style={styles.headerContainer}>
        <View style={[styles.headerButton, styles.headerButtonEmpty]} />

        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>Découvrir</Text>
          <Text style={styles.headerSubtitle}>Chicago, IL</Text>
        </View>

        <TouchableOpacity style={styles.headerButton} activeOpacity={0.7}>
          <Ionicons name="options-outline" size={20} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      {/* Carte de profil principale */}
      <TouchableOpacity
        style={styles.cardContainer}
        activeOpacity={0.95}
        onPress={() => {
          // TODO: Navigate to ProfileDetailScreen
        }}
      >
        <ImageBackground
          source={{ uri: PROFILE_IMAGE_URI }}
          style={styles.card}
          imageStyle={styles.cardImage}
          resizeMode="cover"
        >
          {/* Badge de distance en haut à gauche */}
          <View style={styles.distanceBadge}>
            <Ionicons name="location" size={12} color={COLORS.white} />
            <Text style={styles.distanceText}>1 km</Text>
          </View>

          {/* Gradient overlay en bas avec infos */}
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.7)', 'rgba(0,0,0,0.9)']}
            style={styles.gradientOverlay}
          >
            <Text style={styles.profileName}>Jessica Parker, 23</Text>
            <Text style={styles.profileJob}>Mannequin professionnel</Text>
          </LinearGradient>
        </ImageBackground>
      </TouchableOpacity>

      {/* Boutons d'action */}
      <View style={styles.actionsContainer}>
        <TouchableOpacity
          style={[styles.actionButton, styles.passButton]}
          activeOpacity={0.8}
        >
          <Ionicons name="close" size={28} color="#FF6B35" />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, styles.likeButton]}
          activeOpacity={0.8}
        >
          <Ionicons name="heart" size={32} color={COLORS.white} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, styles.superLikeButton]}
          activeOpacity={0.8}
        >
          <Ionicons name="star" size={24} color="#8B5CF6" />
        </TouchableOpacity>
      </View>
    </SafeAreaContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SIZES.lg,
    paddingTop: SIZES.md,
    paddingBottom: SIZES.sm,
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: COLORS.gray[100],
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerButtonEmpty: {
    backgroundColor: 'transparent',
  },
  headerTitleContainer: {
    alignItems: 'center',
    flex: 1,
  },
  headerTitle: {
    fontSize: SIZES.h3,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  headerSubtitle: {
    fontSize: SIZES.caption,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  cardContainer: {
    height: '65%',
    marginHorizontal: SIZES.lg,
    marginTop: SIZES.md,
    marginBottom: SIZES.sm,
  },
  card: {
    width: '100%',
    height: '100%',
    borderRadius: SIZES.radiusXl,
    overflow: 'hidden',
    ...SHADOWS.large,
  },
  cardImage: {
    borderRadius: SIZES.radiusXl,
  },
  distanceBadge: {
    position: 'absolute',
    top: SIZES.md,
    left: SIZES.md,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: SIZES.sm,
    paddingVertical: SIZES.xs,
    borderRadius: SIZES.radiusFull,
    gap: SIZES.xs,
    zIndex: 10,
  },
  distanceText: {
    color: COLORS.white,
    fontSize: SIZES.caption,
    fontWeight: '600',
  },
  gradientOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: SIZES.lg,
    paddingTop: SIZES.xl,
  },
  profileName: {
    fontSize: SIZES.h2,
    fontWeight: 'bold',
    color: COLORS.white,
    marginBottom: SIZES.xs,
  },
  profileJob: {
    fontSize: SIZES.body,
    color: COLORS.white,
    opacity: 0.95,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: SIZES.xl,
    paddingBottom: SIZES.xl,
    paddingHorizontal: SIZES.lg,
  },
  actionButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    ...SHADOWS.medium,
  },
  passButton: {
    backgroundColor: COLORS.white,
  },
  likeButton: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: COLORS.primary,
  },
  superLikeButton: {
    backgroundColor: COLORS.white,
  },
});

