import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Users, Wine, Trophy, MapPin, Star, ArrowLeft } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import Navigation from "@/components/Navigation";

const EventDetail = () => {
  const { id } = useParams();
  
  // Mock event data - in a real app this would come from an API
  const event = {
    id: 1,
    title: "French Burgundy Night",
    date: "March 15, 2024",
    theme: "French Red Wines",
    budget: "1,500 THB",
    participants: 12,
    location: "Silom Wine Bar",
    description: "An evening dedicated to the elegance of French Burgundy wines, featuring exceptional Pinot Noirs from renowned domaines across Côte d'Or. Our members brought an impressive selection showcasing the terroir-driven expressions of this legendary wine region.",
    wines: [
      {
        name: "Domaine de la Côte Pinot Noir 2020",
        producer: "Domaine de la Côte",
        region: "Burgundy, France",
        price: "1,450 THB",
        rating: 9.2,
        votes: 8,
        winner: true,
        notes: "Exceptional elegance with notes of cherry, earth, and subtle spices. Perfect balance and long finish.",
        broughtBy: "Sarah M."
      },
      {
        name: "Louis Jadot Gevrey-Chambertin 2019",
        producer: "Louis Jadot", 
        region: "Burgundy, France",
        price: "1,380 THB",
        rating: 8.8,
        votes: 6,
        notes: "Classic Burgundy character with red fruits, floral hints, and mineral backbone.",
        broughtBy: "James L."
      },
      {
        name: "Bouchard Père & Fils Volnay 2020",
        producer: "Bouchard Père & Fils",
        region: "Burgundy, France", 
        price: "1,200 THB",
        rating: 8.5,
        votes: 4,
        notes: "Silky texture with raspberry and violet notes. Refined and food-friendly.",
        broughtBy: "Marie K."
      },
      {
        name: "Domaine Faiveley Nuits-Saint-Georges 2019",
        producer: "Domaine Faiveley",
        region: "Burgundy, France",
        price: "1,350 THB", 
        rating: 8.3,
        votes: 3,
        notes: "More structured style with dark fruits and earthy undertones. Good aging potential.",
        broughtBy: "David R."
      },
      {
        name: "Albert Bichot Mercurey Rouge 2020",
        producer: "Albert Bichot",
        region: "Burgundy, France",
        price: "980 THB",
        rating: 7.9,
        votes: 2,
        notes: "Great value Burgundy with bright acidity and cherry flavors. Easy drinking.",
        broughtBy: "Lisa T."
      }
    ],
    highlights: [
      "First time featuring exclusively French Burgundy wines",
      "Highest average rating of the year at 8.5/10",
      "Great discussion on terroir differences between villages",
      "Paired beautifully with artisanal French cheeses"
    ],
    nextEvent: {
      title: "Spanish Tempranillo Exploration",
      date: "April 20, 2024",
      theme: "Spanish Red Wines"
    }
  };

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
                  {event.date}
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
            {event.description}
          </p>
        </div>
      </section>

      {/* Wine Results */}
      <section className="py-16 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl font-bold text-foreground mb-8 text-center">
            Wine Tasting Results
          </h2>
          
          <div className="space-y-6">
            {event.wines.map((wine, index) => (
              <Card 
                key={index} 
                className={`transition-all duration-300 hover:shadow-elegant ${
                  wine.winner ? 'ring-2 ring-wine-gold bg-wine-gold/5' : ''
                }`}
              >
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-serif text-xl font-semibold text-foreground">
                          {wine.name}
                        </h3>
                        {wine.winner && (
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
                          <p className="font-medium text-foreground">{wine.region}</p>
                        </div>
                        <div>
                          <span className="text-sm text-muted-foreground">Price:</span>
                          <p className="font-medium text-foreground">{wine.price}</p>
                        </div>
                        <div>
                          <span className="text-sm text-muted-foreground">Brought by:</span>
                          <p className="font-medium text-foreground">{wine.broughtBy}</p>
                        </div>
                      </div>
                      
                      <p className="text-muted-foreground italic mb-3">
                        "{wine.notes}"
                      </p>
                    </div>
                    
                    <div className="flex flex-col items-end gap-2">
                      <div className="flex items-center gap-2">
                        <Star className="h-5 w-5 text-wine-gold fill-current" />
                        <span className="text-2xl font-bold text-foreground">{wine.rating}</span>
                      </div>
                      <div className="text-sm text-muted-foreground text-right">
                        {wine.votes} votes
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Event Highlights */}
      <section className="py-16 bg-wine-champagne/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl font-bold text-foreground mb-8 text-center">
            Event Highlights
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {event.highlights.map((highlight, index) => (
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

      {/* Next Event CTA */}
      <section className="py-16 bg-gradient-wine">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl font-bold text-white mb-4">
            Next Event: {event.nextEvent.title}
          </h2>
          <p className="text-xl text-white/90 mb-2">
            {event.nextEvent.date} • {event.nextEvent.theme}
          </p>
          <p className="text-white/80 mb-8">
            Ready for another amazing wine adventure?
          </p>
          <Button size="lg" className="bg-wine-gold hover:bg-wine-dark-gold text-foreground font-semibold px-8 py-3 shadow-lg">
            Reserve Your Spot
          </Button>
        </div>
      </section>
    </div>
  );
};

export default EventDetail;