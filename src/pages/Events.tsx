import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Users, Wine, Trophy, MapPin } from "lucide-react"
import { Link } from "react-router-dom"
import Navigation from "@/components/Navigation"

const Events = () => {
  const events = [
    {
      id: 1,
      title: "French Rouges",
      date: "August 15, 2025",
      theme: "French Red Wines",
      budget: "1,500 THB",
      participants: 12,
      winner: "Luccianus Amphore",
      excerpt: "An evening dedicated to the elegance of French Burgundy wines, featuring exceptional reds from Bordeaux to Burgundy.",
      location: "O'Shea's Irish Pub",
      status: "completed"
    },
    {
      id: 2,
      title: "Italian Renaissance",
      date: "July 20, 2025",
      theme: "Italian Red Wines",
      budget: "1,200 THB",
      participants: 15,
      winner: "Tenuta Ulissse Don Antonio",
      excerpt: "A journey through Italy's diverse wine regions, showcasing Tuscany, Piedmont, and Veneto's finest expressions of terroir.",
      location: "Casa Boo",
      status: "completed"
    },
    {
      id: 3,
      title: "Malbec Discovery",
      date: "January 18, 2024",
      theme: "Malbec from Argentina or Anywhere",
      budget: "1,400 THB",
      participants: 14,
      winner: "BenMarco Expresivo 2021",
      excerpt: "Exploring the bold and rich world of Argentine Malbec, from Mendoza's high-altitude vineyards to Bangkok's sophisticated palate.",
      location: "O'Shea's Irish Pub",
      status: "completed"
    },
    // {
    //   id: 4,
    //   title: "Spanish Tempranillo Exploration",
    //   date: "April 20, 2024",
    //   theme: "Spanish Red Wines",
    //   budget: "1,300 THB",
    //   participants: 0,
    //   winner: "",
    //   excerpt: "Discover the diverse expressions of Spain's noble Tempranillo grape from Rioja to Ribera del Duero.",
    //   location: "Sukhumvit Wine Room",
    //   status: "upcoming"
    // },
    // {
    //   id: 5,
    //   title: "New World vs Old World",
    //   date: "May 18, 2024",
    //   theme: "Cabernet Sauvignon",
    //   budget: "1,600 THB",
    //   participants: 0,
    //   winner: "",
    //   excerpt: "A fascinating comparison between classic Bordeaux and innovative New World Cabernet Sauvignons.",
    //   location: "Phrom Phong Tasting Room",
    //   status: "upcoming"
    // },
    // {
    //   id: 6,
    //   title: "Portuguese Gems",
    //   date: "June 15, 2024",
    //   theme: "Portuguese Wines",
    //   budget: "1,100 THB",
    //   participants: 0,
    //   winner: "",
    //   excerpt: "Uncovering Portugal's hidden wine treasures from Douro to Dão, featuring indigenous grape varieties.",
    //   location: "Chatuchak Wine Corner",
    //   status: "upcoming"
    // }
  ]

  const completedEvents = events.filter(event => event.status === "completed")
  const upcomingEvents = events.filter(event => event.status === "upcoming")

  const EventCard = ({ event }: { event: typeof events[0] }) => (
    <Card className="group hover:shadow-elegant transition-all duration-300 overflow-hidden">
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
        {event.status === "upcoming" && (
          <div className="absolute bottom-4 left-4">
            <Badge className="bg-green-500 text-white">
              Upcoming
            </Badge>
          </div>
        )}
      </div>

      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-muted-foreground flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            {event.date}
          </span>
          {event.status === "completed" && (
            <span className="text-sm text-muted-foreground flex items-center gap-1">
              <Users className="h-4 w-4" />
              {event.participants}
            </span>
          )}
        </div>

        <h3 className="font-serif text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
          {event.title}
        </h3>

        <div className="flex items-center gap-2 mb-3 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4" />
          {event.location}
        </div>

        <p className="text-muted-foreground mb-4 line-clamp-2">
          {event.excerpt}
        </p>

        {event.winner && (
          <div className="flex items-center gap-2 mb-4">
            <Trophy className="h-4 w-4 text-wine-gold" />
            <span className="text-sm font-medium text-foreground">Winner:</span>
            <span className="text-sm text-muted-foreground">{event.winner}</span>
          </div>
        )}

        <Link to={`/events/${event.id}`}>
          <Button
            variant="outline"
            size="sm"
            className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
            disabled={event.status === "upcoming"}
          >
            {event.status === "completed" ? "Read Full Report" : "Details Coming Soon"}
          </Button>
        </Link>
      </CardContent>
    </Card>
  )

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="py-16 bg-gradient-elegant">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-serif text-5xl font-bold text-foreground mb-6">
            Wine Club Events
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Join us on a journey through the world's finest wine regions. Each month, we explore a new theme,
            discovering exceptional bottles within our budget and voting for the evening's champion.
          </p>
        </div>
      </section>

      {/* Upcoming Events */}
      {upcomingEvents.length > 0 && (
        <section className="py-16 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-serif text-3xl font-bold text-foreground mb-8 text-center">
              Upcoming Events
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {upcomingEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Past Events */}
      <section className="py-16 bg-wine-champagne/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl font-bold text-foreground mb-8 text-center">
            Past Events & Winners
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {completedEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-wine">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-4xl font-bold text-white mb-6">
            Want to Join Our Next Event?
          </h2>
          <p className="text-xl text-white/90 mb-8 leading-relaxed">
            Spaces are limited and fill up quickly. Reserve your spot and bring your best bottle within the theme!
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

export default Events