import { Feather, Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import React, { useMemo, useState } from 'react';
import { Alert, Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Brand, Chip, IconButton, Label, MeetupCard, Section } from '@/components/BlinkUI';
import { useBlink } from '@/context/BlinkContext';
import { meetups as seedMeetups, type Meetup } from '@/data/mockData';
import { useColors } from '@/hooks/useColors';

export default function MeetupsScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { joinedMeetups, toggleJoined, createdMeetups, addMeetup } = useBlink();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('Near me');
  const [intent, setIntent] = useState('Meet new people');
  const [time, setTime] = useState('Live now');
  const allMeetups = useMemo(() => [...createdMeetups, ...seedMeetups], [createdMeetups]);

  const publish = () => {
    if (!title.trim() || !location.trim()) {
      Alert.alert('Add a title and place', 'Give your meetup enough detail for nearby people to find it.');
      return;
    }
    const item: Meetup = { id: 'created-' + Date.now(), title: title.trim(), description: `${intent} around ${location.trim()}.`, location: location.trim(), distance: 'Near you', time, intent, participants: 1, host: 'You', category: 'Community', isLive: time === 'Live now', latitude: 12.9352, longitude: 77.6245, accent: '#f2c5ae' };
    addMeetup(item);
    toggleJoined(item.id);
    setOpen(false);
    setTitle('');
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    Alert.alert('Meetup is live', 'Nearby Blinkers can now find your plan.');
  };

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingTop: insets.top + 14, paddingBottom: 120 }}>
        <View style={styles.header}><View><Text style={[styles.eyebrow, { color: colors.primary }]}>MAKE THE FIRST MOVE</Text><Brand /></View><IconButton icon="add" label="Create a flash meetup" onPress={() => setOpen(true)} /></View>
        <View style={[styles.hero, { backgroundColor: colors.foreground }]}><View style={[styles.orb, { backgroundColor: colors.primary }]} /><Label>FLASH MEETUPS</Label><Text style={[styles.heroTitle, { color: colors.background }]}>Turn “what are you doing?” into a plan.</Text><Text style={[styles.heroBody, { color: colors.muted }]}>{allMeetups.filter((item) => item.isLive).length} live plans are unfolding around you right now.</Text><Pressable testID="start-something" onPress={() => setOpen(true)} style={[styles.heroButton, { backgroundColor: colors.card }]}><Text style={[styles.heroButtonText, { color: colors.foreground }]}>Start something</Text><Ionicons name="arrow-forward" size={16} color={colors.foreground} /></Pressable></View>
        <View style={styles.list}><Section title="Live now" action="Map view" onAction={() => Alert.alert('Live map', 'Switch to the Map tab to see every plan around you.')} />{allMeetups.filter((item) => item.isLive).map((item) => <MeetupCard key={item.id} item={item} compact joined={joinedMeetups.includes(item.id)} onJoin={() => { toggleJoined(item.id); Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success); }} />)}</View>
        <View style={styles.list}><Section title="Coming up" /><Text style={[styles.helper, { color: colors.mutedForeground }]}>Small plans, open invites, no pressure.</Text>{allMeetups.filter((item) => !item.isLive).map((item) => <MeetupCard key={item.id} item={item} compact joined={joinedMeetups.includes(item.id)} onJoin={() => { toggleJoined(item.id); Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success); }} />)}</View>
        <View style={[styles.safety, { backgroundColor: colors.secondary }]}><Feather name="shield" size={18} color={colors.secondaryForeground} /><View style={{ flex: 1 }}><Text style={[styles.safetyTitle, { color: colors.secondaryForeground }]}>Meet on your terms</Text><Text style={[styles.safetyBody, { color: colors.secondaryForeground }]}>Keep plans public, check the vibe, and leave whenever you want.</Text></View></View>
      </ScrollView>
      <Modal visible={open} animationType="slide" transparent onRequestClose={() => setOpen(false)}><View style={styles.backdrop}><View style={[styles.modal, { backgroundColor: colors.background, paddingBottom: insets.bottom + 20 }]}><View style={styles.handle} /><View style={styles.modalHeader}><View><Text style={[styles.modalEyebrow, { color: colors.primary }]}>NEW AROUND HERE</Text><Text style={[styles.modalTitle, { color: colors.foreground }]}>Start a flash meetup</Text></View><IconButton icon="close" label="Close meetup form" onPress={() => setOpen(false)} /></View><Text style={[styles.fieldLabel, { color: colors.foreground }]}>What’s the plan?</Text><TextInput testID="meetup-title" value={title} onChangeText={setTitle} placeholder="Sunset walk, study sprint..." placeholderTextColor={colors.mutedForeground} style={[styles.input, { color: colors.foreground, backgroundColor: colors.card, borderColor: colors.border }]} /><Text style={[styles.fieldLabel, { color: colors.foreground }]}>Where?</Text><TextInput testID="meetup-location" value={location} onChangeText={setLocation} placeholder="A place or neighborhood" placeholderTextColor={colors.mutedForeground} style={[styles.input, { color: colors.foreground, backgroundColor: colors.card, borderColor: colors.border }]} /><Text style={[styles.fieldLabel, { color: colors.foreground }]}>Intent</Text><ScrollView horizontal showsHorizontalScrollIndicator={false}>{['Meet new people', 'Work together', 'Find dinner company'].map((item) => <Chip key={item} label={item} active={intent === item} onPress={() => setIntent(item)} />)}</ScrollView><Text style={[styles.fieldLabel, { color: colors.foreground }]}>When?</Text><ScrollView horizontal showsHorizontalScrollIndicator={false}>{['Live now', 'Today · 8 PM', 'Tomorrow morning'].map((item) => <Chip key={item} label={item} active={time === item} onPress={() => setTime(item)} />)}</ScrollView><Pressable testID="publish-meetup" onPress={publish} style={[styles.publish, { backgroundColor: colors.primary }]}><Text style={[styles.publishText, { color: colors.primaryForeground }]}>Publish meetup</Text><Ionicons name="arrow-forward" size={17} color={colors.primaryForeground} /></Pressable></View></View></Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, marginBottom: 20 },
  eyebrow: { fontFamily: 'Inter_700Bold', fontSize: 10, letterSpacing: 1.3, marginBottom: 4 },
  hero: { marginHorizontal: 20, borderRadius: 27, padding: 20, minHeight: 245, overflow: 'hidden' },
  orb: { position: 'absolute', width: 170, height: 170, borderRadius: 90, right: -55, top: -45 },
  heroTitle: { fontFamily: 'Inter_700Bold', fontSize: 27, lineHeight: 31, letterSpacing: -0.9, maxWidth: 280, marginTop: 16 },
  heroBody: { fontFamily: 'Inter_400Regular', fontSize: 13, lineHeight: 18, maxWidth: 280, marginTop: 9 },
  heroButton: { alignSelf: 'flex-start', flexDirection: 'row', alignItems: 'center', gap: 8, borderRadius: 18, paddingHorizontal: 15, paddingVertical: 11, marginTop: 18 },
  heroButtonText: { fontFamily: 'Inter_700Bold', fontSize: 12 },
  list: { paddingHorizontal: 20, marginTop: 28 },
  helper: { fontFamily: 'Inter_400Regular', fontSize: 12, marginTop: -5, marginBottom: 13 },
  safety: { marginHorizontal: 20, marginTop: 16, borderRadius: 18, padding: 15, flexDirection: 'row', gap: 11 },
  safetyTitle: { fontFamily: 'Inter_700Bold', fontSize: 13 },
  safetyBody: { fontFamily: 'Inter_400Regular', fontSize: 11, lineHeight: 16, marginTop: 4 },
  backdrop: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(17,25,30,.48)' },
  modal: { borderTopLeftRadius: 29, borderTopRightRadius: 29, paddingHorizontal: 20, paddingTop: 10 },
  handle: { alignSelf: 'center', width: 42, height: 4, borderRadius: 2, backgroundColor: '#c7c3bb', marginBottom: 20 },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 },
  modalEyebrow: { fontFamily: 'Inter_700Bold', fontSize: 10, letterSpacing: 1.2, marginBottom: 4 },
  modalTitle: { fontFamily: 'Inter_700Bold', fontSize: 24, letterSpacing: -0.6 },
  fieldLabel: { fontFamily: 'Inter_700Bold', fontSize: 12, marginBottom: 8, marginTop: 11 },
  input: { height: 50, borderRadius: 15, borderWidth: 1, paddingHorizontal: 14, fontFamily: 'Inter_400Regular', fontSize: 14 },
  publish: { height: 52, borderRadius: 18, marginTop: 24, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 8 },
  publishText: { fontFamily: 'Inter_700Bold', fontSize: 14 },
});