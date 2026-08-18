/**
 * Semantic design tokens for the mobile app.
 *
 * These tokens mirror the naming conventions used in web artifacts (index.css)
 * so that multi-artifact projects share a cohesive visual identity.
 *
 * Replace the placeholder values below with values that match the project's
 * brand. If a sibling web artifact exists, read its index.css and convert the
 * HSL values to hex so both artifacts use the same palette.
 *
 * To add dark mode, add a `dark` key with the same token names.
 * The useColors() hook will automatically pick it up.
 */

const colors = {
  light: {
    text: '#17212b',
    tint: '#ff675d',
    background: '#fbfaf6',
    foreground: '#17212b',
    card: '#ffffff',
    cardForeground: '#17212b',
    primary: '#ff675d',
    primaryForeground: '#ffffff',
    secondary: '#eaf2ef',
    secondaryForeground: '#26463c',
    muted: '#f1eee8',
    mutedForeground: '#748086',
    accent: '#e8f2ff',
    accentForeground: '#18528d',
    destructive: '#dc514a',
    destructiveForeground: '#ffffff',
    border: '#e7e2d8',
    input: '#e7e2d8',
  },
  dark: {
    text: '#f8f5ef',
    tint: '#ff8074',
    background: '#101a20',
    foreground: '#f8f5ef',
    card: '#17252d',
    cardForeground: '#f8f5ef',
    primary: '#ff8074',
    primaryForeground: '#182026',
    secondary: '#203b35',
    secondaryForeground: '#d8eee5',
    muted: '#213039',
    mutedForeground: '#a5b4b8',
    accent: '#173754',
    accentForeground: '#cfe8ff',
    destructive: '#f1766d',
    destructiveForeground: '#201413',
    border: '#2e3e45',
    input: '#2e3e45',
  },
  radius: 18,
};

export default colors;
