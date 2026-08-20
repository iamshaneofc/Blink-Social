import { Feather, Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { useLocalSearchParams, router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { Avatar, Label } from '@/components/BlinkUI';
import { Screen, SoftCard, TapButton, TopBar } from '@/components/ScreenKit';
import { voiceRooms } from '@/data/mockData';
import { useColors } from '@/hooks/useColors';

export default function VoiceRoomScreen() {
  const colors = useColors();
  const { id } = useLocalSearchParams<{ id: string }>();
  const room = voiceRooms.find((candidate) => candidate.id === id) ?? voiceRooms[0];
  const [muted, setMuted] = useState(false);
  const [raised, setRaised] = useState(false);
  const [reaction, setReaction] = useState('♡');

  return (
    <Screen>
      <TopBar eyebrow="LIVE VOICE ROOM" title="The city is talking" right={<Pressable onPress={() => Alert.alert('Room info', room.topic)} style={[styles.info, { backgroundColor: colors.card, borderColor: colors.border }]}><Ionicons name="information-circle-outline" size={20} color={colors.foreground} /></Pressable>} />
      <View style={[styles.roomHeader, { backgroundColor: colors.foreground }]}><View style={styles.roomOrb} /><Label>LIVE NOW</Label><Text style={[styles.roomTitle, { color: colors.background }]}>{room.title}</Text><Text style={[styles.roomTopic, { color: colors.muted }]}>{room.topic}</Text><View style={styles.roomStats}><Text style={[styles.stat, { color: colors.muted }]}><Feather name="users" size={13} /> {room.listenerCount} listening</Text><Text style={[styles.stat, { color: colors.muted }]}><Feather name="clock" size={13} /> 42 min in</Text></View></View>
      <Text style={[styles.sectionTitle, { color: colors.foreground }]}>On stage</Text>
      <View style={styles.speakers}>{room.speakers.map((speaker) => <View key={speaker.name} style={styles.speaker}><View style={[styles.speakerRing, speaker.active && { borderColor: colors.primary }]}><Avatar initials={speaker.initials} accent={speaker.accent} size={62} /></View><Text style={[styles.speakerName, { color: colors.foreground }]}>{speaker.name}</Text><Text style={[styles.speakerRole, { color: speaker.active ? colors.primary : colors.mutedForeground }]}>{speaker.active ? 'speaking' : 'speaker'}</Text></View>)}</View>
      <SoftCard style={styles.listeners}><Text style={[styles.listenerTitle, { color: colors.foreground }]}>Listening in</Text><View style={styles.listenerRow}>{room.listeners.map((initials, index) => <Avatar key={`${initials}-${index}`} initials={initials} accent={index % 2 ? '#b7d7d0' : '#f4d58b'} size={34} />)}<Text style={[styles.more, { color: colors.mutedForeground }]}>+{room.listenerCount - room.listeners.length} others</Text></View></SoftCard>
      <View style={styles.controls}><Pressable onPress={() => { setMuted((value) => !value); Haptics.selectionAsync(); }} style={[styles.control, { backgroundColor: muted ? colors.primary : colors.card, borderColor: colors.border }]}><Ionicons name={muted ? 'mic-off' : 'mic'} size={19} color={muted ? colors.primaryForeground : colors.foreground} /><Text style={[styles.controlLabel, { color: muted ? colors.primaryForeground : colors.foreground }]}>{muted ? 'Unmute' : 'Mute'}</Text></Pressable><Pressable onPress={() => { setRaised((value) => !value); Haptics.selectionAsync(); }} style={[styles.control, { backgroundColor: raised ? colors.secondary : colors.card, borderColor: colors.border }]}><Ionicons name="hand-left-outline" size={19} color={colors.foreground} /><Text style={[styles.controlLabel, { color: colors.foreground }]}>{raised ? 'Hand raised' : 'Raise hand'}</Text></Pressable><Pressable onPress={() => { setReaction(reaction === '♡' ? '🔥' : reaction === '🔥' ? '👏' : '♡'); Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); }} style={[styles.reaction, { backgroundColor: colors.muted }]}><Text style={styles.reactionText}>{reaction}</Text></Pressable></View>
      <TapButton label="Leave room" icon="exit-outline" secondary onPress={() => router.back()} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  info: { width: 42, height: 42, borderRadius: 21, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
  roomHeader: { borderRadius: 25, padding: 18, minHeight: 205, overflow: 'hidden' },
  roomOrb: { position: 'absolute', width: 210, height: 210, borderRadius: 105, backgroundColor: '#f2b5a4', right: -60, top: -65, opacity: 0.8 },
  roomTitle: { fontFamily: 'Inter_700Bold', fontSize: 25, lineHeight: 29, letterSpacing: -0.7, maxWidth: 290, marginTop: 17 },
  roomTopic: { fontFamily: 'Inter_400Regular', fontSize: 12, lineHeight: 18, marginTop: 7, maxWidth: 290 },
  roomStats: { flexDirection: 'row', gap: 18, marginTop: 17 },
  stat: { fontFamily: 'Inter_600SemiBold', fontSize: 10 },
  sectionTitle: { fontFamily: 'Inter_700Bold', fontSize: 18, marginTop: 24, marginBottom: 12 },
  speakers: { flexDirection: 'row', justifyContent: 'space-around' },
  speaker: { alignItems: 'center', gap: 5 },
  speakerRing: { borderRadius: 38, borderWidth: 3, borderColor: 'transparent', padding: 3 },
  speakerName: { fontFamily: 'Inter_700Bold', fontSize: 11 },
  speakerRole: { fontFamily: 'Inter_500Medium', fontSize: 9 },
  listeners: { marginTop: 24 },
  listenerTitle: { fontFamily: 'Inter_700Bold', fontSize: 13, marginBottom: 12 },
  listenerRow: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  more: { fontFamily: 'Inter_600SemiBold', fontSize: 10, marginLeft: 3 },
  controls: { flexDirection: 'row', gap: 8, marginTop: 22, marginBottom: 14 },
  control: { flex: 1, minHeight: 66, borderRadius: 17, borderWidth: 1, alignItems: 'center', justifyContent: 'center', gap: 5 },
  controlLabel: { fontFamily: 'Inter_600SemiBold', fontSize: 9, textAlign: 'center' },
  reaction: { width: 58, borderRadius: 17, alignItems: 'center', justifyContent: 'center' },
  reactionText: { fontSize: 25 },
});