import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { User, Mail, Shield, X } from 'lucide-react'
import { useCreateMember } from '@/hooks/useDatabase'
import type { Member, NewMember } from '@/lib/schema'

interface MemberFormProps {
  member?: Member
  onClose: () => void
  onSuccess?: () => void
}

export function MemberForm({ member, onClose, onSuccess }: MemberFormProps) {
  const [formData, setFormData] = useState<Partial<NewMember>>({
    name: member?.name || '',
    email: member?.email || '',
    role: member?.role || 'member',
    isActive: member?.isActive ?? true
  })

  const createMemberMutation = useCreateMember()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const memberData: NewMember = {
        name: formData.name!,
        email: formData.email!,
        role: formData.role as 'member' | 'organizer' | 'admin',
        isActive: formData.isActive ?? true
      }

      await createMemberMutation.mutateAsync(memberData)
      onSuccess?.()
      onClose()
    } catch (error) {
      console.error('Failed to save member:', error)
    }
  }

  const handleChange = (field: keyof NewMember, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            {member ? 'Edit Member' : 'Add New Member'}
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Full Name
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                placeholder="e.g., Alex Chen"
                required
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                placeholder="e.g., alex@bangkokwineclub.com"
                required
              />
            </div>

            {/* Role */}
            <div className="space-y-2">
              <Label htmlFor="role" className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Role
              </Label>
              <Select value={formData.role} onValueChange={(value) => handleChange('role', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="member">Member</SelectItem>
                  <SelectItem value="organizer">Organizer</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Active Status */}
            <div className="flex items-center justify-between">
              <Label htmlFor="isActive" className="text-sm font-medium">
                Active Member
              </Label>
              <Switch
                id="isActive"
                checked={formData.isActive}
                onCheckedChange={(checked) => handleChange('isActive', checked)}
              />
            </div>

            {/* Role Descriptions */}
            <div className="text-xs text-muted-foreground bg-muted p-3 rounded-md">
              <p><strong>Member:</strong> Can attend events and rate wines</p>
              <p><strong>Organizer:</strong> Can manage events and view reports</p>
              <p><strong>Admin:</strong> Full access to all features</p>
            </div>

            {/* Form Actions */}
            <div className="flex gap-3 pt-4">
              <Button type="submit" disabled={createMemberMutation.isPending} className="flex-1">
                {createMemberMutation.isPending ? 'Saving...' : (member ? 'Update Member' : 'Add Member')}
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
