import { Feather, Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { router } from 'expo-router';
import React from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Avatar, Brand } from '@/components/BlinkUI';
import { useColors } from '@/hooks/useColors';

export function Screen({ children, scroll = true }: { children: React.ReactNode; scroll?: boolean }) {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const content = <View style={[styles.content, { paddingTop: insets.top + 12, paddingBottom: insets.bottom + 28 }]}>{children}</View>;
  return scroll ? <ScrollView style={{ flex: 1, backgroundColor: colors.background }} showsVerticalScrollIndicator={false}>{content}</ScrollView> : <View style={[styles.screen, { backgroundColor: colors.background }]}>{content}</View>;
}

export function TopBar({ eyebrow, title, right }: { eyebrow?: string; title?: string; right?: React.ReactNode }) {
  const colors = useColors();
  return <View style={styles.topBar}><Pressable accessibilityLabel="Go back" onPress={() => { Haptics.selectionAsync(); router.back(); }} style={[styles.back, { backgroundColor: colors.card, borderColor: colors.border }]}><Ionicons name="arrow-back" size={19} color={colors.foreground} /></Pressable><View style={styles.topCopy}>{eyebrow ? <Text style={[styles.eyebrow, { color: colors.primary }]}>{eyebrow}</Text> : null}{title ? <Text style={[styles.topTitle, { color: colors.foreground }]}>{title}</Text> : <Brand />}</View>{right ?? <View style={{ width: 42 }} />}</View>;
}

export function TapButton({ label, icon, onPress, secondary = false, compact = false }: { label: string; icon?: keyof typeof Ionicons.glyphMap; onPress: () => void; secondary?: boolean; compact?: boolean }) {
  const colors = useColors();
  return <Pressable accessibilityLabel={label} onPress={() => { Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); onPress(); }} style={({ pressed }) => [styles.button, compact && styles.buttonCompact, { backgroundColor: secondary ? colors.card : colors.primary, borderColor: secondary ? colors.border : colors.primary, opacity: pressed ? 0.75 : 1 }]}>{icon ? <Ionicons name={icon} size={compact ? 15 : 17} color={secondary ? colors.foreground : colors.primaryForeground} /> : null}<Text style={[styles.buttonText, { color: secondary ? colors.foreground : colors.primaryForeground }]}>{label}</Text></Pressable>;
}

export function SoftCard({ children, accent, style }: { children: React.ReactNode; accent?: string; style?: object }) {
  const colors = useColors();
  return <View style={[styles.card, { backgroundColor: accent ?? colors.card, borderColor: colors.border }, style]}>{children}</View>;
}

export function TagCloud({ tags }: { tags: string[] }) {
  const colors = useColors();
  return <View style={styles.tags}>{tags.map((tag) => <View key={tag} style={[styles.tag, { backgroundColor: colors.secondary }]}><Text style={[styles.tagText, { color: colors.secondaryForeground }]}>{tag}</Text></View>)}</View>;
}

export function AvatarStack({ initials, accent = '#f2b5a4', size = 34 }: { initials: string[]; accent?: string; size?: number }) {
  const colors = useColors();
  return <View style={styles.avatarStack}>{initials.slice(0, 5).map((initialsItem, index) => <View key={`${initialsItem}-${index}`} style={{ marginLeft: index ? -9 : 0, zIndex: initials.length - index }}><Avatar initials={initialsItem} accent={index % 2 ? '#b7d7d0' : accent} size={size} /></View>)}</View>;
}

export function MapSnippet({ label = 'Exact location shared after you join' }: { label?: string }) {
  const colors = useColors();
  return <View style={[styles.mapSnippet, { backgroundColor: colors.secondary, borderColor: colors.border }]}><View style={[styles.mapRoad, styles.mapRoadOne, { backgroundColor: colors.card }]} /><View style={[styles.mapRoad, styles.mapRoadTwo, { backgroundColor: colors.card }]} /><View style={[styles.mapPin, { backgroundColor: colors.primary, borderColor: colors.card }]}><Feather name="map-pin" size={15} color={colors.primaryForeground} /></View><View style={[styles.mapLabel, { backgroundColor: colors.card }]}><Feather name="lock" size={11} color={colors.mutedForeground} /><Text style={[styles.mapLabelText, { color: colors.foreground }]}>{label}</Text></View></View>;
}

export function PhotoHero({ image, accent, children }: { image?: any; accent: string; children?: React.ReactNode }) {
  const colors = useColors();
  return <View style={[styles.photoHero, { backgroundColor: accent }]}>{image ? <Image source={image} style={StyleSheet.absoluteFillObject} resizeMode="cover" /> : <View style={[styles.heroOrb, { backgroundColor: colors.card }]} />}{children}</View>;
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  content: { paddingHorizontal: 20 },
  topBar: { minHeight: 48, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 },
  back: { width: 42, height: 42, borderRadius: 21, alignItems: 'center', justifyContent: 'center', borderWidth: 1 },
  topCopy: { flex: 1, alignItems: 'center', paddingHorizontal: 12 },
  eyebrow: { fontFamily: 'Inter_700Bold', fontSize: 10, letterSpacing: 1.2, marginBottom: 3, textAlign: 'center' },
  topTitle: { fontFamily: 'Inter_700Bold', fontSize: 20, letterSpacing: -0.5, textAlign: 'center' },
  card: { borderRadius: 22, borderWidth: 1, padding: 16 },
  button: { minHeight: 48, borderRadius: 17, borderWidth: 1, paddingHorizontal: 17, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 8 },
  buttonCompact: { minHeight: 38, borderRadius: 15, paddingHorizontal: 13 },
  buttonText: { fontFamily: 'Inter_700Bold', fontSize: 12 },
  tags: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  tag: { paddingHorizontal: 11, paddingVertical: 8, borderRadius: 14 },
  tagText: { fontFamily: 'Inter_600SemiBold', fontSize: 11 },
  avatarStack: { flexDirection: 'row', alignItems: 'center' },
  mapSnippet: { height: 155, borderRadius: 20, overflow: 'hidden', borderWidth: 1, position: 'relative' },
  mapRoad: { position: 'absolute', height: 12, borderRadius: 8, opacity: 0.8 },
  mapRoadOne: { width: 330, top: 58, left: -20, transform: [{ rotate: '-22deg' }] },
  mapRoadTwo: { width: 260, top: 100, left: 85, transform: [{ rotate: '30deg' }] },
  mapPin: { position: 'absolute', top: 56, left: '48%', width: 34, height: 34, borderRadius: 17, alignItems: 'center', justifyContent: 'center', borderWidth: 3 },
  mapLabel: { position: 'absolute', bottom: 10, left: 10, right: 10, borderRadius: 12, padding: 9, flexDirection: 'row', alignItems: 'center', gap: 6 },
  mapLabelText: { fontFamily: 'Inter_500Medium', fontSize: 10, flex: 1 },
  photoHero: { height: 252, borderRadius: 26, overflow: 'hidden', justifyContent: 'flex-end', padding: 17, marginBottom: 18 },
  heroOrb: { width: 210, height: 210, borderRadius: 110, position: 'absolute', right: -40, top: -35, opacity: 0.34 },
});