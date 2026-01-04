// src/screens/main/ProfileDetailScreen.tsx
// Cette page s'affiche lorsqu'on clique sur une carte dans DiscoverScreen
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaContainer } from '../../components/layout';
import { COLORS, SHADOWS, SIZES } from '../../constants/theme';

const galleryImages = [
  'https://images.pexels.com/photos/16966922/pexels-photo-16966922/free-photo-of-woman-posing-in-sunglasses-in-black-and-white.jpeg',
  'https://images.pexels.com/photos/16966923/pexels-photo-16966923/free-photo-of-woman-posing-in-sunglasses-in-black-and-white.jpeg',
  'https://images.pexels.com/photos/16966924/pexels-photo-16966924/free-photo-of-woman-posing-in-sunglasses-in-black-and-white.jpeg',
  'https://images.pexels.com/photos/16966925/pexels-photo-16966925/free-photo-of-woman-posing-in-sunglasses-in-black-and-white.jpeg',
  'https://images.pexels.com/photos/16966926/pexels-photo-16966926/free-photo-of-woman-posing-in-sunglasses-in-black-and-white.jpeg',
];

const interests = [
  { name: 'Voyage', selected: true },
  { name: 'Livres', selected: true },
  { name: 'Musique', selected: false },
  { name: 'Danse', selected: false },
  { name: 'Mannequinat', selected: false },
];

interface ProfileDetailScreenProps {
  onBack?: () => void;
}

