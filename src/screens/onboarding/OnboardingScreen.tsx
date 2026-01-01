import { LinearGradient } from "expo-linear-gradient";
import React, { useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Button } from "../../components/common";
import { ONBOARDING_SLIDES } from "../../constants/data";
import { COLORS, SIZES } from "../../constants/theme";
import { OnboardingSlide } from "../../types";

const { width, height } = Dimensions.get("window");

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

  const renderItem = ({ item }: { item: OnboardingSlide }) => (
    <View style={styles.slide}>
      <View style={styles.imageContainer}>
        {/* Placeholder pour l'image - tu ajouteras les vraies images */}
        <View
          style={[
            styles.imagePlaceholder,
            { backgroundColor: item.backgroundColor },
          ]}
        >
          <Text style={styles.imagePlaceholderText}>Image {item.id}</Text>
        </View>
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </View>
  );

  const Paginator = () => {
    return (
      <View style={styles.paginatorContainer}>
        {ONBOARDING_SLIDES.map((_, i) => {
          const inputRange = [(i - 1) * width, i * width, (i + 1) * width];

          const dotWidth = scrollX.interpolate({
            inputRange,
            outputRange: [10, 30, 10],
            extrapolate: "clamp",
          });

          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.3, 1, 0.3],
            extrapolate: "clamp",
          });

          return (
            <Animated.View
              style={[styles.dot, { width: dotWidth, opacity }]}
              key={i.toString()}
            />
          );
        })}
      </View>
    );
  };

  return (
    <View style={styles.container}>
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
          { useNativeDriver: false }
        )}
        onViewableItemsChanged={viewableItemsChanged}
        viewabilityConfig={viewConfig}
        ref={slidesRef}
      />

      <View style={styles.footer}>
        <Paginator />
        <Button
          title={
            currentIndex === ONBOARDING_SLIDES.length - 1
              ? "Commencer"
              : "Suivant"
          }
          onPress={scrollTo}
          fullWidth
          style={styles.button}
        />
        {currentIndex < ONBOARDING_SLIDES.length - 1 && (
          <Button
            title="Passer"
            onPress={onFinish}
            variant="ghost"
            fullWidth
            style={styles.skipButton}
          />
        )}
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
    height,
  },
  imageContainer: {
    flex: 0.6,
    justifyContent: "center",
    alignItems: "center",
  },
  imagePlaceholder: {
    width: width * 0.8,
    height: width * 0.8,
    borderRadius: SIZES.radiusXl,
    justifyContent: "center",
    alignItems: "center",
  },
  imagePlaceholderText: {
    color: COLORS.white,
    fontSize: SIZES.h2,
    fontWeight: "bold",
  },
  contentContainer: {
    flex: 0.4,
    paddingHorizontal: SIZES.xl,
  },
  title: {
    fontSize: SIZES.h2,
    fontWeight: "bold",
    color: COLORS.text,
    textAlign: "center",
    marginBottom: SIZES.md,
  },
  description: {
    fontSize: SIZES.body,
    color: COLORS.textSecondary,
    textAlign: "center",
    lineHeight: 24,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: SIZES.xl,
    paddingBottom: SIZES.xxl,
  },
  paginatorContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: SIZES.lg,
  },
  dot: {
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.primary,
    marginHorizontal: SIZES.xs / 2,
  },
  button: {
    marginBottom: SIZES.md,
  },
  skipButton: {
    marginTop: SIZES.xs,
  },
});
