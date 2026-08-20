import { Feather, Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { useLocalSearchParams, router } from 'expo-router';
import React from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { Avatar, Label } from '@/components/BlinkUI';
import { MapSnippet, PhotoHero, Screen, SoftCard, TagCloud, TapButton, TopBar } from '@/components/ScreenKit';
import { useBlink } from '@/context/BlinkContext';
import { meetups } from '@/data/mockData';
import { useColors } from '@/hooks/useColors';

export default function MeetupDetailScreen() {
  const colors = useColors();
  const { id } = useLocalSearchParams<{ id: string }>();
  const item = meetups.find((candidate) => candidate.id === id) ?? meetups[0];
  const { joinedMeetups, toggleJoined } = useBlink();
  const joined = joinedMeetups.includes(item.id);

  return (
    <Screen>
      <TopBar eyebrow={item.isLive ? 'LIVE AROUND YOU' : 'UPCOMING PLAN'} title="Meetup details" />
      <PhotoHero image={item.image} accent={item.accent}>
        <View style={styles.heroShade} />
        <View style={styles.heroContent}>
          <Label>{item.isLive ? 'LIVE NOW' : item.category.toUpperCase()}</Label>
          <Text style={[styles.heroTitle, { color: colors.foreground }]}>{item.title}</Text>
        </View>
      </PhotoHero>
      <View style={styles.metaRow}><View style={styles.meta}><Feather name="clock" size={16} color={colors.primary} /><Text style={[styles.metaText, { color: colors.foreground }]}>{item.time}</Text></View><View style={styles.meta}><Feather name="map-pin" size={16} color={colors.primary} /><Text style={[styles.metaText, { color: colors.foreground }]}>{item.distance}</Text></View></View>
      <SoftCard style={styles.hostCard}><Avatar initials="MS" accent="#f2b5a4" size={48} /><View style={{ flex: 1 }}><View style={styles.hostName}><Text style={[styles.hostTitle, { color: colors.foreground }]}>{item.host}</Text><Ionicons name="checkmark-circle" size={16} color={colors.primary} /></View><Text style={[styles.muted, { color: colors.mutedForeground }]}>Host · Verified local</Text></View><Ionicons name="ellipsis-horizontal" size={20} color={colors.mutedForeground} /></SoftCard>
      <Text style={[styles.sectionTitle, { color: colors.foreground }]}>The plan</Text>
      <Text style={[styles.body, { color: colors.mutedForeground }]}>{item.description}</Text>
      <View style={[styles.intent, { backgroundColor: colors.secondary }]}><Feather name="users" size={15} color={colors.secondaryForeground} /><Text style={[styles.intentText, { color: colors.secondaryForeground }]}>{item.intent} · {item.participants} people going</Text></View>
      <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Where it is</Text>
      <MapSnippet label={`${item.location} · exact pin shared with attendees`} />
      <View style={styles.attendeeHeader}><Text style={[styles.sectionTitle, { color: colors.foreground, marginBottom: 0 }]}>Attendees</Text><Text style={[styles.muted, { color: colors.mutedForeground }]}>{item.participants} going</Text></View>
      <View style={styles.attendees}>{['MS', 'AR', 'RM', 'MK', 'DI'].slice(0, Math.min(item.participants, 5)).map((initials, index) => <View key={initials} style={styles.attendee}><Avatar initials={initials} accent={index % 2 ? '#b7d7d0' : '#f2b5a4'} size={36} /></View>)}</View>
      <View style={styles.actions}><TapButton label={joined ? 'Leave meetup' : 'Join meetup'} icon={joined ? 'checkmark' : 'arrow-forward'} onPress={() => { toggleJoined(item.id); Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success); }} /><TapButton label="Share link" icon="share-outline" secondary onPress={() => Alert.alert('Link ready', 'The meetup link is ready to share with a friend.')} /></View>
      <Pressable onPress={() => router.push(`/chat/${item.id === 'rooftop' ? 'rooftop-chat' : 'makers-chat'}`)} style={styles.chatLink}><Ionicons name="chatbubble-ellipses-outline" size={18} color={colors.primary} /><Text style={[styles.chatLinkText, { color: colors.primary }]}>Open group chat</Text></Pressable>
    </Screen>
  );
}

const styles = StyleSheet.create({
  heroShade: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(255,255,255,.12)' },
  heroContent: { gap: 8 },
  heroTitle: { fontFamily: 'Inter_700Bold', fontSize: 27, lineHeight: 31, maxWidth: 290, letterSpacing: -0.8 },
  metaRow: { flexDirection: 'row', gap: 18, marginBottom: 18 },
  meta: { flexDirection: 'row', alignItems: 'center', gap: 7 },
  metaText: { fontFamily: 'Inter_600SemiBold', fontSize: 12 },
  hostCard: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 24 },
  hostName: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  hostTitle: { fontFamily: 'Inter_700Bold', fontSize: 14 },
  muted: { fontFamily: 'Inter_500Medium', fontSize: 11 },
  sectionTitle: { fontFamily: 'Inter_700Bold', fontSize: 18, letterSpacing: -0.3, marginBottom: 9, marginTop: 8 },
  body: { fontFamily: 'Inter_400Regular', fontSize: 14, lineHeight: 21, marginBottom: 15 },
  intent: { borderRadius: 16, padding: 13, flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 20 },
  intentText: { fontFamily: 'Inter_600SemiBold', fontSize: 12 },
  attendeeHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 20 },
  attendees: { flexDirection: 'row', marginTop: 10, marginBottom: 18 },
  attendee: { marginRight: -4 },
  actions: { gap: 10, marginTop: 8 },
  chatLink: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 7, paddingVertical: 18 },
  chatLinkText: { fontFamily: 'Inter_700Bold', fontSize: 12 },
});