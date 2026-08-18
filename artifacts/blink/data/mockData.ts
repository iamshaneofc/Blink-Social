import type { ImageSourcePropType } from 'react-native';

export type Mode = { id: string; label: string; icon: string; keywords: string[] };
export type Person = { id: string; name: string; initials: string; bio: string; mood: string; intent: string; distance: string; interests: string[]; accent: string };
export type Meetup = { id: string; title: string; description: string; location: string; distance: string; time: string; intent: string; participants: number; host: string; category: string; isLive: boolean; latitude: number; longitude: number; accent: string; image?: ImageSourcePropType };
export type Place = { id: string; name: string; category: string; distance: string; rating: string; activity: string; tags: string[]; latitude: number; longitude: number; accent: string; image?: ImageSourcePropType };

export const modes: Mode[] = [
  { id: 'for-you', label: 'For You', icon: 'star', keywords: ['nearby', 'social'] },
  { id: 'foodie', label: 'Foodie', icon: 'coffee', keywords: ['food', 'brunch', 'cafe'] },
  { id: 'fitness', label: 'Fitness', icon: 'activity', keywords: ['fitness', 'run', 'wellness', 'park'] },
  { id: 'geeks', label: 'Geeks', icon: 'cpu', keywords: ['coding', 'tech', 'coworking', 'design'] },
  { id: 'adventure', label: 'Adventure', icon: 'compass', keywords: ['adventure', 'nature', 'walk'] },
  { id: 'entertainment', label: 'Entertainment', icon: 'play-circle', keywords: ['music', 'film', 'nightlife'] },
  { id: 'explore', label: 'Explore', icon: 'map', keywords: ['city', 'history', 'nearby'] },
  { id: 'hidden-gems', label: 'Hidden Gems', icon: 'heart', keywords: ['hidden', 'local', 'quiet'] },
];

export const people: Person[] = [
  { id: 'anika', name: 'Anika Rao', initials: 'AR', bio: 'Designing systems and collecting tiny city stories.', mood: 'Making things', intent: 'Open to a coffee', distance: '240 m', interests: ['Design', 'Startups', 'Coffee'], accent: '#f2b5a4' },
  { id: 'rohan', name: 'Rohan Mehta', initials: 'RM', bio: 'Weekend runner, weekday builder.', mood: 'Up for a run', intent: 'Looking for a crew', distance: '480 m', interests: ['Running', 'Tech', 'Parks'], accent: '#b7d7d0' },
  { id: 'mira', name: 'Mira Kapoor', initials: 'MK', bio: 'Here for good food and better conversations.', mood: 'Out exploring', intent: 'Finding dinner', distance: '710 m', interests: ['Food', 'Films', 'Travel'], accent: '#f4d58b' },
  { id: 'dev', name: 'Dev Iyer', initials: 'DI', bio: 'Street photographer chasing late afternoon light.', mood: 'Wandering', intent: 'Photo walk', distance: '1.1 km', interests: ['Photography', 'History', 'Nature'], accent: '#b6c7e8' },
];

export const meetups: Meetup[] = [
  { id: 'rooftop', title: 'Sunset rooftop hangs', description: 'A few of us are sharing snacks and playlists above the city. Come say hi.', location: 'The Terrace, Indiranagar', distance: '350 m', time: 'Live now', intent: 'Meet new people', participants: 12, host: 'Maya S.', category: 'Social', isLive: true, latitude: 12.9363, longitude: 77.6262, accent: '#f5bd9e', image: require('../assets/images/blink-rooftop.jpg') },
  { id: 'focus', title: 'Quiet co-work sprint', description: 'Two focused hours, good coffee, zero awkward networking.', location: 'Paper Boat Cafe', distance: '620 m', time: 'Today · 4:30 PM', intent: 'Work together', participants: 6, host: 'Karan P.', category: 'Geeks', isLive: false, latitude: 12.9338, longitude: 77.6244, accent: '#c3d4eb' },
  { id: 'walk', title: 'Old Bangalore photo walk', description: 'Slow streets, old facades, and a camera-friendly group.', location: 'Starting at 100 Feet Road', distance: '1.4 km', time: 'Tomorrow · 7:00 AM', intent: 'Explore together', participants: 9, host: 'Dev I.', category: 'Adventure', isLive: false, latitude: 12.9288, longitude: 77.6198, accent: '#c5dcb9' },
  { id: 'dumplings', title: 'Dumpling table for four', description: 'Trying the new spot around the corner. There are two seats left.', location: 'Bao House', distance: '900 m', time: 'Today · 8:00 PM', intent: 'Find dinner company', participants: 2, host: 'Mira K.', category: 'Foodie', isLive: false, latitude: 12.9401, longitude: 77.6302, accent: '#f0c8cb' },
];

export const places: Place[] = [
  { id: 'paper-boat', name: 'Paper Boat Cafe', category: 'Cafe · Coworking', distance: '620 m', rating: '4.7', activity: '8 Blinkers here', tags: ['Study-friendly', 'Quiet corners', 'Wi-Fi'], latitude: 12.9338, longitude: 77.6244, accent: '#cadbea', image: require('../assets/images/blink-hidden-cafe.jpg') },
  { id: 'cubbon', name: 'Cubbon Park', category: 'Park · Outdoors', distance: '1.8 km', rating: '4.8', activity: '14 people nearby', tags: ['Morning walks', 'Nature', 'Open air'], latitude: 12.9763, longitude: 77.5929, accent: '#bfd9c4' },
  { id: 'bao-house', name: 'Bao House', category: 'Restaurant · Asian', distance: '900 m', rating: '4.6', activity: '2 planning dinner', tags: ['Late night', 'Groups', 'New'], latitude: 12.9401, longitude: 77.6302, accent: '#f0c8cb' },
  { id: 'terrace', name: 'The Terrace', category: 'Rooftop · Drinks', distance: '350 m', rating: '4.5', activity: 'Live meetup here', tags: ['Sunset', 'Music', 'Social'], latitude: 12.9363, longitude: 77.6262, accent: '#f5bd9e' },
];

export const collections = [
  { title: 'Coffees under ₹300', sub: 'Easy on the wallet', icon: 'coffee', color: '#d7c3a8' },
  { title: 'Best views nearby', sub: 'Worth the detour', icon: 'eye', color: '#b9cce5' },
  { title: 'Study-friendly places', sub: 'Get in the zone', icon: 'book-open', color: '#bfd8c9' },
  { title: 'Hidden local spots', sub: 'Keep it between us', icon: 'heart', color: '#edc2c2' },
];

export const city = [
  { title: 'Nature', count: '18 spots', icon: 'sun', color: '#c3dcb7' },
  { title: 'Food', count: '42 places', icon: 'coffee', color: '#f3cba5' },
  { title: 'Wellness', count: '12 nearby', icon: 'activity', color: '#bfd7d5' },
  { title: 'History', count: '9 walks', icon: 'archive', color: '#d8c8b2' },
];

export const mapFilters = [
  { id: 'live', label: 'Live Now', icon: 'radio' },
  { id: 'meetups', label: 'Meetups', icon: 'users' },
  { id: 'events', label: 'Events', icon: 'calendar' },
  { id: 'communities', label: 'Communities', icon: 'message-circle' },
  { id: 'places', label: 'Places For You', icon: 'heart' },
  { id: 'nearby', label: 'Nearby', icon: 'navigation' },
];