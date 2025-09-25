import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Calendar, MapPin, Users, DollarSign, Wine, X } from 'lucide-react'
import { useCreateEvent, useUpdateEvent } from '@/hooks/useDatabase'
import type { Event, NewEvent } from '@/lib/schema'

interface EventFormProps {
  event?: Event
  onClose: () => void
  onSuccess?: () => void
}

export function EventForm({ event, onClose, onSuccess }: EventFormProps) {
  const [formData, setFormData] = useState<Partial<NewEvent>>({
    title: event?.title || '',
    date: event?.date ? new Date(event.date).toISOString().split('T')[0] : '',
    theme: event?.theme || '',
    budget: event?.budget || '',
    location: event?.location || '',
    excerpt: event?.excerpt || '',
    status: event?.status || 'upcoming',
    participants: event?.participants || 0,
    winner: event?.winner || ''
  })

  const createEventMutation = useCreateEvent()
  const updateEventMutation = useUpdateEvent()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const eventData: NewEvent = {
        title: formData.title!,
        date: new Date(formData.date!),
        theme: formData.theme!,
        budget: formData.budget!,
        location: formData.location!,
        excerpt: formData.excerpt!,
        status: formData.status as 'upcoming' | 'completed' | 'cancelled',
        participants: formData.participants || 0,
        winner: formData.winner || null
      }

      if (event) {
        // Update existing event
        await updateEventMutation.mutateAsync({ id: event.id, event: eventData })
      } else {
        // Create new event
        await createEventMutation.mutateAsync(eventData)
      }

      onSuccess?.()
      onClose()
    } catch (error) {
      console.error('Failed to save event:', error)
    }
  }

  const handleChange = (field: keyof NewEvent, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Wine className="h-5 w-5" />
            {event ? 'Edit Event' : 'Create New Event'}
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title">Event Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value)}
                placeholder="e.g., French Burgundy Night"
                required
              />
            </div>

            {/* Date and Status */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date" className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Date
                </Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => handleChange('date', e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select value={formData.status} onValueChange={(value) => handleChange('status', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="upcoming">Upcoming</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Theme and Budget */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="theme">Theme</Label>
                <Input
                  id="theme"
                  value={formData.theme}
                  onChange={(e) => handleChange('theme', e.target.value)}
                  placeholder="e.g., French Red Wines"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="budget" className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4" />
                  Budget
                </Label>
                <Input
                  id="budget"
                  value={formData.budget}
                  onChange={(e) => handleChange('budget', e.target.value)}
                  placeholder="e.g., 1,500 THB"
                  required
                />
              </div>
            </div>

            {/* Location */}
            <div className="space-y-2">
              <Label htmlFor="location" className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Location
              </Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => handleChange('location', e.target.value)}
                placeholder="e.g., O'Shea's Irish Pub"
                required
              />
            </div>

            {/* Excerpt */}
            <div className="space-y-2">
              <Label htmlFor="excerpt">Description</Label>
              <Textarea
                id="excerpt"
                value={formData.excerpt}
                onChange={(e) => handleChange('excerpt', e.target.value)}
                placeholder="Brief description of the event..."
                rows={3}
                required
              />
            </div>

            {/* Participants and Winner (for completed events) */}
            {formData.status === 'completed' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="participants" className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Participants
                  </Label>
                  <Input
                    id="participants"
                    type="number"
                    value={formData.participants}
                    onChange={(e) => handleChange('participants', parseInt(e.target.value) || 0)}
                    min="0"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="winner">Winning Wine</Label>
                  <Input
                    id="winner"
                    value={formData.winner}
                    onChange={(e) => handleChange('winner', e.target.value)}
                    placeholder="e.g., Domaine de la Côte Pinot Noir 2020"
                  />
                </div>
              </div>
            )}

            {/* Form Actions */}
            <div className="flex gap-3 pt-4">
              <Button
                type="submit"
                disabled={createEventMutation.isPending || updateEventMutation.isPending}
                className="flex-1"
              >
                {(createEventMutation.isPending || updateEventMutation.isPending) ? 'Saving...' : (event ? 'Update Event' : 'Create Event')}
              </Button>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
