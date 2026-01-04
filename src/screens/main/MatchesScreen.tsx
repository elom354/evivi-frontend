// src/screens/main/MatchesScreen.tsx
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
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

interface Match {
  id: number;
  name: string;
  age: number;
  image: string;
  date: 'today' | 'yesterday';
  isNew?: boolean;
}

const matches: Match[] = [
  {
    id: 1,
    name: 'Leilani',
    age: 19,
    image: 'https://randomuser.me/api/portraits/women/1.jpg',
    date: 'today',
  },
  {
    id: 2,
    name: 'Annabelle',
    age: 20,
    image: 'https://randomuser.me/api/portraits/women/2.jpg',
    date: 'today',
  },
  {
    id: 3,
    name: 'Reagan',
    age: 24,
    image: 'https://randomuser.me/api/portraits/women/3.jpg',
    date: 'today',
  },
  {
    id: 4,
    name: 'Hadley',
    age: 25,
    image: 'https://randomuser.me/api/portraits/women/4.jpg',
    date: 'today',
  },
  {
    id: 5,
    name: 'Sophia',
    age: 22,
    image: 'https://randomuser.me/api/portraits/women/5.jpg',
    date: 'yesterday',
    isNew: true,
  },
  {
    id: 6,
    name: 'Emma',
    age: 23,
    image: 'https://randomuser.me/api/portraits/women/6.jpg',
    date: 'yesterday',
  },
];

export default function MatchesScreen() {
  const todayMatches = matches.filter((m) => m.date === 'today');
  const yesterdayMatches = matches.filter((m) => m.date === 'yesterday');

  return (
    <SafeAreaContainer style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerTitle}>Matchs</Text>
          <Text style={styles.headerSubtitle}>
            Voici la liste des personnes qui vous ont aimé et vos matchs.
          </Text>
        </View>
        <TouchableOpacity style={styles.sortButton} activeOpacity={0.7}>
          <Ionicons name="swap-vertical-outline" size={20} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Section Aujourd'hui */}
        {todayMatches.length > 0 && (
          <>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionLine} />
              <Text style={styles.sectionTitle}>Aujourd'hui</Text>
              <View style={styles.sectionLine} />
            </View>
            <View style={styles.grid}>
              {todayMatches.map((match) => (
                <TouchableOpacity
                  key={match.id}
                  style={styles.matchCard}
                  activeOpacity={0.9}
                >
                  <Image
                    source={{ uri: match.image }}
                    style={styles.matchImage}
                  />
                  <LinearGradient
                    colors={['transparent', 'rgba(0,0,0,0.8)']}
                    style={styles.gradientOverlay}
                  >
                    <Text style={styles.matchName}>
                      {match.name}, {match.age}
                    </Text>
                  </LinearGradient>
                  <View style={styles.matchActions}>
                    <TouchableOpacity style={styles.actionBtn}>
                      <Ionicons
                        name="close"
                        size={18}
                        color={COLORS.textSecondary}
                      />
                    </TouchableOpacity>
                    <View style={styles.actionDivider} />
                    <TouchableOpacity style={[styles.actionBtn, styles.likeBtn]}>
                      <Ionicons name="heart" size={18} color={COLORS.white} />
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </>
        )}

        {/* Section Hier */}
        {yesterdayMatches.length > 0 && (
          <>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionLine} />
              <Text style={styles.sectionTitle}>Hier</Text>
              <View style={styles.sectionLine} />
            </View>
            <View style={styles.grid}>
              {yesterdayMatches.map((match) => (
                <TouchableOpacity
                  key={match.id}
                  style={styles.matchCard}
                  activeOpacity={0.9}
                >
                  <Image
                    source={{ uri: match.image }}
                    style={styles.matchImage}
                  />
                  {match.isNew && (
                    <View style={styles.newBadge}>
                      <Ionicons name="heart" size={16} color={COLORS.white} />
                    </View>
                  )}
                  <LinearGradient
                    colors={['transparent', 'rgba(0,0,0,0.8)']}
                    style={styles.gradientOverlay}
                  >
                    <Text style={styles.matchName}>
                      {match.name}, {match.age}
                    </Text>
                  </LinearGradient>
                  <View style={styles.matchActions}>
                    <TouchableOpacity style={styles.actionBtn}>
                      <Ionicons
                        name="close"
                        size={18}
                        color={COLORS.textSecondary}
                      />
                    </TouchableOpacity>
                    <View style={styles.actionDivider} />
                    <TouchableOpacity style={[styles.actionBtn, styles.likeBtn]}>
                      <Ionicons name="heart" size={18} color={COLORS.white} />
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: SIZES.lg,
    paddingTop: SIZES.md,
    paddingBottom: SIZES.sm,
  },
  headerTextContainer: {
    flex: 1,
    marginRight: SIZES.md,
  },
  headerTitle: {
    fontSize: SIZES.h2,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SIZES.xs,
  },
  headerSubtitle: {
    fontSize: SIZES.caption,
    color: COLORS.textSecondary,
    lineHeight: 20,
  },
  sortButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: COLORS.gray[100],
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    padding: SIZES.lg,
    paddingBottom: 120,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: SIZES.lg,
  },
  sectionLine: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.gray[200],
  },
  sectionTitle: {
    fontSize: SIZES.body,
    color: COLORS.text,
    marginHorizontal: SIZES.md,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: SIZES.md,
  },
  matchCard: {
    width: '48%',
    marginBottom: SIZES.lg,
    borderRadius: SIZES.radiusLg,
    overflow: 'hidden',
    ...SHADOWS.medium,
    position: 'relative',
  },
  matchImage: {
    width: '100%',
    height: 240,
    backgroundColor: COLORS.gray[200],
  },
  gradientOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: SIZES.md,
    paddingTop: 40,
  },
  matchName: {
    color: COLORS.white,
    fontSize: SIZES.body,
    fontWeight: 'bold',
  },
  matchActions: {
    position: 'absolute',
    bottom: SIZES.sm,
    right: SIZES.sm,
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: SIZES.radiusMd,
    padding: SIZES.xs,
    gap: SIZES.xs,
  },
  actionBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionDivider: {
    width: 1,
    backgroundColor: COLORS.gray[300],
    marginHorizontal: SIZES.xs,
  },
  likeBtn: {
    backgroundColor: COLORS.primary,
  },
  newBadge: {
    position: 'absolute',
    top: SIZES.sm,
    right: SIZES.sm,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.primary,
    borderWidth: 2,
    borderColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
});