export default function ProfileDetailScreen({
  onBack,
}: ProfileDetailScreenProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [readMore, setReadMore] = useState(false);

  const aboutText =
    'Je m\'appelle Jessica Parker et j\'aime rencontrer de nouvelles personnes et trouver des moyens de les aider à vivre une expérience positive. J\'aime lire..';

  return (
    <SafeAreaContainer style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Image principale avec navigation */}
        <View style={styles.mainImageContainer}>
          <Image
            source={{ uri: galleryImages[currentImageIndex] }}
            style={styles.mainImage}
            resizeMode="cover"
          />
          <TouchableOpacity
            style={[styles.navButton, styles.navButtonLeft]}
            onPress={() =>
              setCurrentImageIndex(
                currentImageIndex > 0 ? currentImageIndex - 1 : galleryImages.length - 1,
              )
            }
            activeOpacity={0.7}
          >
            <Ionicons name="chevron-back" size={24} color={COLORS.white} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.navButton, styles.navButtonRight]}
            onPress={() =>
              setCurrentImageIndex(
                currentImageIndex < galleryImages.length - 1
                  ? currentImageIndex + 1
                  : 0,
              )
            }
            activeOpacity={0.7}
          >
            <Ionicons name="chevron-forward" size={24} color={COLORS.white} />
          </TouchableOpacity>

          {/* Bouton retour en haut */}
          {onBack && (
            <TouchableOpacity
              style={styles.backButton}
              onPress={onBack}
              activeOpacity={0.7}
            >
              <Ionicons name="chevron-back" size={24} color={COLORS.white} />
            </TouchableOpacity>
          )}

          {/* Boutons d'action */}
          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={[styles.actionButton, styles.passButton]}
              activeOpacity={0.8}
            >
              <Ionicons name="close" size={24} color="#FF6B35" />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionButton, styles.likeButton]}
              activeOpacity={0.8}
            >
              <Ionicons name="heart" size={28} color={COLORS.white} />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionButton, styles.superLikeButton]}
              activeOpacity={0.8}
            >
              <Ionicons name="star" size={20} color="#8B5CF6" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Informations du profil */}
        <View style={styles.profileInfo}>
          <View style={styles.nameRow}>
            <Text style={styles.profileName}>Jessica Parker, 23</Text>
            <TouchableOpacity style={styles.messageButton} activeOpacity={0.7}>
              <Ionicons name="paper-plane" size={18} color={COLORS.primary} />
            </TouchableOpacity>
          </View>
          <Text style={styles.profileJob}>Mannequin professionnel</Text>

          {/* Localisation */}
          <View style={styles.locationRow}>
            <Text style={styles.locationLabel}>Localisation</Text>
            <TouchableOpacity style={styles.distanceButton} activeOpacity={0.7}>
              <Ionicons name="location" size={14} color={COLORS.primary} />
              <Text style={styles.distanceText}>1 km</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.locationText}>Chicago, IL États-Unis</Text>

          {/* À propos */}
          <View style={styles.aboutSection}>
            <Text style={styles.sectionTitle}>À propos</Text>
            <Text style={styles.aboutText}>
              {readMore ? aboutText : aboutText.substring(0, 100)}
            </Text>
            <TouchableOpacity
              onPress={() => setReadMore(!readMore)}
              activeOpacity={0.7}
            >
              <Text style={styles.readMoreText}>
                {readMore ? 'Lire moins' : 'Lire plus'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Intérêts */}
          <View style={styles.interestsSection}>
            <Text style={styles.sectionTitle}>Intérêts</Text>
            <View style={styles.interestsContainer}>
              {interests.map((interest, index) => (
                <View
                  key={index}
                  style={[
                    styles.interestTag,
                    interest.selected && styles.interestTagSelected,
                  ]}
                >
                  {interest.selected && (
                    <Ionicons
                      name="checkmark"
                      size={14}
                      color={COLORS.primary}
                      style={styles.interestCheck}
                    />
                  )}
                  <Text
                    style={[
                      styles.interestText,
                      interest.selected && styles.interestTextSelected,
                    ]}
                  >
                    {interest.name}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          {/* Galerie */}
          <View style={styles.gallerySection}>
            <View style={styles.galleryHeader}>
              <Text style={styles.sectionTitle}>Galerie</Text>
              <TouchableOpacity activeOpacity={0.7}>
                <Text style={styles.seeAllText}>Voir tout</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.galleryGrid}>
              {galleryImages.slice(0, 5).map((image, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.galleryImageContainer}
                  activeOpacity={0.8}
                  onPress={() => setCurrentImageIndex(index)}
                >
                  <Image source={{ uri: image }} style={styles.galleryImage} />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  scrollContent: {
    paddingBottom: 120,
  },
  mainImageContainer: {
    width: '100%',
    height: 500,
    position: 'relative',
  },
  mainImage: {
    width: '100%',
    height: '100%',
  },
  backButton: {
    position: 'absolute',
    top: SIZES.xl,
    left: SIZES.md,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  navButton: {
    position: 'absolute',
    top: '50%',
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  navButtonLeft: {
    left: SIZES.md,
  },
  navButtonRight: {
    right: SIZES.md,
  },
  actionButtons: {
    position: 'absolute',
    bottom: SIZES.lg,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: SIZES.xl,
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
  profileInfo: {
    padding: SIZES.lg,
    backgroundColor: COLORS.white,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: SIZES.xs,
  },
  profileName: {
    fontSize: SIZES.h2,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  messageButton: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: COLORS.gray[100],
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileJob: {
    fontSize: SIZES.body,
    color: COLORS.textSecondary,
    marginBottom: SIZES.md,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: SIZES.xs,
  },
  locationLabel: {
    fontSize: SIZES.h4,
    fontWeight: '600',
    color: COLORS.text,
  },
  distanceButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.gray[100],
    paddingHorizontal: SIZES.sm,
    paddingVertical: SIZES.xs,
    borderRadius: SIZES.radiusSm,
    gap: SIZES.xs,
  },
  distanceText: {
    fontSize: SIZES.caption,
    color: COLORS.primary,
    fontWeight: '600',
  },
  locationText: {
    fontSize: SIZES.body,
    color: COLORS.textSecondary,
    marginBottom: SIZES.lg,
  },
  aboutSection: {
    marginBottom: SIZES.lg,
  },
  sectionTitle: {
    fontSize: SIZES.h4,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SIZES.md,
  },
  aboutText: {
    fontSize: SIZES.body,
    color: COLORS.textSecondary,
    lineHeight: 24,
    marginBottom: SIZES.xs,
  },
  readMoreText: {
    fontSize: SIZES.body,
    color: COLORS.primary,
    fontWeight: '600',
  },
  interestsSection: {
    marginBottom: SIZES.lg,
  },
  interestsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SIZES.sm,
  },
  interestTag: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SIZES.md,
    paddingVertical: SIZES.sm,
    borderRadius: SIZES.radiusFull,
    borderWidth: 1,
    borderColor: COLORS.gray[300],
    backgroundColor: COLORS.white,
  },
  interestTagSelected: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.white,
  },
  interestCheck: {
    marginRight: SIZES.xs,
  },
  interestText: {
    fontSize: SIZES.caption,
    color: COLORS.textSecondary,
  },
  interestTextSelected: {
    color: COLORS.text,
    fontWeight: '500',
  },
  gallerySection: {
    marginBottom: SIZES.lg,
  },
  galleryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SIZES.md,
  },
  seeAllText: {
    fontSize: SIZES.body,
    color: COLORS.primary,
    fontWeight: '600',
  },
  galleryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  galleryImageContainer: {
    width: '31%',
    marginBottom: SIZES.sm,
    borderRadius: SIZES.radiusMd,
    overflow: 'hidden',
    ...SHADOWS.small,
  },
  galleryImage: {
    width: '100%',
    height: 140,
    backgroundColor: COLORS.gray[200],
  },
});

