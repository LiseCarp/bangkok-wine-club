import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Wine, Plus, Edit, Trash2, Trophy, Star } from 'lucide-react'
import { WineForm } from './WineForm'
import { useEvents, useWinesByEvent, useDeleteWine } from '@/hooks/useDatabase'
import type { Wine as WineType } from '@/lib/schema'

export function WineManagement() {
  const [selectedEventId, setSelectedEventId] = useState<number | null>(null)
  const [showWineForm, setShowWineForm] = useState(false)
  const [editingWine, setEditingWine] = useState<WineType | undefined>(undefined)

  const { data: events } = useEvents()
  const { data: wines, isLoading: winesLoading } = useWinesByEvent(selectedEventId || 0)
  const deleteWineMutation = useDeleteWine()

  const handleEditWine = (wine: WineType) => {
    setEditingWine(wine)
    setShowWineForm(true)
  }

  const handleDeleteWine = async (wineId: number) => {
    if (confirm('Are you sure you want to delete this wine? This action cannot be undone.')) {
      try {
        await deleteWineMutation.mutateAsync(wineId)
      } catch (error) {
        console.error('Failed to delete wine:', error)
      }
    }
  }

  const handleCloseWineForm = () => {
    setShowWineForm(false)
    setEditingWine(undefined)
  }

  const completedEvents = events?.filter(event => event.status === 'completed') || []

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Wine Management</h2>
        {selectedEventId && (
          <Button onClick={() => setShowWineForm(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Wine
          </Button>
        )}
      </div>

      {/* Event Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Select Event</CardTitle>
        </CardHeader>
        <CardContent>
          <Select
            value={selectedEventId?.toString() || ''}
            onValueChange={(value) => setSelectedEventId(parseInt(value))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Choose an event to manage wines" />
            </SelectTrigger>
            <SelectContent>
              {completedEvents.map((event) => (
                <SelectItem key={event.id} value={event.id.toString()}>
                  {event.title} - {new Date(event.date).toLocaleDateString()}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Wines List */}
      {selectedEventId && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wine className="h-5 w-5" />
              Event Wines
            </CardTitle>
          </CardHeader>
          <CardContent>
            {winesLoading ? (
              <div className="text-center py-8">Loading wines...</div>
            ) : wines && wines.length > 0 ? (
              <div className="space-y-4">
                {wines
                  .sort((a, b) => (b.rating || 0) - (a.rating || 0))
                  .map((wine) => (
                    <div
                      key={wine.id}
                      className={`p-4 border rounded-lg ${wine.isWinner ? 'border-wine-gold bg-wine-gold/5' : 'border-border'}`}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-semibold text-lg">{wine.name}</h3>
                            {wine.isWinner && (
                              <Trophy className="h-5 w-5 text-wine-gold" />
                            )}
                          </div>

                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-3">
                            <div>
                              <span className="text-muted-foreground">Producer:</span>
                              <p className="font-medium">{wine.producer || 'N/A'}</p>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Vintage:</span>
                              <p className="font-medium">{wine.vintage || 'N/A'}</p>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Region:</span>
                              <p className="font-medium">{wine.region ? `${wine.region}, ${wine.country}` : 'N/A'}</p>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Price:</span>
                              <p className="font-medium">{wine.price ? `${wine.price} THB` : 'N/A'}</p>
                            </div>
                          </div>

                          {wine.grapeVariety && (
                            <div className="mb-2">
                              <Badge variant="outline">{wine.grapeVariety}</Badge>
                            </div>
                          )}

                          {wine.notes && (
                            <p className="text-muted-foreground italic text-sm mb-3">
                              "{wine.notes}"
                            </p>
                          )}
                        </div>

                        <div className="flex items-center gap-4 ml-4">
                          {wine.rating && (
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 text-wine-gold fill-current" />
                              <span className="font-bold">{wine.rating}</span>
                            </div>
                          )}

                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" onClick={() => handleEditWine(wine)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDeleteWine(wine.id)}
                              className="text-red-600 hover:text-red-700"
                              disabled={deleteWineMutation.isPending}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Wine className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground mb-4">No wines added to this event yet.</p>
                <Button onClick={() => setShowWineForm(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add First Wine
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Wine Form Modal */}
      {showWineForm && selectedEventId && (
        <WineForm
          wine={editingWine}
          eventId={selectedEventId}
          onClose={handleCloseWineForm}
          onSuccess={() => {
            // Data will refresh automatically via React Query
          }}
        />
      )}
    </div>
  )
}
