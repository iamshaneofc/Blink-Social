import { Feather, Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import React, { useState } from 'react';
import { ImageBackground, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { Avatar, Label } from '@/components/BlinkUI';
import { Screen, TopBar } from '@/components/ScreenKit';
import { stories } from '@/data/mockData';
import { useColors } from '@/hooks/useColors';

export default function StoriesScreen() {
  const colors = useColors();
  const [index, setIndex] = useState(0);
  const [reply, setReply] = useState('');
  const story = stories[index];
  const next = () => { setIndex((value) => (value + 1) % stories.length); Haptics.selectionAsync(); };
  return (
    <Screen>
      <TopBar eyebrow="CITY MOMENTS" title="Stories" />
      <View style={[styles.story, { backgroundColor: story.accent }]}>
        {story.image ? <ImageBackground source={story.image} resizeMode="cover" style={StyleSheet.absoluteFillObject} imageStyle={{ opacity: 0.92 }} /> : <View style={[styles.storyOrb, { backgroundColor: colors.card }]} />}
        <View style={styles.scrim} />
        <View style={styles.progress}>{stories.map((item, itemIndex) => <View key={item.id} style={[styles.progressTrack, { backgroundColor: 'rgba(255,255,255,.4)' }]}><View style={[styles.progressFill, { backgroundColor: itemIndex <= index ? colors.card : 'transparent' }]} /></View>)}</View>
        <View style={styles.storyTop}><View style={styles.creator}><Avatar initials={story.initials} accent="#f2b5a4" size={38} /><View><Text style={[styles.creatorName, { color: colors.foreground }]}>{story.creator}</Text><Text style={[styles.storyLocation, { color: colors.foreground }]}>{story.location}</Text></View></View><Pressable onPress={() => Haptics.selectionAsync()}><Ionicons name="ellipsis-horizontal" size={22} color={colors.foreground} /></Pressable></View>
        <View style={styles.storyCopy}><View style={[styles.locationSticker, { backgroundColor: colors.card }]}><Feather name="map-pin" size={12} color={colors.primary} /><Text style={[styles.locationStickerText, { color: colors.foreground }]}>{story.location}</Text></View><Text style={[styles.storyTitle, { color: colors.foreground }]}>{story.title}</Text><Text style={[styles.storyCaption, { color: colors.foreground }]}>{story.caption}</Text></View>
        <View style={styles.storyBottom}><View style={styles.reactions}>{['❤️', '🔥', '👏'].map((emoji) => <Pressable key={emoji} onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)} style={styles.emoji}><Text style={styles.emojiText}>{emoji}</Text></Pressable>)}</View><Pressable onPress={next} style={[styles.next, { backgroundColor: colors.card }]}><Ionicons name="arrow-forward" size={20} color={colors.foreground} /></Pressable></View>
      </View>
      <View style={[styles.reply, { backgroundColor: colors.card, borderColor: colors.border }]}><TextInput value={reply} onChangeText={setReply} placeholder="Reply to this moment..." placeholderTextColor={colors.mutedForeground} style={[styles.replyInput, { color: colors.foreground }]} /><Pressable onPress={() => { setReply(''); Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); }}><Ionicons name="send" size={18} color={colors.primary} /></Pressable></View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  story: { height: 555, borderRadius: 27, overflow: 'hidden', padding: 16, justifyContent: 'space-between' },
  storyOrb: { position: 'absolute', width: 230, height: 230, borderRadius: 115, right: -55, top: 80, opacity: 0.33 },
  scrim: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(255,255,255,.08)' },
  progress: { flexDirection: 'row', gap: 5, zIndex: 2 },
  progressTrack: { flex: 1, height: 3, borderRadius: 2, overflow: 'hidden' },
  progressFill: { height: '100%', borderRadius: 2 },
  storyTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', zIndex: 2, marginTop: 13 },
  creator: { flexDirection: 'row', alignItems: 'center', gap: 9 },
  creatorName: { fontFamily: 'Inter_700Bold', fontSize: 12 },
  storyLocation: { fontFamily: 'Inter_500Medium', fontSize: 10, marginTop: 3 },
  storyCopy: { zIndex: 2, marginBottom: 25 },
  locationSticker: { alignSelf: 'flex-start', flexDirection: 'row', alignItems: 'center', gap: 5, borderRadius: 13, paddingHorizontal: 9, paddingVertical: 7, marginBottom: 13 },
  locationStickerText: { fontFamily: 'Inter_600SemiBold', fontSize: 10 },
  storyTitle: { fontFamily: 'Inter_700Bold', fontSize: 30, letterSpacing: -1, lineHeight: 34 },
  storyCaption: { fontFamily: 'Inter_500Medium', fontSize: 13, lineHeight: 19, marginTop: 7, maxWidth: 280 },
  storyBottom: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', zIndex: 2 },
  reactions: { flexDirection: 'row', gap: 7 },
  emoji: { width: 42, height: 42, borderRadius: 21, backgroundColor: 'rgba(255,255,255,.72)', alignItems: 'center', justifyContent: 'center' },
  emojiText: { fontSize: 18 },
  next: { width: 46, height: 46, borderRadius: 23, alignItems: 'center', justifyContent: 'center' },
  reply: { minHeight: 50, borderRadius: 17, borderWidth: 1, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14, marginTop: 12 },
  replyInput: { flex: 1, fontFamily: 'Inter_400Regular', fontSize: 13 },
});