import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAllEvents, getEventById, getEventWithWines, createEvent, updateEvent, getAllMembers, createMember, updateMember, deleteMember, getEventStats, getWinesByEvent, createWine, updateWine, deleteWine } from '@/lib/db-utils';
import { fallbackEvents, fallbackStats, fallbackMembers } from '@/data/fallback-data';
import type { NewEvent, NewMember, NewWine } from '@/lib/schema';

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

export function useEventWithWines(id: number) {
  return useQuery({
    queryKey: ['events', id, 'wines'],
    queryFn: async () => {
      try {
        const eventWithWines = await getEventWithWines(id);
        if (eventWithWines) {
          return eventWithWines;
        }
        // Fallback to mock data structure for the specific event
        const fallbackEvent = fallbackEvents.find(e => e.id === id);
        if (fallbackEvent) {
          return {
            ...fallbackEvent,
            wines: [], // No wines in fallback for now
            highlights: [
              "Sample event from fallback data",
              "Database connection not available",
              "Using mock event information"
            ]
          };
        }
        return null;
      } catch (error) {
        console.warn('Database query failed, using fallback data:', error);
        return null;
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
      queryClient.invalidateQueries({ queryKey: ['stats'] });
    },
  });
}

export function useUpdateEvent() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, event }: { id: number; event: Partial<NewEvent> }) => updateEvent(id, event),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
      queryClient.invalidateQueries({ queryKey: ['stats'] });
    },
  });
}

export function useCreateMember() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (member: NewMember) => createMember(member),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['members'] });
      queryClient.invalidateQueries({ queryKey: ['stats'] });
    },
  });
}

export function useUpdateMember() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, member }: { id: number; member: Partial<NewMember> }) => updateMember(id, member),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['members'] });
      queryClient.invalidateQueries({ queryKey: ['stats'] });
    },
  });
}

export function useDeleteMember() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: number) => deleteMember(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['members'] });
      queryClient.invalidateQueries({ queryKey: ['stats'] });
    },
  });
}

// Wine hooks
export function useWinesByEvent(eventId: number) {
  return useQuery({
    queryKey: ['wines', 'event', eventId],
    queryFn: async () => {
      try {
        return await getWinesByEvent(eventId);
      } catch (error) {
        console.warn('Database query failed:', error);
        return [];
      }
    },
    enabled: !!eventId,
  });
}

export function useCreateWine() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (wine: NewWine) => createWine(wine),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['wines'] });
      queryClient.invalidateQueries({ queryKey: ['wines', 'event', variables.eventId] });
      queryClient.invalidateQueries({ queryKey: ['events', variables.eventId, 'wines'] });
      queryClient.invalidateQueries({ queryKey: ['stats'] });
    },
  });
}

export function useUpdateWine() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, wine }: { id: number; wine: Partial<NewWine> }) => updateWine(id, wine),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['wines'] });
      if (variables.wine.eventId) {
        queryClient.invalidateQueries({ queryKey: ['wines', 'event', variables.wine.eventId] });
        queryClient.invalidateQueries({ queryKey: ['events', variables.wine.eventId, 'wines'] });
      }
      queryClient.invalidateQueries({ queryKey: ['stats'] });
    },
  });
}

export function useDeleteWine() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: number) => deleteWine(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wines'] });
      queryClient.invalidateQueries({ queryKey: ['events'] });
      queryClient.invalidateQueries({ queryKey: ['stats'] });
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
