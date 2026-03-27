/**
 * VYTRIXE Adsterra Configuration (Scripts)
 * Centralized registry for ad placement Zone IDs and tokens.
 */

export const ADS_SCRIPTS = {
  // Top Banner (Hero)
  BANNER_TOP: {
    key: "YOUR_ADSTERRA_KEY_HERE",
    format: "728x90",
    id: "adsterra-banner-top",
    minHeight: "90px"
  },

  // Mid Content Banner (SEO Pages)
  BANNER_MID: {
    key: "YOUR_ADSTERRA_KEY_HERE",
    format: "728x90",
    id: "adsterra-banner-mid",
    minHeight: "90px"
  },

  // Bottom Banner (Pre-Footer)
  BANNER_BOTTOM: {
    key: "YOUR_ADSTERRA_KEY_HERE",
    format: "728x90",
    id: "adsterra-banner-bottom",
    minHeight: "90px"
  },

  // Native Ad Block
  NATIVE: {
    key: "YOUR_ADSTERRA_KEY_HERE",
    id: "adsterra-native-block",
    minHeight: "250px"
  },

  // Popunder (Capped 1/24h)
  POPUNDER: {
    key: "YOUR_ADSTERRA_KEY_HERE",
    id: "adsterra-popunder-script"
  }
};

// Global Frequency Config
export const ADS_FREQUENCY = {
  POPUNDER_MS: 24 * 60 * 60 * 1000, // 24 Hours
};
