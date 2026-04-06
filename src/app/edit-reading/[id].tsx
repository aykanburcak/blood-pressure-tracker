import { useLocalSearchParams } from 'expo-router';
import React from 'react';

import { EditReadingScreen } from '@/features/readings/EditReadingScreen';

export default function EditReadingRoute() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const readingId = Array.isArray(id) ? id[0] : id;
  if (!readingId) {
    return null;
  }
  return <EditReadingScreen readingId={readingId} />;
}
