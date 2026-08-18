import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { Meetup } from '@/data/mockData';

type Value = {
  savedPlaces: string[];
  joinedMeetups: string[];
  createdMeetups: Meetup[];
  availability: boolean;
  mood: string;
  toggleSaved: (id: string) => void;
  toggleJoined: (id: string) => void;
  addMeetup: (item: Meetup) => void;
  setAvailability: (value: boolean) => void;
  setMood: (value: string) => void;
};

const Context = createContext<Value | null>(null);
const STORAGE_KEY = 'blink-local-state';

export function BlinkProvider({ children }: { children: React.ReactNode }) {
  const [savedPlaces, setSavedPlaces] = useState<string[]>([]);
  const [joinedMeetups, setJoinedMeetups] = useState<string[]>(['rooftop']);
  const [createdMeetups, setCreatedMeetups] = useState<Meetup[]>([]);
  const [availability, setAvailability] = useState(true);
  const [mood, setMood] = useState('Open to plans');
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then((raw) => {
      if (!raw) return;
      const data = JSON.parse(raw) as Partial<Value>;
      setSavedPlaces(data.savedPlaces ?? []);
      setJoinedMeetups(data.joinedMeetups ?? ['rooftop']);
      setCreatedMeetups(data.createdMeetups ?? []);
      setAvailability(data.availability ?? true);
      setMood(data.mood ?? 'Open to plans');
    }).catch(() => undefined).finally(() => setHydrated(true));
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify({ savedPlaces, joinedMeetups, createdMeetups, availability, mood })).catch(() => undefined);
  }, [availability, createdMeetups, hydrated, joinedMeetups, mood, savedPlaces]);

  const value = useMemo<Value>(() => ({
    savedPlaces,
    joinedMeetups,
    createdMeetups,
    availability,
    mood,
    toggleSaved: (id) => setSavedPlaces((value) => value.includes(id) ? value.filter((item) => item !== id) : [...value, id]),
    toggleJoined: (id) => setJoinedMeetups((value) => value.includes(id) ? value.filter((item) => item !== id) : [...value, id]),
    addMeetup: (item) => setCreatedMeetups((value) => [item, ...value]),
    setAvailability,
    setMood,
  }), [availability, createdMeetups, joinedMeetups, mood, savedPlaces]);

  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export function useBlink() {
  const value = useContext(Context);
  if (!value) throw new Error('useBlink must be used inside BlinkProvider');
  return value;
}