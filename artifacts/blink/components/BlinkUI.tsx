import { Feather, Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { useColors } from '@/hooks/useColors';
import type { Meetup, Person, Place } from '@/data/mockData';

export function Brand() {
  const colors = useColors();
  return <Text style={[styles.brand, { color: colors.foreground }]}>blink<Text style={{ color: colors.primary }}>.</Text></Text>;
}

export function IconButton({ icon, label, onPress }: { icon: keyof typeof Ionicons.glyphMap; label: string; onPress: () => void }) {
  const colors = useColors();
  return <Pressable testID={label} accessibilityLabel={label} onPress={onPress} style={({ pressed }) => [styles.iconButton, { backgroundColor: colors.card, borderColor: colors.border, opacity: pressed ? 0.7 : 1 }]}><Ionicons name={icon} size={21} color={colors.foreground} /></Pressable>;
}

export function Avatar({ initials, accent, size = 48 }: { initials: string; accent: string; size?: number }) {
  const colors = useColors();
  return <View style={[styles.avatar, { width: size, height: size, borderRadius: size / 2, backgroundColor: accent, borderColor: colors.background }]}><Text style={[styles.avatarText, { color: colors.foreground, fontSize: size * 0.33 }]}>{initials}</Text></View>;
}

export function Section({ title, action, onAction }: { title: string; action?: string; onAction?: () => void }) {
  const colors = useColors();
  return <View style={styles.sectionHead}><Text style={[styles.sectionTitle, { color: colors.foreground }]}>{title}</Text>{action ? <Pressable onPress={onAction} hitSlop={10}><Text style={[styles.sectionAction, { color: colors.primary }]}>{action}</Text></Pressable> : null}</View>;
}

export function Chip({ label, icon, active, onPress }: { label: string; icon?: string; active?: boolean; onPress: () => void }) {
  const colors = useColors();
  return <Pressable onPress={onPress} style={({ pressed }) => [styles.chip, { backgroundColor: active ? colors.foreground : colors.card, borderColor: active ? colors.foreground : colors.border, opacity: pressed ? 0.72 : 1 }]}>{icon ? <Feather name={icon as keyof typeof Feather.glyphMap} size={14} color={active ? colors.background : colors.mutedForeground} /> : null}<Text style={[styles.chipText, { color: active ? colors.background : colors.foreground }]}>{label}</Text></Pressable>;
}

export function PersonCard({ person, onPress }: { person: Person; onPress: () => void }) {
  const colors = useColors();
  return <Pressable onPress={onPress} style={({ pressed }) => [styles.personCard, { backgroundColor: colors.card, borderColor: colors.border, opacity: pressed ? 0.8 : 1 }]}><View style={styles.personTop}><View><Avatar initials={person.initials} accent={person.accent} /><View style={[styles.online, { backgroundColor: colors.primary, borderColor: colors.card }]} /></View><View style={styles.personCopy}><Text style={[styles.personName, { color: colors.foreground }]}>{person.name}</Text><Text style={[styles.personMood, { color: colors.primary }]}>{person.mood}</Text></View><Ionicons name="arrow-up" size={17} color={colors.mutedForeground} /></View><Text style={[styles.personBio, { color: colors.mutedForeground }]} numberOfLines={2}>{person.bio}</Text><View style={styles.personFoot}><Text style={[styles.small, { color: colors.mutedForeground }]}>{person.distance} away</Text><Text style={[styles.intent, { color: colors.accentForeground, backgroundColor: colors.accent }]}>{person.intent}</Text></View></Pressable>;
}

export function MeetupCard({ item, joined, onJoin, onOpen, compact = false }: { item: Meetup; joined: boolean; onJoin: () => void; onOpen?: () => void; compact?: boolean }) {
  const colors = useColors();
  return <View style={[compact ? styles.meetupCompact : styles.meetup, { backgroundColor: item.accent }]}>{item.image ? <Image source={item.image} style={styles.meetupImage} /> : null}<View style={styles.meetupInner}><View style={styles.rowBetween}><Text style={[styles.live, { color: item.isLive ? colors.destructive : colors.foreground }]}>{item.isLive ? '●  LIVE NOW' : item.time.toUpperCase()}</Text><Pressable testID={'join-' + item.id} onPress={onJoin} style={({ pressed }) => [styles.join, { backgroundColor: joined ? colors.foreground : colors.card, opacity: pressed ? 0.7 : 1 }]}><Text style={[styles.joinText, { color: joined ? colors.background : colors.foreground }]}>{joined ? 'Joined' : 'Join'}</Text></Pressable></View><Pressable onPress={onOpen}><Text style={[styles.meetupTitle, { color: colors.foreground }]} numberOfLines={2}>{item.title}</Text><Text style={[styles.meetupMeta, { color: colors.foreground }]}><Feather name="map-pin" size={12} />  {item.location} · {item.distance}</Text></Pressable><View style={styles.rowBetween}><Text style={[styles.small, { color: colors.foreground }]}>{item.participants} going · {item.intent}</Text><Ionicons name="arrow-up" size={17} color={colors.foreground} /></View></View></View>;
}

export function PlaceCard({ item, saved, onSave, onPress }: { item: Place; saved: boolean; onSave: () => void; onPress: () => void }) {
  const colors = useColors();
  return <Pressable onPress={onPress} style={({ pressed }) => [styles.placeCard, { backgroundColor: colors.card, borderColor: colors.border, opacity: pressed ? 0.82 : 1 }]}><View style={[styles.placeImage, { backgroundColor: item.accent }]}>{item.image ? <Image source={item.image} style={styles.placeImage} /> : <Feather name="map-pin" size={28} color={colors.foreground} />}<Pressable testID={'save-' + item.id} onPress={onSave} style={[styles.save, { backgroundColor: colors.card }]}><Ionicons name={saved ? 'bookmark' : 'bookmark-outline'} size={17} color={saved ? colors.primary : colors.foreground} /></Pressable></View><View style={styles.placeCopy}><Text style={[styles.placeName, { color: colors.foreground }]} numberOfLines={1}>{item.name}</Text><Text style={[styles.small, { color: colors.mutedForeground }]}>{item.category} · {item.distance}</Text><View style={styles.rowBetween}><Text style={[styles.small, { color: colors.foreground }]}><Ionicons name="star" size={11} color={colors.primary} /> {item.rating}</Text><Text style={[styles.activity, { color: colors.primary }]}>{item.activity}</Text></View></View></Pressable>;
}

export function Label({ children }: { children: React.ReactNode }) {
  const colors = useColors();
  return <Text style={[styles.label, { color: colors.primary, backgroundColor: colors.muted }]}>{children}</Text>;
}

const styles = StyleSheet.create({
  brand: { fontFamily: 'Inter_700Bold', fontSize: 30, letterSpacing: -1.5 },
  iconButton: { width: 42, height: 42, borderRadius: 21, alignItems: 'center', justifyContent: 'center', borderWidth: 1 },
  avatar: { alignItems: 'center', justifyContent: 'center', borderWidth: 2 },
  avatarText: { fontFamily: 'Inter_700Bold' },
  online: { width: 11, height: 11, borderRadius: 6, borderWidth: 2, position: 'absolute', right: -1, bottom: 1 },
  sectionHead: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 13, paddingRight: 20 },
  sectionTitle: { fontFamily: 'Inter_700Bold', fontSize: 19, letterSpacing: -0.4 },
  sectionAction: { fontFamily: 'Inter_600SemiBold', fontSize: 13 },
  chip: { flexDirection: 'row', alignItems: 'center', gap: 7, borderWidth: 1, borderRadius: 19, paddingHorizontal: 13, paddingVertical: 10, marginRight: 8 },
  chipText: { fontFamily: 'Inter_600SemiBold', fontSize: 12 },
  personCard: { width: 245, minHeight: 164, borderRadius: 22, borderWidth: 1, padding: 15, marginRight: 11 },
  personTop: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 11 },
  personCopy: { flex: 1 },
  personName: { fontFamily: 'Inter_700Bold', fontSize: 14 },
  personMood: { fontFamily: 'Inter_600SemiBold', fontSize: 12, marginTop: 3 },
  personBio: { fontFamily: 'Inter_400Regular', fontSize: 12, lineHeight: 17, minHeight: 34 },
  personFoot: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 13 },
  small: { fontFamily: 'Inter_500Medium', fontSize: 11 },
  intent: { fontFamily: 'Inter_600SemiBold', fontSize: 10, borderRadius: 9, paddingHorizontal: 8, paddingVertical: 5, overflow: 'hidden' },
  meetup: { width: 302, minHeight: 190, borderRadius: 25, marginRight: 12, overflow: 'hidden' },
  meetupCompact: { minHeight: 165, borderRadius: 22, marginBottom: 12, overflow: 'hidden' },
  meetupImage: { width: '100%', height: 100 },
  meetupInner: { padding: 16, flex: 1 },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 8 },
  live: { fontFamily: 'Inter_700Bold', fontSize: 10, letterSpacing: 0.7 },
  join: { paddingHorizontal: 13, paddingVertical: 8, borderRadius: 16 },
  joinText: { fontFamily: 'Inter_700Bold', fontSize: 12 },
  meetupTitle: { fontFamily: 'Inter_700Bold', fontSize: 21, lineHeight: 24, letterSpacing: -0.6, marginTop: 22 },
  meetupMeta: { fontFamily: 'Inter_500Medium', fontSize: 11, marginTop: 9, marginBottom: 16 },
  placeCard: { width: 205, borderRadius: 20, borderWidth: 1, overflow: 'hidden', marginRight: 12 },
  placeImage: { height: 116, width: '100%', alignItems: 'center', justifyContent: 'center' },
  save: { position: 'absolute', right: 10, top: 10, width: 32, height: 32, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
  placeCopy: { padding: 13 },
  placeName: { fontFamily: 'Inter_700Bold', fontSize: 14, marginBottom: 4 },
  activity: { fontFamily: 'Inter_600SemiBold', fontSize: 10, maxWidth: 115, textAlign: 'right' },
  label: { fontFamily: 'Inter_700Bold', fontSize: 10, letterSpacing: 0.5, paddingHorizontal: 8, paddingVertical: 5, borderRadius: 8, overflow: 'hidden', alignSelf: 'flex-start' },
});