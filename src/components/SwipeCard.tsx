// components/SwipeCard.tsx
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { COLORS, SHADOWS, SIZES } from '../constants/theme';

// Image principale de Jessica Parker (celle avec lunettes rondes sur fond sombre)
const JESSICA_IMAGE_URI =
  'https://images.pexels.com/photos/16966922/pexels-photo-16966922/free-photo-of-woman-posing-in-sunglasses-in-black-and-white.jpeg';

export default function SwipeCard() {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={{ uri: JESSICA_IMAGE_URI }}
        style={styles.card}
        imageStyle={styles.cardImage}
        resizeMode="cover"
      >
        {/* Gradient overlay pour meilleure lisibilité */}
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.3)', 'rgba(0,0,0,0.8)']}
          style={styles.gradientOverlay}
        >
          {/* Distance badge moderne */}
          <View style={styles.distanceBadge}>
            <Ionicons name="location" size={14} color={COLORS.white} />
            <Text style={styles.distanceText}>1 km</Text>
          </View>

          {/* Info container avec design moderne */}
          <View style={styles.infoContainer}>
            <View style={styles.nameRow}>
              <Text style={styles.name}>Jessica Parker</Text>
              <Text style={styles.age}>, 23</Text>
            </View>
            <View style={styles.jobRow}>
              <Ionicons
                name="briefcase-outline"
                size={14}
                color={COLORS.white}
              />
              <Text style={styles.job}>Professional model</Text>
            </View>
            <View style={styles.interestsRow}>
              <View style={styles.interestBadge}>
                <Text style={styles.interestText}>🎨 Art</Text>
              </View>
              <View style={styles.interestBadge}>
                <Text style={styles.interestText}>✈️ Travel</Text>
              </View>
              <View style={styles.interestBadge}>
                <Text style={styles.interestText}>🎵 Music</Text>
              </View>
            </View>
          </View>
        </LinearGradient>
      </ImageBackground>

      {/* Boutons d'action avec design moderne */}
      <View style={styles.actions}>
        <TouchableOpacity
          style={[styles.actionBtn, styles.nopeBtn]}
          activeOpacity={0.8}
        >
          <Ionicons name="close" size={28} color={COLORS.error} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionBtn, styles.likeBtn]}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={[COLORS.primary, COLORS.secondary]}
            style={styles.likeBtnGradient}
          >
            <Ionicons name="heart" size={32} color={COLORS.white} />
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionBtn, styles.starBtn]}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={['#A78BFA', '#8B5CF6']}
            style={styles.starBtnGradient}
          >
            <Ionicons name="star" size={24} color={COLORS.white} />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingBottom: SIZES.xl,
  },
  card: {
    flex: 1,
    justifyContent: 'flex-end',
    borderRadius: SIZES.radiusXl,
    overflow: 'hidden',
    ...SHADOWS.large,
  },
  cardImage: {
    borderRadius: SIZES.radiusXl,
  },
  gradientOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: SIZES.lg,
  },
  distanceBadge: {
    position: 'absolute',
    top: SIZES.lg,
    right: SIZES.lg,
    backgroundColor: 'rgba(0,0,0,0.6)',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SIZES.md,
    paddingVertical: SIZES.xs,
    borderRadius: SIZES.radiusFull,
    gap: SIZES.xs,
  },
  distanceText: {
    color: COLORS.white,
    fontWeight: '600',
    fontSize: SIZES.caption,
  },
  infoContainer: {
    paddingTop: SIZES.lg,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: SIZES.xs,
  },
  name: {
    fontSize: SIZES.h1,
    color: COLORS.white,
    fontWeight: 'bold',
  },
  age: {
    fontSize: SIZES.h3,
    color: COLORS.white,
    fontWeight: '600',
    opacity: 0.9,
  },
  jobRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SIZES.xs,
    marginBottom: SIZES.md,
  },
  job: {
    fontSize: SIZES.body,
    color: COLORS.white,
    opacity: 0.95,
  },
  interestsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SIZES.xs,
    marginTop: SIZES.sm,
  },
  interestBadge: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: SIZES.sm,
    paddingVertical: SIZES.xs,
    borderRadius: SIZES.radiusFull,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  interestText: {
    color: COLORS.white,
    fontSize: SIZES.caption,
    fontWeight: '500',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: SIZES.xl,
    marginTop: SIZES.xl,
    marginBottom: SIZES.xxl,
    paddingHorizontal: SIZES.lg,
  },
  actionBtn: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.medium,
  },
  nopeBtn: {
    backgroundColor: COLORS.white,
  },
  likeBtn: {
    width: 72,
    height: 72,
    borderRadius: 36,
  },
  likeBtnGradient: {
    width: '100%',
    height: '100%',
    borderRadius: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  starBtn: {
    width: 56,
    height: 56,
    borderRadius: 28,
  },
  starBtnGradient: {
    width: '100%',
    height: '100%',
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
