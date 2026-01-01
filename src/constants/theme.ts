export const COLORS = {
  // Couleurs principales de l'app - Rouge/Rose moderne
  primary: "#ff5757", // Rouge principal
  secondary: "#FF6B88",
  accent: "#ff5757",
  primaryLight: "#FFE5E9", // Rose très clair pour les backgrounds
  primaryDark: "#C73A56", // Rouge plus foncé

  // Backgrounds
  background: "#FFFFFF",
  backgroundDark: "#F8F9FA",
  card: "#FFFFFF",

  // Text
  text: "#1A1A1A",
  textSecondary: "#6B7280",
  textLight: "#9CA3AF",

  // States
  success: "#10B981",
  error: "#EF4444",
  warning: "#F59E0B",

  // Neutrals
  white: "#FFFFFF",
  black: "#000000",
  gray: {
    50: "#F9FAFB",
    100: "#F3F4F6",
    200: "#E5E7EB",
    300: "#D1D5DB",
    400: "#9CA3AF",
    500: "#6B7280",
    600: "#4B5563",
    700: "#374151",
    800: "#1F2937",
    900: "#111827",
  },

  // Onboarding colors (from design)
  onboarding: {
    slide1: "#B8A07E", // Beige/Gold
    slide2: "#E8A587", // Peach/Coral
    slide3: "#C8953E", // Gold/Yellow
  },

  // Overlay
  overlay: "rgba(0, 0, 0, 0.5)",
};

export const SIZES = {
  // Spacing
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 40,

  // Font sizes
  h1: 32,
  h2: 28,
  h3: 24,
  h4: 20,
  body: 16,
  caption: 14,
  small: 12,

  // Border radius
  radiusXs: 4,
  radiusSm: 8,
  radiusMd: 12,
  radiusLg: 16,
  radiusXl: 24,
  radiusFull: 9999,

  // Dimensions
  buttonHeight: 56,
  inputHeight: 52,
  headerHeight: 60,
  tabBarHeight: 70,
};

export const FONTS = {
  regular: "System",
  medium: "System",
  bold: "System",
  semiBold: "System",
};

export const SHADOWS = {
  small: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    // Web-specific shadow
    boxShadow: "0px 2px 3px rgba(0, 0, 0, 0.1)",
  },
  medium: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
    // Web-specific shadow
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.15)",
  },
  large: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
    // Web-specific shadow
    boxShadow: "0px 8px 12px rgba(0, 0, 0, 0.2)",
  },
};
