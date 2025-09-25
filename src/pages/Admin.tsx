import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Calendar, Users, Wine, Plus, Edit, Trash2, Settings } from 'lucide-react'
import Navigation from '@/components/Navigation'
import { DataMigration } from '@/components/DataMigration'
import { useEvents, useMembers, useStats } from '@/hooks/useDatabase'

const Admin = () => {
  const { data: events, isLoading: eventsLoading } = useEvents()
  const { data: members, isLoading: membersLoading } = useMembers()
  const { data: stats } = useStats()

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Header */}
      <section className="py-8 bg-gradient-wine">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="font-serif text-4xl font-bold text-white mb-4">
              Admin Panel
            </h1>
            <p className="text-xl text-white/90">
              Manage your Bangkok Wine Club data
            </p>
          </div>
        </div>
      </section>

      {/* Stats Overview */}
      <section className="py-8 bg-gradient-elegant">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6 text-center">
                <Calendar className="h-8 w-8 text-primary mx-auto mb-2" />
                <h3 className="text-2xl font-bold">{stats?.totalEvents || 0}</h3>
                <p className="text-muted-foreground">Total Events</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Users className="h-8 w-8 text-primary mx-auto mb-2" />
                <h3 className="text-2xl font-bold">{stats?.totalMembers || 0}</h3>
                <p className="text-muted-foreground">Active Members</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Wine className="h-8 w-8 text-primary mx-auto mb-2" />
                <h3 className="text-2xl font-bold">{stats?.totalWines || 0}</h3>
                <p className="text-muted-foreground">Wines Tasted</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="events" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="events">Events</TabsTrigger>
              <TabsTrigger value="members">Members</TabsTrigger>
              <TabsTrigger value="wines">Wines</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            {/* Events Tab */}
            <TabsContent value="events" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Events Management</h2>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Event
                </Button>
              </div>

              {eventsLoading ? (
                <div className="text-center py-8">Loading events...</div>
              ) : (
                <div className="grid grid-cols-1 gap-4">
                  {events?.map((event) => (
                    <Card key={event.id}>
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="font-semibold text-lg">{event.title}</h3>
                              <Badge variant={event.status === 'completed' ? 'default' : 'secondary'}>
                                {event.status}
                              </Badge>
                            </div>
                            <p className="text-muted-foreground mb-2">{event.theme}</p>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <span>📅 {new Date(event.date).toLocaleDateString()}</span>
                              <span>📍 {event.location}</span>
                              <span>👥 {event.participants} participants</span>
                              <span>💰 {event.budget}</span>
                            </div>
                            {event.winner && (
                              <p className="text-sm mt-2">
                                <span className="font-medium">Winner:</span> {event.winner}
                              </p>
                            )}
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            {/* Members Tab */}
            <TabsContent value="members" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Members Management</h2>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Member
                </Button>
              </div>

              {membersLoading ? (
                <div className="text-center py-8">Loading members...</div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {members?.map((member) => (
                    <Card key={member.id}>
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="font-semibold">{member.name}</h3>
                            <p className="text-sm text-muted-foreground">{member.email}</p>
                          </div>
                          <Badge variant={member.isActive ? 'default' : 'secondary'}>
                            {member.isActive ? 'Active' : 'Inactive'}
                          </Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <Badge variant="outline">{member.role}</Badge>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            {/* Wines Tab */}
            <TabsContent value="wines" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Wines Management</h2>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Wine
                </Button>
              </div>
              <div className="text-center py-8 text-muted-foreground">
                Wine management coming soon...
              </div>
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings" className="space-y-6">
              <h2 className="text-2xl font-bold mb-6">Settings</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Data Migration</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <DataMigration />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Database Tools</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button variant="outline" className="w-full">
                      <Settings className="h-4 w-4 mr-2" />
                      Open Database Studio
                    </Button>
                    <p className="text-sm text-muted-foreground">
                      Access Drizzle Studio to view and manage your database directly.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  )
}

export default Admin
