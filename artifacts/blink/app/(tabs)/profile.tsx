import { Feather } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import React, { useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Switch, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Avatar, Brand, IconButton, Label, PlaceCard, Section } from '@/components/BlinkUI';
import { useBlink } from '@/context/BlinkContext';
import { places } from '@/data/mockData';
import { useColors } from '@/hooks/useColors';

export default function ProfileScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { availability, setAvailability, mood, setMood, savedPlaces } = useBlink();
  const [expanded, setExpanded] = useState(false);
  const moods = ['Open to plans', 'Making things', 'Out exploring', 'Taking it slow'];
  const interests = ['Design', 'Coffee', 'Startups', 'Street photography', 'Live music', 'Good conversations'];
  const saved = places.filter((item) => savedPlaces.includes(item.id));

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingTop: insets.top + 14, paddingBottom: 120 }}>
        <View style={styles.header}><Brand /><IconButton icon="settings-outline" label="Open settings" onPress={() => Alert.alert('Settings', 'Your profile, privacy, and location controls will live here.')} /></View>
        <View style={[styles.profileCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <View style={styles.profileTop}><View><Avatar initials="AR" accent="#f2b5a4" size={76} /><View style={[styles.profileDot, { backgroundColor: availability ? colors.primary : colors.mutedForeground, borderColor: colors.card }]} /></View><View style={{ flex: 1 }}><Text style={[styles.name, { color: colors.foreground }]}>Anika Rao</Text><Text style={[styles.handle, { color: colors.mutedForeground }]}>@anikar · Bengaluru</Text><Text style={[styles.bio, { color: colors.foreground }]}>Designing systems and collecting tiny city stories.</Text></View></View>
          <View style={[styles.availabilityRow, { borderTopColor: colors.border }]}><View style={{ flex: 1 }}><View style={styles.availabilityTitle}><View style={[styles.statusDot, { backgroundColor: availability ? colors.primary : colors.mutedForeground }]} /><Text style={[styles.availabilityText, { color: colors.foreground }]}>{availability ? 'Available to meet nearby' : 'Taking a quiet moment'}</Text></View><Text style={[styles.availabilityBody, { color: colors.mutedForeground }]}>People with a similar energy can find you.</Text></View><Switch testID="availability-toggle" value={availability} onValueChange={(value) => { setAvailability(value); Haptics.selectionAsync(); }} trackColor={{ false: colors.muted, true: colors.primary }} thumbColor={colors.card} /></View>
        </View>
        <View style={styles.section}><Section title="My current mood" /><ScrollView horizontal showsHorizontalScrollIndicator={false}>{moods.map((item) => <Pressable key={item} onPress={() => { setMood(item); Haptics.selectionAsync(); }} style={[styles.moodChip, { backgroundColor: mood === item ? colors.foreground : colors.card, borderColor: mood === item ? colors.foreground : colors.border }]}><Text style={[styles.moodText, { color: mood === item ? colors.background : colors.foreground }]}>{item}</Text></Pressable>)}</ScrollView></View>
        <View style={styles.section}><Section title="My interests" action={expanded ? 'Show less' : 'Edit'} onAction={() => setExpanded((value) => !value)} /><View style={styles.interests}>{(expanded ? interests : interests.slice(0, 4)).map((item) => <View key={item} style={[styles.interest, { backgroundColor: colors.secondary }]}><Text style={[styles.interestText, { color: colors.secondaryForeground }]}>{item}</Text></View>)}</View></View>
        <View style={[styles.stats, { borderColor: colors.border }]}><View><Text style={[styles.statNumber, { color: colors.foreground }]}>12</Text><Text style={[styles.statLabel, { color: colors.mutedForeground }]}>plans joined</Text></View><View><Text style={[styles.statNumber, { color: colors.foreground }]}>4</Text><Text style={[styles.statLabel, { color: colors.mutedForeground }]}>spots saved</Text></View><View><Text style={[styles.statNumber, { color: colors.foreground }]}>3</Text><Text style={[styles.statLabel, { color: colors.mutedForeground }]}>connections</Text></View></View>
        <View style={styles.section}><Section title="Saved places" action={saved.length ? `${saved.length} saved` : undefined} />{saved.length ? <ScrollView horizontal showsHorizontalScrollIndicator={false}>{saved.map((item) => <PlaceCard key={item.id} item={item} saved onSave={() => undefined} onPress={() => Alert.alert(item.name, `${item.category} · ${item.activity}`)} />)}</ScrollView> : <View style={[styles.empty, { backgroundColor: colors.muted }]}><Feather name="bookmark" size={22} color={colors.mutedForeground} /><Text style={[styles.emptyTitle, { color: colors.foreground }]}>Save the places you want to remember.</Text><Text style={[styles.emptyBody, { color: colors.mutedForeground }]}>Tap the bookmark on any nearby place.</Text></View>}</View>
        <View style={[styles.note, { backgroundColor: colors.accent }]}><Label>YOUR BLINK</Label><Text style={[styles.noteText, { color: colors.accentForeground }]}>Your mood and interests shape what rises to the top — never what disappears.</Text></View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, marginBottom: 20 },
  profileCard: { marginHorizontal: 20, borderRadius: 25, borderWidth: 1, padding: 17 },
  profileTop: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  profileDot: { width: 15, height: 15, borderRadius: 8, borderWidth: 3, position: 'absolute', bottom: 2, right: 1 },
  name: { fontFamily: 'Inter_700Bold', fontSize: 21, letterSpacing: -0.4 },
  handle: { fontFamily: 'Inter_500Medium', fontSize: 11, marginTop: 3 },
  bio: { fontFamily: 'Inter_400Regular', fontSize: 12, lineHeight: 17, marginTop: 9 },
  availabilityRow: { borderTopWidth: 1, marginTop: 17, paddingTop: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  availabilityTitle: { flexDirection: 'row', alignItems: 'center', gap: 7 },
  statusDot: { width: 8, height: 8, borderRadius: 4 },
  availabilityText: { fontFamily: 'Inter_700Bold', fontSize: 12 },
  availabilityBody: { fontFamily: 'Inter_400Regular', fontSize: 10, marginTop: 4 },
  section: { marginTop: 28, paddingHorizontal: 20 },
  moodChip: { borderRadius: 18, borderWidth: 1, paddingHorizontal: 13, paddingVertical: 10, marginRight: 8 },
  moodText: { fontFamily: 'Inter_600SemiBold', fontSize: 11 },
  interests: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  interest: { paddingHorizontal: 12, paddingVertical: 9, borderRadius: 16 },
  interestText: { fontFamily: 'Inter_600SemiBold', fontSize: 11 },
  stats: { marginHorizontal: 20, marginTop: 30, paddingVertical: 18, borderTopWidth: 1, borderBottomWidth: 1, flexDirection: 'row', justifyContent: 'space-between' },
  statNumber: { fontFamily: 'Inter_700Bold', fontSize: 22 },
  statLabel: { fontFamily: 'Inter_500Medium', fontSize: 10, marginTop: 3 },
  empty: { minHeight: 119, borderRadius: 19, padding: 16, justifyContent: 'center', alignItems: 'center' },
  emptyTitle: { fontFamily: 'Inter_700Bold', fontSize: 13, marginTop: 10 },
  emptyBody: { fontFamily: 'Inter_400Regular', fontSize: 11, marginTop: 4 },
  note: { marginHorizontal: 20, marginTop: 27, borderRadius: 18, padding: 15, marginBottom: 20 },
  noteText: { fontFamily: 'Inter_600SemiBold', fontSize: 13, lineHeight: 18, marginTop: 9 },
});