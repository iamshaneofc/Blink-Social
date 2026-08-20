import { Feather, Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { Avatar, Label } from '@/components/BlinkUI';
import { Screen, SoftCard, TapButton, TopBar } from '@/components/ScreenKit';
import { communities } from '@/data/mockData';
import { useColors } from '@/hooks/useColors';

export default function CommunityDetailScreen() {
  const colors = useColors();
  const { id } = useLocalSearchParams<{ id: string }>();
  const community = communities.find((candidate) => candidate.id === id) ?? communities[0];
  const [channel, setChannel] = useState(community.channels[0]);

  return (
    <Screen>
      <TopBar eyebrow="CITY COMMUNITY" title="Community" />
      <View style={[styles.banner, { backgroundColor: community.accent }]}><View style={styles.bannerOrb} /><Label>{community.category.toUpperCase()}</Label><Text style={[styles.bannerTitle, { color: colors.foreground }]}>{community.name}</Text><Text style={[styles.bannerBody, { color: colors.foreground }]}>{community.members}</Text></View>
      <Text style={[styles.description, { color: colors.mutedForeground }]}>{community.description}</Text>
      <View style={styles.channelRow}>{community.channels.map((item) => <Pressable key={item} onPress={() => { setChannel(item); Haptics.selectionAsync(); }} style={[styles.channel, { backgroundColor: channel === item ? colors.foreground : colors.card, borderColor: channel === item ? colors.foreground : colors.border }]}><Text style={[styles.channelText, { color: channel === item ? colors.background : colors.foreground }]}>{item}</Text></Pressable>)}</View>
      <SoftCard style={styles.channelCard}><View style={styles.channelHeader}><View><Text style={[styles.channelTitle, { color: colors.foreground }]}>{channel}</Text><Text style={[styles.muted, { color: colors.mutedForeground }]}>A calm place to keep the thread going.</Text></View><Feather name="more-horizontal" size={20} color={colors.mutedForeground} /></View><View style={styles.post}><Avatar initials="KP" accent="#b6c7e8" size={38} /><View style={{ flex: 1 }}><Text style={[styles.postAuthor, { color: colors.foreground }]}>Karan P. <Text style={[styles.muted, { color: colors.mutedForeground }]}>· 12m</Text></Text><Text style={[styles.postBody, { color: colors.foreground }]}>I’m bringing a tiny projector to Sunday’s show-and-tell. Any favorite short films?</Text><View style={styles.postActions}><Text style={[styles.muted, { color: colors.mutedForeground }]}>♡ 14</Text><Text style={[styles.muted, { color: colors.mutedForeground }]}>↗ 3 replies</Text></View></View></View></SoftCard>
      <View style={styles.rosterHeader}><Text style={[styles.sectionTitle, { color: colors.foreground }]}>Member roster</Text><Text style={[styles.muted, { color: colors.mutedForeground }]}>online now</Text></View>
      <View style={styles.roster}>{community.memberInitials.map((initials, index) => <View key={initials} style={styles.member}><View><Avatar initials={initials} accent={index % 2 ? '#b7d7d0' : '#f2b5a4'} size={42} /><View style={[styles.dot, { backgroundColor: colors.primary, borderColor: colors.background }]} /></View><Text style={[styles.memberName, { color: colors.foreground }]}>{['Anika', 'Karan', 'Rohan', 'Mira', 'Dev'][index]}</Text></View>)}</View>
      <TapButton label="Create group event" icon="add" onPress={() => Alert.alert('Create group event', 'Your event draft is ready to shape with this community.')} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  banner: { borderRadius: 25, padding: 18, minHeight: 190, overflow: 'hidden', justifyContent: 'flex-end', gap: 7 },
  bannerOrb: { position: 'absolute', width: 200, height: 200, borderRadius: 100, right: -54, top: -44, backgroundColor: 'rgba(255,255,255,.35)' },
  bannerTitle: { fontFamily: 'Inter_700Bold', fontSize: 28, letterSpacing: -0.9, maxWidth: 285 },
  bannerBody: { fontFamily: 'Inter_600SemiBold', fontSize: 12 },
  description: { fontFamily: 'Inter_400Regular', fontSize: 14, lineHeight: 21, marginVertical: 17 },
  channelRow: { flexDirection: 'row', gap: 7, marginBottom: 15 },
  channel: { borderRadius: 15, borderWidth: 1, paddingHorizontal: 11, paddingVertical: 9 },
  channelText: { fontFamily: 'Inter_600SemiBold', fontSize: 10 },
  channelCard: { minHeight: 156 },
  channelHeader: { flexDirection: 'row', justifyContent: 'space-between' },
  channelTitle: { fontFamily: 'Inter_700Bold', fontSize: 15 },
  muted: { fontFamily: 'Inter_500Medium', fontSize: 10 },
  post: { flexDirection: 'row', gap: 10, marginTop: 18 },
  postAuthor: { fontFamily: 'Inter_700Bold', fontSize: 12 },
  postBody: { fontFamily: 'Inter_400Regular', fontSize: 12, lineHeight: 18, marginTop: 5 },
  postActions: { flexDirection: 'row', gap: 16, marginTop: 10 },
  rosterHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 26, marginBottom: 12 },
  sectionTitle: { fontFamily: 'Inter_700Bold', fontSize: 18 },
  roster: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 22 },
  member: { alignItems: 'center', gap: 6 },
  memberName: { fontFamily: 'Inter_600SemiBold', fontSize: 10 },
  dot: { position: 'absolute', bottom: 0, right: -1, width: 10, height: 10, borderRadius: 5, borderWidth: 2 },
});