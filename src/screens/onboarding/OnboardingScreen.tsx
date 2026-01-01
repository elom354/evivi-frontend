import { StatusBar } from 'expo-status-bar';
import React, { useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Button } from '../../components/common';
import { ONBOARDING_SLIDES } from '../../constants/data';
import { COLORS, SHADOWS, SIZES } from '../../constants/theme';
import { OnboardingSlide } from '../../types';

const { width, height } = Dimensions.get('window');

interface OnboardingScreenProps {
  onFinish: () => void;
}

export const OnboardingScreen: React.FC<OnboardingScreenProps> = ({
  onFinish,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef<FlatList>(null);

  const viewableItemsChanged = useRef(({ viewableItems }: any) => {
    setCurrentIndex(viewableItems[0]?.index || 0);
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const scrollTo = () => {
    if (currentIndex < ONBOARDING_SLIDES.length - 1) {
      slidesRef.current?.scrollToIndex({ index: currentIndex + 1 });
    } else {
      onFinish();
    }
  };

  const renderItem = ({
    item,
    index,
  }: {
    item: OnboardingSlide;
    index: number;
  }) => {
    const inputRange = [
      (index - 1) * width,
      index * width,
      (index + 1) * width,
    ];

    const scale = scrollX.interpolate({
      inputRange,
      outputRange: [0.85, 1, 0.85],
      extrapolate: 'clamp',
    });

    const opacity = scrollX.interpolate({
      inputRange,
      outputRange: [0.5, 1, 0.5],
      extrapolate: 'clamp',
    });

    return (
      <View style={styles.slide}>
        {/* Image Card with parallax effect */}
        <Animated.View
          style={[
            styles.imageCard,
            {
              transform: [{ scale }],
              opacity,
            },
          ]}
        >
          {item.image ? (
            <Image
              source={item.image}
              style={styles.image}
              resizeMode="cover"
            />
          ) : (
            <View
              style={[
                styles.imagePlaceholder,
                { backgroundColor: item.backgroundColor },
              ]}
            >
              <View style={styles.placeholderContent} />
            </View>
          )}
        </Animated.View>

        {/* Content */}
        <View style={styles.contentContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description}>{item.description}</Text>
        </View>
      </View>
    );
  };

  const Paginator = () => {
    return (
      <View style={styles.paginatorContainer}>
        {ONBOARDING_SLIDES.map((_, i) => {
          const inputRange = [(i - 1) * width, i * width, (i + 1) * width];

          const dotOpacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.3, 1, 0.3],
            extrapolate: 'clamp',
          });

          const dotScale = scrollX.interpolate({
            inputRange,
            outputRange: [0.8, 1.2, 0.8],
            extrapolate: 'clamp',
          });

          return (
            <Animated.View
              style={[
                styles.dot,
                {
                  opacity: dotOpacity,
                  transform: [{ scale: dotScale }],
                  backgroundColor:
                    i === currentIndex ? COLORS.primary : COLORS.gray[300],
                },
              ]}
              key={i.toString()}
            />
          );
        })}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      <FlatList
        data={ONBOARDING_SLIDES}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        bounces={false}
        keyExtractor={(item) => item.id}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false },
        )}
        onViewableItemsChanged={viewableItemsChanged}
        viewabilityConfig={viewConfig}
        ref={slidesRef}
        scrollEventThrottle={32}
      />

      {/* Footer */}
      <View style={styles.footer}>
        <Paginator />

        <Button
          title={
            currentIndex === ONBOARDING_SLIDES.length - 1
              ? 'Créer un compte'
              : 'Suivant'
          }
          onPress={scrollTo}
          fullWidth
          style={styles.createButton}
        />

        <View style={styles.signInContainer}>
          <Text style={styles.signInText}>Vous avez déjà un compte ? </Text>
          <TouchableOpacity onPress={onFinish}>
            <Text style={styles.signInLink}>Se connecter</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  slide: {
    width,
    alignItems: 'center',
    paddingTop: SIZES.xxl + 20,
  },
  imageCard: {
    width: width * 0.75,
    height: height * 0.45,
    borderRadius: SIZES.radiusXl,
    marginBottom: SIZES.xl,
    overflow: 'hidden',
    ...SHADOWS.medium,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imagePlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderContent: {
    width: '80%',
    height: '80%',
    borderRadius: SIZES.radiusLg,
  },
  contentContainer: {
    paddingHorizontal: SIZES.xxl,
    alignItems: 'center',
    marginBottom: SIZES.xl,
  },
  title: {
    fontSize: SIZES.h1,
    fontWeight: 'bold',
    color: COLORS.primary,
    textAlign: 'center',
    marginBottom: SIZES.md,
  },
  description: {
    fontSize: SIZES.body,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: SIZES.xl,
    paddingBottom: SIZES.xxl + 20,
    backgroundColor: COLORS.white,
  },
  paginatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SIZES.xl,
    gap: SIZES.sm,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  createButton: {
    marginBottom: SIZES.md,
  },
  signInContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signInText: {
    fontSize: SIZES.body,
    color: COLORS.textSecondary,
  },
  signInLink: {
    fontSize: SIZES.body,
    color: COLORS.primary,
    fontWeight: '700',
  },
});
