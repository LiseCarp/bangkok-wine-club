import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAllEvents, getEventById, createEvent, getAllMembers, getEventStats } from '@/lib/db-utils';
import type { NewEvent } from '@/lib/schema';

// Events hooks
export function useEvents() {
  return useQuery({
    queryKey: ['events'],
    queryFn: getAllEvents,
  });
}

export function useEvent(id: number) {
  return useQuery({
    queryKey: ['events', id],
    queryFn: () => getEventById(id),
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
    queryFn: getAllMembers,
  });
}

// Stats hooks
export function useStats() {
  return useQuery({
    queryKey: ['stats'],
    queryFn: getEventStats,
  });
}
