import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { Wine, X, Star, DollarSign } from 'lucide-react'
import { useCreateWine, useUpdateWine } from '@/hooks/useDatabase'
import type { Wine as WineType, NewWine } from '@/lib/schema'

interface WineFormProps {
  wine?: WineType
  eventId: number
  onClose: () => void
  onSuccess?: () => void
}

export function WineForm({ wine, eventId, onClose, onSuccess }: WineFormProps) {
  const [formData, setFormData] = useState<Partial<NewWine>>({
    eventId,
    name: wine?.name || '',
    producer: wine?.producer || '',
    vintage: wine?.vintage || new Date().getFullYear(),
    region: wine?.region || '',
    country: wine?.country || '',
    grapeVariety: wine?.grapeVariety || '',
    price: wine?.price || 0,
    rating: wine?.rating || 0,
    notes: wine?.notes || '',
    isWinner: wine?.isWinner || false
  })

  const createWineMutation = useCreateWine()
  const updateWineMutation = useUpdateWine()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const wineData: NewWine = {
        eventId,
        name: formData.name!,
        producer: formData.producer || null,
        vintage: formData.vintage || null,
        region: formData.region || null,
        country: formData.country || null,
        grapeVariety: formData.grapeVariety || null,
        price: formData.price || null,
        rating: formData.rating || null,
        notes: formData.notes || null,
        isWinner: formData.isWinner || false
      }

      if (wine) {
        // Update existing wine
        await updateWineMutation.mutateAsync({ id: wine.id, wine: wineData })
      } else {
        // Create new wine
        await createWineMutation.mutateAsync(wineData)
      }

      onSuccess?.()
      onClose()
    } catch (error) {
      console.error('Failed to save wine:', error)
    }
  }

  const handleChange = (field: keyof NewWine, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const isLoading = createWineMutation.isPending || updateWineMutation.isPending

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Wine className="h-5 w-5" />
            {wine ? 'Edit Wine' : 'Add New Wine'}
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Wine Name */}
            <div className="space-y-2">
              <Label htmlFor="name">Wine Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                placeholder="e.g., Domaine de la Côte Pinot Noir 2020"
                required
              />
            </div>

            {/* Producer and Vintage */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="producer">Producer</Label>
                <Input
                  id="producer"
                  value={formData.producer}
                  onChange={(e) => handleChange('producer', e.target.value)}
                  placeholder="e.g., Domaine de la Côte"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="vintage">Vintage</Label>
                <Input
                  id="vintage"
                  type="number"
                  value={formData.vintage}
                  onChange={(e) => handleChange('vintage', parseInt(e.target.value) || null)}
                  placeholder="2020"
                  min="1900"
                  max={new Date().getFullYear() + 2}
                />
              </div>
            </div>

            {/* Region and Country */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="region">Region</Label>
                <Input
                  id="region"
                  value={formData.region}
                  onChange={(e) => handleChange('region', e.target.value)}
                  placeholder="e.g., Burgundy"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Select value={formData.country || ''} onValueChange={(value) => handleChange('country', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="France">France</SelectItem>
                    <SelectItem value="Italy">Italy</SelectItem>
                    <SelectItem value="Spain">Spain</SelectItem>
                    <SelectItem value="Argentina">Argentina</SelectItem>
                    <SelectItem value="Chile">Chile</SelectItem>
                    <SelectItem value="Australia">Australia</SelectItem>
                    <SelectItem value="USA">USA</SelectItem>
                    <SelectItem value="Germany">Germany</SelectItem>
                    <SelectItem value="Portugal">Portugal</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Grape Variety */}
            <div className="space-y-2">
              <Label htmlFor="grapeVariety">Grape Variety</Label>
              <Input
                id="grapeVariety"
                value={formData.grapeVariety}
                onChange={(e) => handleChange('grapeVariety', e.target.value)}
                placeholder="e.g., Pinot Noir, Cabernet Sauvignon, Malbec"
              />
            </div>

            {/* Price and Rating */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price" className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4" />
                  Price (THB)
                </Label>
                <Input
                  id="price"
                  type="number"
                  value={formData.price}
                  onChange={(e) => handleChange('price', parseFloat(e.target.value) || null)}
                  placeholder="1500"
                  min="0"
                  step="0.01"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="rating" className="flex items-center gap-2">
                  <Star className="h-4 w-4" />
                  Rating (1-10)
                </Label>
                <Input
                  id="rating"
                  type="number"
                  value={formData.rating}
                  onChange={(e) => handleChange('rating', parseFloat(e.target.value) || null)}
                  placeholder="8.5"
                  min="1"
                  max="10"
                  step="0.1"
                />
              </div>
            </div>

            {/* Tasting Notes */}
            <div className="space-y-2">
              <Label htmlFor="notes">Tasting Notes</Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => handleChange('notes', e.target.value)}
                placeholder="Describe the wine's characteristics, flavors, and overall impression..."
                rows={3}
              />
            </div>

            {/* Winner Toggle */}
            <div className="flex items-center justify-between">
              <Label htmlFor="isWinner" className="text-sm font-medium">
                Mark as Event Winner
              </Label>
              <Switch
                id="isWinner"
                checked={formData.isWinner}
                onCheckedChange={(checked) => handleChange('isWinner', checked)}
              />
            </div>

            {/* Form Actions */}
            <div className="flex gap-3 pt-4">
              <Button type="submit" disabled={isLoading} className="flex-1">
                {isLoading ? 'Saving...' : (wine ? 'Update Wine' : 'Add Wine')}
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
