import { Feather, Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Avatar, Brand, Label } from '@/components/BlinkUI';
import { Screen, SoftCard, TopBar } from '@/components/ScreenKit';
import { chatThreads } from '@/data/mockData';
import { useColors } from '@/hooks/useColors';

export default function InboxScreen() {
  const colors = useColors();
  const [tab, setTab] = useState<'direct' | 'groups'>('direct');
  const threads = chatThreads.filter((thread) => tab === 'groups' ? thread.id === 'rooftop-chat' || thread.id === 'makers-chat' : thread.id === 'anika-rohan');
  return (
    <Screen>
      <TopBar eyebrow="YOUR PEOPLE" title="Inbox" right={<Pressable onPress={() => router.push('/stories')} style={[styles.storyButton, { backgroundColor: colors.primary }]}><Ionicons name="add" size={18} color={colors.primaryForeground} /></Pressable>} />
      <View style={[styles.intro, { backgroundColor: colors.foreground }]}><Label>STAY IN THE LOOP</Label><Text style={[styles.introTitle, { color: colors.background }]}>Conversations that started somewhere real.</Text><Text style={[styles.introBody, { color: colors.muted }]}>People, plans, and city threads in one soft place.</Text></View>
      <View style={[styles.segmented, { backgroundColor: colors.muted }]}>{[['direct', 'Direct messages'], ['groups', 'Meetup group chats']].map(([value, label]) => <Pressable key={value} onPress={() => { setTab(value as 'direct' | 'groups'); Haptics.selectionAsync(); }} style={[styles.segment, tab === value && { backgroundColor: colors.card }]}><Text style={[styles.segmentText, { color: tab === value ? colors.foreground : colors.mutedForeground }]}>{label}</Text></Pressable>)}</View>
      <View style={styles.threadList}>{threads.map((thread) => <Pressable key={thread.id} onPress={() => router.push(`/chat/${thread.id}`)}><SoftCard style={styles.thread}><View style={styles.threadAvatars}>{thread.initials.slice(0, 3).map((initials, index) => <View key={initials} style={{ marginLeft: index ? -8 : 0 }}><Avatar initials={initials} accent={index % 2 ? '#b7d7d0' : '#f2b5a4'} size={42} /></View>)}</View><View style={styles.threadCopy}><View style={styles.threadTop}><Text style={[styles.threadTitle, { color: colors.foreground }]}>{thread.title}</Text>{thread.unread ? <View style={[styles.unread, { backgroundColor: colors.primary }]}><Text style={[styles.unreadText, { color: colors.primaryForeground }]}>{thread.unread}</Text></View> : null}</View><Text style={[styles.threadSubtitle, { color: colors.mutedForeground }]} numberOfLines={1}>{thread.typing ? 'Someone is typing...' : thread.messages[thread.messages.length - 1]?.text}</Text><Text style={[styles.threadActive, { color: thread.typing ? colors.primary : colors.mutedForeground }]}>{thread.typing ? 'typing now' : thread.active}</Text></View><Feather name="chevron-right" size={17} color={colors.mutedForeground} /></SoftCard></Pressable>)}</View>
      <Pressable onPress={() => router.push('/room/city-notes')} style={[styles.roomLink, { backgroundColor: colors.secondary }]}><View style={[styles.roomIcon, { backgroundColor: colors.card }]}><Feather name="mic" size={17} color={colors.primary} /></View><View style={{ flex: 1 }}><Text style={[styles.roomTitle, { color: colors.secondaryForeground }]}>Live rooms are happening</Text><Text style={[styles.roomBody, { color: colors.secondaryForeground }]}>Join a city conversation without needing a plan.</Text></View><Ionicons name="arrow-forward" size={17} color={colors.secondaryForeground} /></Pressable>
    </Screen>
  );
}

const styles = StyleSheet.create({
  storyButton: { width: 42, height: 42, borderRadius: 21, alignItems: 'center', justifyContent: 'center' },
  intro: { borderRadius: 24, padding: 18, minHeight: 150, overflow: 'hidden' },
  introTitle: { fontFamily: 'Inter_700Bold', fontSize: 23, lineHeight: 27, letterSpacing: -0.6, marginTop: 15, maxWidth: 280 },
  introBody: { fontFamily: 'Inter_400Regular', fontSize: 12, lineHeight: 18, marginTop: 7 },
  segmented: { flexDirection: 'row', padding: 4, borderRadius: 17, marginTop: 20 },
  segment: { flex: 1, paddingVertical: 11, borderRadius: 13, alignItems: 'center' },
  segmentText: { fontFamily: 'Inter_600SemiBold', fontSize: 11 },
  threadList: { gap: 10, marginTop: 17 },
  thread: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 13 },
  threadAvatars: { flexDirection: 'row', alignItems: 'center', width: 62 },
  threadCopy: { flex: 1 },
  threadTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 8 },
  threadTitle: { fontFamily: 'Inter_700Bold', fontSize: 14, flex: 1 },
  threadSubtitle: { fontFamily: 'Inter_400Regular', fontSize: 11, marginTop: 5 },
  threadActive: { fontFamily: 'Inter_600SemiBold', fontSize: 10, marginTop: 6 },
  unread: { width: 20, height: 20, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  unreadText: { fontFamily: 'Inter_700Bold', fontSize: 10 },
  roomLink: { marginTop: 22, borderRadius: 20, padding: 14, flexDirection: 'row', alignItems: 'center', gap: 10 },
  roomIcon: { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
  roomTitle: { fontFamily: 'Inter_700Bold', fontSize: 12 },
  roomBody: { fontFamily: 'Inter_400Regular', fontSize: 10, marginTop: 4 },
});