import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAllEvents, getEventById, createEvent, getAllMembers, getEventStats } from '@/lib/db-utils';
import { fallbackEvents, fallbackStats, fallbackMembers } from '@/data/fallback-data';
import type { NewEvent } from '@/lib/schema';

// Events hooks
export function useEvents() {
  return useQuery({
    queryKey: ['events'],
    queryFn: async () => {
      try {
        const events = await getAllEvents();
        // If database returns empty array but we expect data, use fallback
        return events.length > 0 ? events : fallbackEvents;
      } catch (error) {
        console.warn('Database query failed, using fallback data:', error);
        return fallbackEvents;
      }
    },
  });
}

export function useEvent(id: number) {
  return useQuery({
    queryKey: ['events', id],
    queryFn: async () => {
      try {
        const event = await getEventById(id);
        return event || fallbackEvents.find(e => e.id === id);
      } catch (error) {
        console.warn('Database query failed, using fallback data:', error);
        return fallbackEvents.find(e => e.id === id);
      }
    },
    enabled: !!id,
  });
}

export function useCreateEvent() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (event: NewEvent) => createEvent(event),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
    },
  });
}

// Members hooks
export function useMembers() {
  return useQuery({
    queryKey: ['members'],
    queryFn: async () => {
      try {
        const members = await getAllMembers();
        return members.length > 0 ? members : fallbackMembers;
      } catch (error) {
        console.warn('Database query failed, using fallback data:', error);
        return fallbackMembers;
      }
    },
  });
}

// Stats hooks
export function useStats() {
  return useQuery({
    queryKey: ['stats'],
    queryFn: async () => {
      try {
        const stats = await getEventStats();
        // If all stats are 0, use fallback
        if (stats.totalEvents === 0 && stats.totalMembers === 0 && stats.totalWines === 0) {
          return fallbackStats;
        }
        return stats;
      } catch (error) {
        console.warn('Database query failed, using fallback data:', error);
        return fallbackStats;
      }
    },
  });
}
