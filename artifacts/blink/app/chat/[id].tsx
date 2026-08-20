import { Feather, Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { useLocalSearchParams, router } from 'expo-router';
import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { Avatar, IconButton } from '@/components/BlinkUI';
import { Screen, TapButton, TopBar } from '@/components/ScreenKit';
import { chatThreads } from '@/data/mockData';
import { useColors } from '@/hooks/useColors';

export default function ChatScreen() {
  const colors = useColors();
  const { id } = useLocalSearchParams<{ id: string }>();
  const thread = chatThreads.find((candidate) => candidate.id === id) ?? chatThreads[0];
  const [draft, setDraft] = useState('');
  const [messages, setMessages] = useState(thread.messages);

  const send = () => {
    if (!draft.trim()) return;
    setMessages((current) => [...current, { id: `new-${Date.now()}`, sender: 'You', initials: 'AR', text: draft.trim(), time: 'now', mine: true }]);
    setDraft('');
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  return (
    <Screen>
      <TopBar eyebrow={thread.active.toUpperCase()} title={thread.title} right={<IconButton icon="call-outline" label="Start voice room" onPress={() => router.push('/room/city-notes')} />} />
      <View style={[styles.threadSummary, { backgroundColor: colors.secondary }]}><View style={styles.summaryAvatars}>{thread.initials.map((initials, index) => <Avatar key={initials} initials={initials} accent={index % 2 ? '#b7d7d0' : '#f2b5a4'} size={30} />)}</View><Text style={[styles.summaryText, { color: colors.secondaryForeground }]}>{thread.subtitle}</Text><Feather name="chevron-down" size={16} color={colors.secondaryForeground} /></View>
      <ScrollView style={styles.messages} contentContainerStyle={{ paddingBottom: 18 }} showsVerticalScrollIndicator={false}>{messages.map((message) => <View key={message.id} style={[styles.messageRow, message.mine && styles.mine]}><Avatar initials={message.initials} accent={message.mine ? '#f2b5a4' : '#b7d7d0'} size={30} /><View style={[styles.bubble, { backgroundColor: message.mine ? colors.primary : colors.card, borderColor: message.mine ? colors.primary : colors.border }]}><Text style={[styles.sender, { color: message.mine ? colors.primaryForeground : colors.mutedForeground }]}>{message.sender} · {message.time}</Text><Text style={[styles.messageText, { color: message.mine ? colors.primaryForeground : colors.foreground }]}>{message.text}</Text></View></View>)}{thread.typing ? <Text style={[styles.typing, { color: colors.primary }]}>Someone is typing…</Text> : null}</ScrollView>
      <View style={[styles.locationPill, { backgroundColor: colors.muted }]}><Feather name="map-pin" size={13} color={colors.primary} /><Text style={[styles.locationText, { color: colors.foreground }]}>Share a location</Text><Ionicons name="chevron-forward" size={14} color={colors.mutedForeground} /></View>
      <View style={styles.composer}><Pressable onPress={() => Haptics.selectionAsync()} style={[styles.attach, { backgroundColor: colors.card, borderColor: colors.border }]}><Ionicons name="image-outline" size={19} color={colors.foreground} /></Pressable><TextInput value={draft} onChangeText={setDraft} onSubmitEditing={send} placeholder="Say something..." placeholderTextColor={colors.mutedForeground} style={[styles.input, { backgroundColor: colors.card, borderColor: colors.border, color: colors.foreground }]} returnKeyType="send" /><Pressable onPress={send} style={[styles.send, { backgroundColor: colors.primary }]}><Ionicons name="arrow-up" size={19} color={colors.primaryForeground} /></Pressable></View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  threadSummary: { flexDirection: 'row', alignItems: 'center', gap: 9, padding: 11, borderRadius: 17, marginBottom: 12 },
  summaryAvatars: { flexDirection: 'row', gap: -5 },
  summaryText: { fontFamily: 'Inter_600SemiBold', fontSize: 11, flex: 1 },
  messages: { flex: 1, minHeight: 280 },
  messageRow: { flexDirection: 'row', alignItems: 'flex-end', gap: 8, marginVertical: 7, maxWidth: '88%' },
  mine: { alignSelf: 'flex-end', flexDirection: 'row-reverse' },
  bubble: { borderRadius: 17, borderWidth: 1, paddingHorizontal: 12, paddingVertical: 10, flexShrink: 1 },
  sender: { fontFamily: 'Inter_500Medium', fontSize: 9, marginBottom: 4 },
  messageText: { fontFamily: 'Inter_400Regular', fontSize: 13, lineHeight: 19 },
  typing: { fontFamily: 'Inter_600SemiBold', fontSize: 10, marginLeft: 38, marginTop: 4 },
  locationPill: { alignSelf: 'flex-start', borderRadius: 15, paddingHorizontal: 11, paddingVertical: 8, flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 9 },
  locationText: { fontFamily: 'Inter_600SemiBold', fontSize: 10 },
  composer: { flexDirection: 'row', gap: 8, alignItems: 'center' },
  attach: { width: 44, height: 48, borderRadius: 16, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
  input: { flex: 1, height: 48, borderRadius: 16, borderWidth: 1, paddingHorizontal: 13, fontFamily: 'Inter_400Regular', fontSize: 13 },
  send: { width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center' },
});