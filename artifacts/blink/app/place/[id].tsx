import { Feather, Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { useLocalSearchParams, router } from 'expo-router';
import React from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { Label, MeetupCard } from '@/components/BlinkUI';
import { MapSnippet, PhotoHero, Screen, SoftCard, TagCloud, TapButton, TopBar } from '@/components/ScreenKit';
import { useBlink } from '@/context/BlinkContext';
import { meetups, places } from '@/data/mockData';
import { useColors } from '@/hooks/useColors';

export default function PlaceDetailScreen() {
  const colors = useColors();
  const { id } = useLocalSearchParams<{ id: string }>();
  const place = places.find((candidate) => candidate.id === id) ?? places[0];
  const { savedPlaces, toggleSaved } = useBlink();
  const saved = savedPlaces.includes(place.id);
  const activeMeetups = meetups.filter((item) => item.location.toLowerCase().includes(place.name.split(' ')[0].toLowerCase()) || item.id === 'rooftop');

  return (
    <Screen>
      <TopBar eyebrow="A PLACE FOR YOUR RHYTHM" title="Place details" />
      <PhotoHero image={place.image} accent={place.accent}>
        <View style={styles.heroOverlay} />
        <View style={styles.heroCopy}><Label>{place.category.toUpperCase()}</Label><Text style={[styles.heroTitle, { color: colors.foreground }]}>{place.name}</Text></View>
      </PhotoHero>
      <View style={styles.ratingRow}><Text style={[styles.rating, { color: colors.foreground }]}><Ionicons name="star" size={15} color={colors.primary} /> {place.rating}</Text><Text style={[styles.activity, { color: colors.primary }]}>{place.activity}</Text></View>
      <SoftCard accent={colors.secondary} style={styles.crowd}><View style={styles.crowdIcon}><Feather name="radio" size={17} color={colors.secondaryForeground} /></View><View style={{ flex: 1 }}><Text style={[styles.crowdTitle, { color: colors.secondaryForeground }]}>{place.activity}</Text><Text style={[styles.crowdBody, { color: colors.secondaryForeground }]}>A gentle signal of the energy here right now.</Text></View></SoftCard>
      <Text style={[styles.sectionTitle, { color: colors.foreground }]}>The vibe</Text>
      <TagCloud tags={place.tags.concat(['Blink-friendly'])} />
      <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Active meetups here</Text>
      {activeMeetups.slice(0, 2).map((item) => <MeetupCard key={item.id} item={item} compact joined={false} onJoin={() => router.push(`/meetup/${item.id}`)} />)}
      <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Find it</Text>
      <MapSnippet label={`${place.distance} away · open in your preferred maps app`} />
      <View style={styles.actions}><TapButton label={saved ? 'Saved place' : 'Save place'} icon={saved ? 'bookmark' : 'bookmark-outline'} onPress={() => { toggleSaved(place.id); Haptics.selectionAsync(); }} /><TapButton label="Check in" icon="checkmark-circle-outline" secondary onPress={() => Alert.alert('Checked in', `You are now sharing that you are at ${place.name}.`)} /></View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  heroOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(255,255,255,.12)' },
  heroCopy: { gap: 8 },
  heroTitle: { fontFamily: 'Inter_700Bold', fontSize: 28, letterSpacing: -0.9 },
  ratingRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 },
  rating: { fontFamily: 'Inter_700Bold', fontSize: 16 },
  activity: { fontFamily: 'Inter_700Bold', fontSize: 11 },
  crowd: { flexDirection: 'row', alignItems: 'center', gap: 11, marginBottom: 22 },
  crowdIcon: { width: 36, height: 36, borderRadius: 18, backgroundColor: 'rgba(255,255,255,.5)', alignItems: 'center', justifyContent: 'center' },
  crowdTitle: { fontFamily: 'Inter_700Bold', fontSize: 13 },
  crowdBody: { fontFamily: 'Inter_400Regular', fontSize: 11, marginTop: 3 },
  sectionTitle: { fontFamily: 'Inter_700Bold', fontSize: 18, marginBottom: 10, marginTop: 8 },
  actions: { gap: 10, marginTop: 20, marginBottom: 12 },
});