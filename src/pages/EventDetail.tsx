import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Users, Wine, Trophy, MapPin, Star, ArrowLeft } from "lucide-react"
import { Link, useParams } from "react-router-dom"
import Navigation from "@/components/Navigation"
import { useEventWithWines } from "@/hooks/useDatabase"

const EventDetail = () => {
  const { id } = useParams()
  const eventId = id ? parseInt(id) : 0

  const { data: event, isLoading, error } = useEventWithWines(eventId)

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary"></div>
        </div>
      </div>
    )
  }

  if (error || !event) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <Wine className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-foreground mb-2">Event Not Found</h2>
            <p className="text-muted-foreground mb-4">The event you're looking for doesn't exist.</p>
            <Link to="/events">
              <Button>Back to Events</Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // Generate highlights based on event data
  const highlights = [
    `${event.theme} themed tasting`,
    `${event.participants} wine enthusiasts participated`,
    event.wines?.length ? `${event.wines.length} exceptional wines tasted` : "Curated wine selection",
    event.winner ? `Winner: ${event.winner}` : "Memorable tasting experience"
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Header */}
      <section className="py-12 bg-gradient-elegant">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/events" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-6">
            <ArrowLeft className="h-4 w-4" />
            Back to Events
          </Link>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <h1 className="font-serif text-4xl font-bold text-foreground mb-2">
                {event.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {new Date(event.date).toLocaleDateString()}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {event.location}
                </span>
                <span className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  {event.participants} participants
                </span>
              </div>
            </div>
            <div className="flex gap-2">
              <Badge className="bg-wine-gold text-foreground font-medium">
                {event.theme}
              </Badge>
              <Badge variant="outline">
                Max {event.budget}
              </Badge>
            </div>
          </div>

          <p className="text-lg text-muted-foreground leading-relaxed">
            {event.excerpt}
          </p>
        </div>
      </section>

      {/* Wine Results */}
      <section className="py-16 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl font-bold text-foreground mb-8 text-center">
            Wine Tasting Results
          </h2>

          {event.wines && event.wines.length > 0 ? (
            <div className="space-y-6">
              {event.wines
                .sort((a, b) => (b.rating || 0) - (a.rating || 0)) // Sort by rating descending
                .map((wine, index) => (
                  <Card
                    key={wine.id}
                    className={`transition-all duration-300 hover:shadow-elegant ${wine.isWinner ? 'ring-2 ring-wine-gold bg-wine-gold/5' : ''
                      }`}
                  >
                    <CardContent className="p-6">
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-serif text-xl font-semibold text-foreground">
                              {wine.name}
                            </h3>
                            {wine.isWinner && (
                              <Trophy className="h-5 w-5 text-wine-gold" />
                            )}
                            <Badge variant="outline" className="text-xs">
                              Rank #{index + 1}
                            </Badge>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                            <div>
                              <span className="text-sm text-muted-foreground">Producer:</span>
                              <p className="font-medium text-foreground">{wine.producer}</p>
                            </div>
                            <div>
                              <span className="text-sm text-muted-foreground">Region:</span>
                              <p className="font-medium text-foreground">{wine.region}, {wine.country}</p>
                            </div>
                            <div>
                              <span className="text-sm text-muted-foreground">Price:</span>
                              <p className="font-medium text-foreground">{wine.price} THB</p>
                            </div>
                            <div>
                              <span className="text-sm text-muted-foreground">Vintage:</span>
                              <p className="font-medium text-foreground">{wine.vintage}</p>
                            </div>
                          </div>

                          {wine.notes && (
                            <p className="text-muted-foreground italic mb-3">
                              "{wine.notes}"
                            </p>
                          )}
                        </div>

                        <div className="flex flex-col items-end gap-2">
                          <div className="flex items-center gap-2">
                            <Star className="h-5 w-5 text-wine-gold fill-current" />
                            <span className="text-2xl font-bold text-foreground">{wine.rating}</span>
                          </div>
                          <div className="text-sm text-muted-foreground text-right">
                            {wine.grapeVariety}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Wine className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No wines recorded for this event yet.</p>
            </div>
          )}
        </div>
      </section>

      {/* Event Highlights */}
      <section className="py-16 bg-wine-champagne/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl font-bold text-foreground mb-8 text-center">
            Event Highlights
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {highlights.map((highlight, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-wine-gold flex items-center justify-center flex-shrink-0 mt-1">
                  <Wine className="h-3 w-3 text-foreground" />
                </div>
                <p className="text-muted-foreground leading-relaxed">{highlight}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join CTA */}
      <section className="py-16 bg-gradient-wine">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl font-bold text-white mb-4">
            Want to Join Our Next Event?
          </h2>
          <p className="text-xl text-white/90 mb-2">
            Experience exceptional wines with fellow enthusiasts
          </p>
          <p className="text-white/80 mb-8">
            Ready for another amazing wine adventure?
          </p>
          <Link to="/join">
            <Button size="lg" className="bg-wine-gold hover:bg-wine-dark-gold text-foreground font-semibold px-8 py-3 shadow-lg">
              Reserve Your Spot
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}

export default EventDetail