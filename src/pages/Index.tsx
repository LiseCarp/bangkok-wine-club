import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Users, Wine, MapPin, Trophy } from "lucide-react"
import { Link } from "react-router-dom"
import Navigation from "@/components/Navigation"
import { useEvents, useStats } from "@/hooks/useDatabase"
import heroImage from "@/assets/hero-wine-tasting.jpg"

const Index = () => {
  const { data: events, isLoading: eventsLoading } = useEvents()
  const { data: stats } = useStats()

  // Get the 3 most recent events for the homepage
  const recentEvents = events?.slice(0, 3) || []

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={heroImage}
            alt="Bangkok Wine Club tasting session"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-wine-deep-red/80 via-wine-burgundy/60 to-transparent"></div>
        </div>

        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="font-serif text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Bangkok Wine Club
          </h1>
          <p className="text-xl md:text-2xl mb-8 font-light max-w-2xl mx-auto leading-relaxed">
            Discovering exceptional wines in the heart of Thailand. Monthly tastings featuring the finest bottles under 1,500 THB.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/join">
              <Button size="lg" className="bg-wine-gold hover:bg-wine-dark-gold text-foreground font-semibold px-8 py-3 shadow-wine">
                Join Our Next Event
              </Button>
            </Link>
            <Link to="/events">
              <Button variant="outline" size="lg" className="border-white text-black hover:bg-white hover:text-foreground px-8 py-3">
                View Past Events
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-elegant">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Wine className="h-12 w-12 text-primary" />
              </div>
              <h3 className="text-3xl font-bold text-foreground mb-2">{stats?.totalWines || 150}+</h3>
              <p className="text-muted-foreground">Wines Tasted</p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Users className="h-12 w-12 text-primary" />
              </div>
              <h3 className="text-3xl font-bold text-foreground mb-2">{stats?.totalMembers || 25}</h3>
              <p className="text-muted-foreground">Active Members</p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Calendar className="h-12 w-12 text-primary" />
              </div>
              <h3 className="text-3xl font-bold text-foreground mb-2">{stats?.totalEvents || 36}</h3>
              <p className="text-muted-foreground">Events Hosted</p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <MapPin className="h-12 w-12 text-primary" />
              </div>
              <h3 className="text-3xl font-bold text-foreground mb-2">12</h3>
              <p className="text-muted-foreground">Countries Explored</p>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Events */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl font-bold text-foreground mb-4">Recent Tastings</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore our latest wine adventures and discover the winning bottles from each themed evening.
            </p>
          </div>

          {eventsLoading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
              <p className="mt-4 text-muted-foreground">Loading events...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {recentEvents.map((event) => (
                <Card key={event.id} className="group hover:shadow-elegant transition-all duration-300 overflow-hidden">
                  <div className="aspect-video bg-gradient-wine relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-wine-burgundy to-wine-deep-red flex items-center justify-center">
                      <Wine className="h-16 w-16 text-white/50" />
                    </div>
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-wine-gold text-foreground font-medium">
                        {event.theme}
                      </Badge>
                    </div>
                    <div className="absolute top-4 right-4">
                      <Badge variant="outline" className="bg-white/90 text-foreground border-white">
                        Max {event.budget}
                      </Badge>
                    </div>
                  </div>

                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {new Date(event.date).toLocaleDateString()}
                      </span>
                      <span className="text-sm text-muted-foreground flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {event.participants}
                      </span>
                    </div>

                    <h3 className="font-serif text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                      {event.title}
                    </h3>

                    <p className="text-muted-foreground mb-4 line-clamp-2">
                      {event.excerpt}
                    </p>

                    <div className="flex items-center gap-2 mb-4">
                      <Trophy className="h-4 w-4 text-wine-gold" />
                      <span className="text-sm font-medium text-foreground">Winner:</span>
                      <span className="text-sm text-muted-foreground">{event.winner}</span>
                    </div>

                    <Link to={`/events/${event.id}`}>
                      <Button variant="outline" size="sm" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        Read Full Report
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link to="/events">
              <Button size="lg" className="bg-gradient-wine text-primary-foreground hover:opacity-90 transition-opacity px-8">
                View All Events
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-wine">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-4xl font-bold text-white mb-6">
            Ready to Join Our Wine Journey?
          </h2>
          <p className="text-xl text-white/90 mb-8 leading-relaxed">
            Experience Bangkok's most exclusive wine club. Monthly themed tastings, passionate community, and exceptional wines await you.
          </p>
          <Link to="/join">
            <Button size="lg" className="bg-wine-gold hover:bg-wine-dark-gold text-foreground font-semibold px-8 py-3 shadow-lg">
              Join Bangkok Wine Club
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Index

