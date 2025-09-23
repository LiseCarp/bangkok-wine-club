import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Wine, Users, Calendar, Mail, Clock, Heart } from "lucide-react"
import { Link } from "react-router-dom"
import Navigation from "@/components/Navigation"

const Join = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-wine">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-white/10 rounded-full">
              <Wine className="h-16 w-16 text-white" />
            </div>
          </div>
          <h1 className="font-serif text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Join Bangkok Wine Club
          </h1>
          <p className="text-xl text-white/90 mb-8 leading-relaxed max-w-2xl mx-auto">
            Thank you for your interest in joining our exclusive wine community in Bangkok.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="border-2 border-wine-gold/20 shadow-elegant">
            <CardContent className="p-8 md:p-12 text-center">
              <div className="flex justify-center mb-6">
                <div className="p-3 bg-wine-gold/10 rounded-full">
                  <Heart className="h-12 w-12 text-wine-gold" />
                </div>
              </div>

              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-6">
                We're Not Currently Accepting New Members
              </h2>

              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                We truly appreciate your interest in Bangkok Wine Club. To maintain the intimate and
                high-quality experience our current members enjoy, we have temporarily closed membership
                applications.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="flex justify-center mb-3">
                    <Users className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">Intimate Groups</h3>
                  <p className="text-sm text-muted-foreground">
                    Limited to 25 active members for personalized experiences
                  </p>
                </div>

                <div className="text-center">
                  <div className="flex justify-center mb-3">
                    <Wine className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">Quality Focus</h3>
                  <p className="text-sm text-muted-foreground">
                    Curated tastings with exceptional wines under 1,500 THB
                  </p>
                </div>

                <div className="text-center">
                  <div className="flex justify-center mb-3">
                    <Calendar className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">Regular Events</h3>
                  <p className="text-sm text-muted-foreground">
                    Monthly themed tastings in Bangkok's best venues
                  </p>
                </div>
              </div>

              <div className="bg-gradient-elegant p-6 rounded-lg mb-8">
                <h3 className="font-serif text-xl font-semibold text-foreground mb-3">
                  Stay Connected
                </h3>
                <p className="text-muted-foreground mb-4">
                  While we're not accepting new members right now, we'd love to keep you informed
                  about future opportunities and share our wine journey with you.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                    <Mail className="h-4 w-4 mr-2" />
                    Contact Us
                  </Button>
                  <Link to="/events">
                    <Button variant="outline" className="w-full sm:w-auto">
                      <Calendar className="h-4 w-4 mr-2" />
                      View Past Events
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>We'll announce when applications reopen</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-gradient-elegant">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl font-bold text-foreground mb-4">
              What Makes Us Special
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Learn more about our community and what you can expect when membership opens again.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Wine className="h-12 w-12 text-primary" />
              </div>
              <h3 className="text-3xl font-bold text-foreground mb-2">150+</h3>
              <p className="text-muted-foreground">Wines Tasted</p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Users className="h-12 w-12 text-primary" />
              </div>
              <h3 className="text-3xl font-bold text-foreground mb-2">25</h3>
              <p className="text-muted-foreground">Active Members</p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Calendar className="h-12 w-12 text-primary" />
              </div>
              <h3 className="text-3xl font-bold text-foreground mb-2">36</h3>
              <p className="text-muted-foreground">Events Hosted</p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Heart className="h-12 w-12 text-primary" />
              </div>
              <h3 className="text-3xl font-bold text-foreground mb-2">100%</h3>
              <p className="text-muted-foreground">Member Satisfaction</p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link to="/about">
              <Button size="lg" className="bg-gradient-wine text-primary-foreground hover:opacity-90 transition-opacity px-8">
                Learn More About Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Join
