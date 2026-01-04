// src/screens/main/MessagesScreen.tsx
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaContainer } from '../../components/layout';
import { COLORS, SHADOWS, SIZES } from '../../constants/theme';

interface Activity {
  name: string;
  avatar: string;
  hasStory?: boolean;
}

interface Message {
  name: string;
  message: string;
  time: string;
  unread?: number;
  avatar: string;
  isTyping?: boolean;
  isFromMe?: boolean;
}

const activities: Activity[] = [
  {
    name: 'Vous',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    hasStory: true,
  },
  {
    name: 'Emma',
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
    hasStory: true,
  },
  {
    name: 'Ava',
    avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
  },
  {
    name: 'Sophia',
    avatar: 'https://randomuser.me/api/portraits/women/4.jpg',
    hasStory: true,
  },
];

const messages: Message[] = [
  {
    name: 'Emelie',
    message: 'Sticker 😍',
    time: '23 min',
    unread: 1,
    avatar: 'https://randomuser.me/api/portraits/women/5.jpg',
  },
  {
    name: 'Abigail',
    message: 'En train de taper...',
    time: '27 min',
    unread: 2,
    avatar: 'https://randomuser.me/api/portraits/women/6.jpg',
    isTyping: true,
  },
  {
    name: 'Elizabeth',
    message: 'Ok, à bientôt.',
    time: '33 min',
    avatar: 'https://randomuser.me/api/portraits/women/7.jpg',
  },
  {
    name: 'Penelope',
    message: 'Vous: Salut! Ça va, ça fait longtemps..',
    time: '50 min',
    avatar: 'https://randomuser.me/api/portraits/women/8.jpg',
    isFromMe: true,
  },
  {
    name: 'Chloe',
    message: 'Vous: Bonjour, comment allez-vous?',
    time: '55 min',
    avatar: 'https://randomuser.me/api/portraits/women/9.jpg',
    isFromMe: true,
  },
  {
    name: 'Grace',
    message: 'Vous: Super, j\'écrirai plus tard',
    time: '1 heure',
    avatar: 'https://randomuser.me/api/portraits/women/10.jpg',
    isFromMe: true,
  },
];

export default function MessagesScreen() {
  return (
    <SafeAreaContainer style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Messages</Text>
        <TouchableOpacity style={styles.filterButton} activeOpacity={0.7}>
          <Ionicons name="options-outline" size={20} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      {/* Barre de recherche */}
      <View style={styles.searchContainer}>
        <Ionicons
          name="search"
          size={20}
          color={COLORS.textSecondary}
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Rechercher"
          placeholderTextColor={COLORS.textLight}
        />
      </View>

      {/* Section Activités */}
      <View style={styles.activitiesSection}>
        <Text style={styles.sectionTitle}>Activités</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.activitiesContent}
        >
          {activities.map((activity, index) => (
            <TouchableOpacity
              key={index}
              style={styles.activityItem}
              activeOpacity={0.8}
            >
              <View style={styles.activityAvatarContainer}>
                {activity.hasStory ? (
                  <LinearGradient
                    colors={['#FF6B9D', '#C44569']}
                    style={styles.activityGradient}
                  >
                    <View style={styles.activityAvatarInner}>
                      <Image
                        source={{ uri: activity.avatar }}
                        style={styles.activityAvatar}
                      />
                    </View>
                  </LinearGradient>
                ) : (
                  <View style={styles.activityAvatarInner}>
                    <Image
                      source={{ uri: activity.avatar }}
                      style={styles.activityAvatar}
                    />
                  </View>
                )}
              </View>
              <Text style={styles.activityName}>{activity.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Section Messages */}
      <View style={styles.messagesSection}>
        <Text style={styles.sectionTitle}>Messages</Text>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.messagesContent}
        >
          {messages.map((msg, index) => (
            <TouchableOpacity
              key={index}
              style={styles.messageItem}
              activeOpacity={0.7}
            >
              <View style={styles.avatarContainer}>
                <Image source={{ uri: msg.avatar }} style={styles.avatar} />
                {msg.unread && msg.unread > 0 && (
                  <View style={styles.unreadBadge}>
                    <Text style={styles.unreadText}>{msg.unread}</Text>
                  </View>
                )}
              </View>
              <View style={styles.messageContent}>
                <View style={styles.messageHeader}>
                  <Text style={styles.messageName}>{msg.name}</Text>
                  <Text style={styles.messageTime}>{msg.time}</Text>
                </View>
                <Text
                  style={[
                    styles.messageText,
                    msg.unread && msg.unread > 0 && styles.messageTextUnread,
                    msg.isFromMe && styles.messageTextFromMe,
                  ]}
                  numberOfLines={1}
                >
                  {msg.isTyping ? (
                    <Text style={styles.typingText}>En train de taper...</Text>
                  ) : (
                    msg.message
                  )}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
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
    alignItems: 'center',
    paddingHorizontal: SIZES.lg,
    paddingTop: SIZES.md,
    paddingBottom: SIZES.sm,
  },
  headerTitle: {
    fontSize: SIZES.h2,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  filterButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: COLORS.gray[100],
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.gray[50],
    marginHorizontal: SIZES.lg,
    marginVertical: SIZES.md,
    paddingHorizontal: SIZES.md,
    borderRadius: SIZES.radiusLg,
    height: 44,
  },
  searchIcon: {
    marginRight: SIZES.sm,
  },
  searchInput: {
    flex: 1,
    fontSize: SIZES.body,
    color: COLORS.text,
  },
  activitiesSection: {
    marginBottom: SIZES.md,
  },
  sectionTitle: {
    fontSize: SIZES.h4,
    fontWeight: 'bold',
    paddingHorizontal: SIZES.lg,
    marginBottom: SIZES.sm,
    color: COLORS.text,
  },
  activitiesContent: {
    paddingLeft: SIZES.lg,
    paddingRight: SIZES.md,
  },
  activityItem: {
    alignItems: 'center',
    marginRight: SIZES.lg,
  },
  activityAvatarContainer: {
    marginBottom: SIZES.xs,
  },
  activityGradient: {
    padding: 3,
    borderRadius: 35,
  },
  activityAvatarInner: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 3,
    borderColor: COLORS.white,
    overflow: 'hidden',
  },
  activityAvatar: {
    width: '100%',
    height: '100%',
  },
  activityName: {
    fontSize: SIZES.caption,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  messagesSection: {
    flex: 1,
  },
  messagesContent: {
    paddingBottom: 120,
  },
  messageItem: {
    flexDirection: 'row',
    padding: SIZES.md,
    paddingHorizontal: SIZES.lg,
    alignItems: 'center',
  },
  avatarContainer: {
    position: 'relative',
    marginRight: SIZES.md,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: COLORS.gray[200],
  },
  unreadBadge: {
    position: 'absolute',
    right: -2,
    top: -2,
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
    borderWidth: 2,
    borderColor: COLORS.white,
  },
  unreadText: {
    color: COLORS.white,
    fontSize: 10,
    fontWeight: 'bold',
  },
  messageContent: {
    flex: 1,
  },
  messageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  messageName: {
    fontSize: SIZES.body,
    fontWeight: '600',
    color: COLORS.text,
  },
  messageTime: {
    color: COLORS.textSecondary,
    fontSize: SIZES.caption,
  },
  messageText: {
    color: COLORS.textSecondary,
    fontSize: SIZES.caption,
  },
  messageTextUnread: {
    color: COLORS.text,
    fontWeight: '600',
  },
  messageTextFromMe: {
    color: COLORS.textSecondary,
  },
  typingText: {
    color: COLORS.primary,
    fontStyle: 'italic',
  },
});

