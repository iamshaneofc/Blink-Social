import { Feather, Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import React, { useMemo, useState } from 'react';
import { Alert, FlatList, Platform, Pressable, RefreshControl, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Brand, Chip, IconButton, Label, MeetupCard, PersonCard, PlaceCard, Section } from '@/components/BlinkUI';
import { useBlink } from '@/context/BlinkContext';
import { city, collections, meetups, modes, people, places } from '@/data/mockData';
import { useColors } from '@/hooks/useColors';

function relevance(modeId: string, item: { interests?: string[]; mood?: string; intent?: string; category?: string; tags?: string[]; activity?: string }) {
  const mode = modes.find((candidate) => candidate.id === modeId);
  if (!mode || modeId === 'for-you') return 0;
  const text = [...(item.interests ?? []), item.mood ?? '', item.intent ?? '', item.category ?? '', ...(item.tags ?? []), item.activity ?? ''].join(' ').toLowerCase();
  return mode.keywords.reduce((score, keyword) => score + (text.includes(keyword) ? 1 : 0), 0);
}

export default function DiscoverScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { savedPlaces, joinedMeetups, toggleSaved, toggleJoined } = useBlink();
  const [mode, setMode] = useState('for-you');
  const [search, setSearch] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const matches = (text: string) => !search.trim() || text.toLowerCase().includes(search.toLowerCase());
  const sortedPeople = useMemo(() => [...people].sort((a, b) => relevance(mode, b) - relevance(mode, a)), [mode]);
  const sortedMeetups = useMemo(() => [...meetups].sort((a, b) => relevance(mode, b) - relevance(mode, a) || Number(b.isLive) - Number(a.isLive)), [mode]);
  const sortedPlaces = useMemo(() => [...places].sort((a, b) => relevance(mode, b) - relevance(mode, a)), [mode]);
  const notify = (message: string) => Alert.alert(message);

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      <FlatList
        data={[1]}
        keyExtractor={(item) => String(item)}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => { setRefreshing(true); setTimeout(() => setRefreshing(false), 600); }} tintColor={colors.primary} />}
        contentContainerStyle={{ paddingTop: insets.top + 14, paddingBottom: Platform.OS === 'web' ? 112 : 100 }}
        renderItem={() => (
          <View>
            <View style={styles.header}>
              <View><Text style={[styles.eyebrow, { color: colors.primary }]}>BENGALURU · 6:42 PM</Text><Brand /></View>
              <IconButton icon="person-outline" label="Open profile" onPress={() => notify('Your profile is one tap away in the You tab.')} />
            </View>
            <View style={[styles.search, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <Ionicons name="search" size={18} color={colors.mutedForeground} />
              <TextInput testID="discover-search" value={search} onChangeText={setSearch} placeholder="Find people, places, plans..." placeholderTextColor={colors.mutedForeground} style={[styles.searchInput, { color: colors.foreground }]} />
              {search ? <Pressable onPress={() => setSearch('')} hitSlop={10}><Ionicons name="close-circle" size={17} color={colors.mutedForeground} /></Pressable> : null}
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.modeRow}>
              {modes.map((item) => <Chip key={item.id} label={item.label} icon={item.icon} active={mode === item.id} onPress={() => { setMode(item.id); Haptics.selectionAsync(); }} />)}
            </ScrollView>
            {search ? <Text style={[styles.hint, { color: colors.mutedForeground }]}>Closest matches rise first — everything else stays discoverable.</Text> : null}

            <View style={styles.section}>
              <Section title="People nearby" action="See all" onAction={() => notify('People are ranked by your mode, mood, and distance.')} />
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {sortedPeople.filter((person) => matches(`${person.name} ${person.bio} ${person.interests.join(' ')}`)).map((person) => <PersonCard key={person.id} person={person} onPress={() => notify(`${person.name} is ${person.distance} away and ${person.intent.toLowerCase()}.`)} />)}
              </ScrollView>
            </View>

            <View style={styles.section}>
              <Section title="Happening now" action="Open map" onAction={() => notify('The Map tab shows live activity around you.')} />
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {sortedMeetups.filter((item) => item.isLive && matches(`${item.title} ${item.location}`)).map((item) => <MeetupCard key={item.id} item={item} joined={joinedMeetups.includes(item.id)} onJoin={() => { toggleJoined(item.id); Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success); }} />)}
              </ScrollView>
            </View>

            <View style={styles.section}>
              <Section title="Upcoming events" action="See all" onAction={() => notify('All upcoming events are in the Meetups tab.')} />
              {sortedMeetups.filter((item) => !item.isLive && matches(`${item.title} ${item.location}`)).slice(0, 2).map((item) => <MeetupCard key={item.id} item={item} compact joined={joinedMeetups.includes(item.id)} onJoin={() => { toggleJoined(item.id); Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success); }} />)}
            </View>

            <View style={styles.section}>
              <Section title="Nearby places" action="Explore" onAction={() => notify('Places rise based on interest, mood, rating, and social activity.')} />
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {sortedPlaces.filter((item) => matches(`${item.name} ${item.category} ${item.tags.join(' ')}`)).map((item) => <PlaceCard key={item.id} item={item} saved={savedPlaces.includes(item.id)} onSave={() => { toggleSaved(item.id); Haptics.selectionAsync(); }} onPress={() => notify(`${item.name} · ${item.activity}`)} />)}
              </ScrollView>
            </View>

            <View style={styles.section}>
              <Section title="Collections" action="Browse all" onAction={() => notify('Collections adapt as Blink learns your city rhythm.')} />
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {collections.map((item) => <Pressable key={item.title} onPress={() => notify(item.title)} style={({ pressed }) => [styles.collection, { backgroundColor: item.color, opacity: pressed ? 0.8 : 1 }]}><View style={styles.collectionIcon}><Feather name={item.icon as keyof typeof Feather.glyphMap} size={20} color={colors.foreground} /></View><Text style={[styles.collectionTitle, { color: colors.foreground }]}>{item.title}</Text><Text style={[styles.collectionSub, { color: colors.foreground }]}>{item.sub}</Text><Feather name="arrow-up-right" size={18} color={colors.foreground} style={styles.collectionArrow} /></Pressable>)}
              </ScrollView>
            </View>

            <View style={styles.section}>
              <Section title="Explore your city" action="View map" onAction={() => notify('The Map tab is ready when you are.')} />
              <View style={styles.cityGrid}>{city.map((item) => <Pressable key={item.title} onPress={() => notify(`${item.title} · ${item.count}`)} style={({ pressed }) => [styles.cityCard, { backgroundColor: item.color, opacity: pressed ? 0.8 : 1 }]}><Feather name={item.icon as keyof typeof Feather.glyphMap} size={21} color={colors.foreground} /><Text style={[styles.cityTitle, { color: colors.foreground }]}>{item.title}</Text><Text style={[styles.cityCount, { color: colors.foreground }]}>{item.count}</Text></Pressable>)}</View>
            </View>

            <View style={[styles.note, { borderColor: colors.border }]}><Label>BLINK PRINCIPLE</Label><Text style={[styles.noteTitle, { color: colors.foreground }]}>More relevance, never less discovery.</Text><Text style={[styles.noteBody, { color: colors.mutedForeground }]}>Your mode changes what rises to the top — the rest of your city stays within reach.</Text></View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, marginBottom: 18 },
  eyebrow: { fontFamily: 'Inter_700Bold', fontSize: 10, letterSpacing: 1.2, marginBottom: 4 },
  search: { flexDirection: 'row', alignItems: 'center', marginHorizontal: 20, borderWidth: 1, borderRadius: 18, paddingHorizontal: 14, height: 52 },
  searchInput: { flex: 1, fontFamily: 'Inter_400Regular', fontSize: 14, marginLeft: 10 },
  modeRow: { paddingHorizontal: 20, paddingTop: 14 },
  hint: { fontFamily: 'Inter_400Regular', fontSize: 12, marginHorizontal: 20, marginTop: 12, lineHeight: 17 },
  section: { marginTop: 27, paddingLeft: 20 },
  collection: { width: 178, minHeight: 145, borderRadius: 21, padding: 15, marginRight: 11 },
  collectionIcon: { width: 38, height: 38, borderRadius: 19, backgroundColor: 'rgba(255,255,255,.48)', alignItems: 'center', justifyContent: 'center', marginBottom: 18 },
  collectionTitle: { fontFamily: 'Inter_700Bold', fontSize: 15, lineHeight: 18, maxWidth: 140 },
  collectionSub: { fontFamily: 'Inter_500Medium', fontSize: 11, marginTop: 4 },
  collectionArrow: { position: 'absolute', right: 14, bottom: 14 },
  cityGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, paddingRight: 20 },
  cityCard: { width: '47.8%', minHeight: 111, borderRadius: 21, padding: 15, justifyContent: 'space-between' },
  cityTitle: { fontFamily: 'Inter_700Bold', fontSize: 15 },
  cityCount: { fontFamily: 'Inter_500Medium', fontSize: 11 },
  note: { marginHorizontal: 20, marginTop: 34, paddingTop: 18, borderTopWidth: 1 },
  noteTitle: { fontFamily: 'Inter_700Bold', fontSize: 17, marginTop: 12 },
  noteBody: { fontFamily: 'Inter_400Regular', fontSize: 12, lineHeight: 18, marginTop: 6, marginBottom: 20 },
});