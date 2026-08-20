import * as Location from 'expo-location';
import * as Haptics from 'expo-haptics';
import { Feather, Ionicons } from '@expo/vector-icons';
import React, { useMemo, useState } from 'react';
import { Alert, Linking, Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Chip, MeetupCard, Section } from '@/components/BlinkUI';
import { useBlink } from '@/context/BlinkContext';
import { mapFilters, meetups, places } from '@/data/mockData';
import { useColors } from '@/hooks/useColors';

export default function MapScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { joinedMeetups, toggleJoined } = useBlink();
  const [filter, setFilter] = useState('live');
  const [permission, requestPermission] = Location.useForegroundPermissions();
  const [loading, setLoading] = useState(false);

  const rankedMeetups = useMemo(() => [...meetups].sort((a, b) => {
    const matches = (item: typeof a) => filter === 'live' ? item.isLive : filter === 'meetups' ? item.category === 'Social' || item.isLive : filter === 'events' ? !item.isLive : filter === 'communities' ? item.intent.includes('people') : false;
    return Number(matches(b)) - Number(matches(a));
  }), [filter]);

  const centerOnUser = async () => {
    if (Platform.OS === 'web') {
      Alert.alert('Location on your device', 'Blink will use your phone location when opened in Expo Go.');
      return;
    }
    if (!permission?.granted) {
      if (permission?.status === 'denied' && permission.canAskAgain === false) {
        Alert.alert('Location is off', 'Turn on location access for Blink in Settings.', [{ text: 'Cancel', style: 'cancel' }, { text: 'Open Settings', onPress: () => Linking.openSettings() }]);
        return;
      }
      const response = await requestPermission();
      if (!response.granted) return;
    }
    setLoading(true);
    try {
      const current = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced });
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } catch {
      Alert.alert('Could not find you', 'Showing activity around Indiranagar instead.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
        <View><Text style={[styles.eyebrow, { color: colors.primary }]}>YOUR CITY, RIGHT NOW</Text><Text style={[styles.title, { color: colors.foreground }]}>Around you</Text></View>
        <Pressable onPress={centerOnUser} style={[styles.headerButton, { backgroundColor: colors.card, borderColor: colors.border }]}><Ionicons name="locate" size={20} color={colors.foreground} /></Pressable>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filters}>{mapFilters.map((item) => <Chip key={item.id} label={item.label} icon={item.icon} active={filter === item.id} onPress={() => { setFilter(item.id); Haptics.selectionAsync(); }} />)}</ScrollView>
      <View style={[styles.mapFrame, { borderColor: colors.border, backgroundColor: colors.secondary }]}>
        <View style={[styles.mapGlow, { backgroundColor: colors.primary }]} />
        <View style={[styles.road, styles.roadOne, { backgroundColor: colors.card }]} />
        <View style={[styles.road, styles.roadTwo, { backgroundColor: colors.card }]} />
        <View style={[styles.road, styles.roadThree, { backgroundColor: colors.card }]} />
        <View style={[styles.currentLocation, { backgroundColor: colors.primary, borderColor: colors.card }]}><View style={[styles.currentLocationCore, { backgroundColor: colors.card }]} /></View>
         {rankedMeetups.map((item, index) => <Pressable key={item.id} onPress={() => router.push(`/meetup/${item.id}`)} style={[styles.marker, { top: 58 + (index % 3) * 65, left: 52 + (index % 2) * 120, backgroundColor: item.isLive ? colors.primary : colors.card, borderColor: item.isLive ? colors.primary : colors.border }]}><Ionicons name={item.isLive ? 'radio' : 'people'} size={15} color={item.isLive ? colors.primaryForeground : colors.accentForeground} /></Pressable>)}
         {places.slice(0, 3).map((item, index) => <Pressable key={item.id} onPress={() => router.push(`/place/${item.id}`)} style={[styles.placeMarker, { top: 130 + index * 48, left: 190 + (index % 2) * 54, backgroundColor: colors.card, borderColor: colors.border }]}><Feather name="coffee" size={12} color={colors.foreground} /></Pressable>)}
        <View style={[styles.legend, { backgroundColor: colors.card, borderColor: colors.border }]}><Text style={[styles.legendText, { color: colors.foreground }]}><Text style={{ color: colors.primary }}>●</Text> Live activity</Text><Text style={[styles.legendText, { color: colors.foreground }]}><Text style={{ color: colors.accentForeground }}>●</Text> Meetups</Text></View>
        <Pressable testID="use-my-location" onPress={centerOnUser} style={[styles.locationButton, { backgroundColor: colors.card, borderColor: colors.border, opacity: loading ? 0.6 : 1 }]}><Ionicons name={loading ? 'hourglass-outline' : 'navigate'} size={16} color={colors.primary} /><Text style={[styles.locationText, { color: colors.foreground }]}>{permission?.granted ? 'Centered on you' : 'Use my location'}</Text></Pressable>
      </View>
       <View style={styles.liveSection}><Section title={filter === 'live' ? 'Live around you' : 'Activity around you'} action="See all" onAction={() => Alert.alert('Map discovery', 'Markers are ranked by this filter, not removed.')} /><ScrollView horizontal showsHorizontalScrollIndicator={false}>{rankedMeetups.slice(0, 3).map((item) => <MeetupCard key={item.id} item={item} compact joined={joinedMeetups.includes(item.id)} onOpen={() => router.push(`/meetup/${item.id}`)} onJoin={() => { toggleJoined(item.id); Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success); }} />)}</ScrollView></View>
      <View style={[styles.note, { backgroundColor: colors.secondary }]}><Text style={[styles.noteTitle, { color: colors.secondaryForeground }]}>Live Now is social activity — not just a busy cafe.</Text></View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  header: { paddingHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  eyebrow: { fontFamily: 'Inter_700Bold', fontSize: 10, letterSpacing: 1.2, marginBottom: 3 },
  title: { fontFamily: 'Inter_700Bold', fontSize: 28, letterSpacing: -0.8 },
  headerButton: { width: 42, height: 42, borderRadius: 21, alignItems: 'center', justifyContent: 'center', borderWidth: 1 },
  filters: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 3 },
  mapFrame: { marginHorizontal: 20, marginTop: 12, height: 330, borderRadius: 26, overflow: 'hidden', borderWidth: 1 },
  mapGlow: { position: 'absolute', width: 190, height: 190, borderRadius: 95, top: 62, left: 90, opacity: 0.16 },
  road: { position: 'absolute', height: 13, borderRadius: 8, transform: [{ rotate: '-24deg' }], opacity: 0.8 },
  roadOne: { width: 410, top: 112, left: -34 },
  roadTwo: { width: 360, top: 215, left: 10, transform: [{ rotate: '31deg' }] },
  roadThree: { width: 280, top: 55, left: 82, transform: [{ rotate: '74deg' }] },
  currentLocation: { position: 'absolute', width: 25, height: 25, borderRadius: 13, top: 165, left: 150, alignItems: 'center', justifyContent: 'center', borderWidth: 3 },
  currentLocationCore: { width: 7, height: 7, borderRadius: 4 },
  marker: { width: 34, height: 34, borderRadius: 17, alignItems: 'center', justifyContent: 'center', borderWidth: 2 },
  placeMarker: { width: 27, height: 27, borderRadius: 14, alignItems: 'center', justifyContent: 'center', borderWidth: 1 },
  legend: { position: 'absolute', top: 14, left: 14, paddingHorizontal: 11, paddingVertical: 9, borderRadius: 13, borderWidth: 1, gap: 4 },
  legendText: { fontFamily: 'Inter_600SemiBold', fontSize: 10 },
  locationButton: { position: 'absolute', bottom: 14, left: 14, flexDirection: 'row', alignItems: 'center', gap: 7, borderRadius: 17, paddingHorizontal: 13, paddingVertical: 10, borderWidth: 1 },
  locationText: { fontFamily: 'Inter_600SemiBold', fontSize: 11 },
  liveSection: { marginTop: 22, paddingLeft: 20 },
  note: { marginHorizontal: 20, marginTop: 18, borderRadius: 18, padding: 15 },
  noteTitle: { fontFamily: 'Inter_600SemiBold', fontSize: 13, lineHeight: 18 },
});