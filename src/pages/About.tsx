import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Wine, Users, MapPin, Calendar, Mail, MessageCircle } from "lucide-react";
import Navigation from "@/components/Navigation";

const About = () => {
  const teamMembers = [
    {
      name: "Alex Chen",
      role: "Club Founder",
      bio: "Wine enthusiast with 15 years of tasting experience. Certified sommelier who discovered Bangkok's hidden wine gems.",
      avatar: "AC"
    },
    {
      name: "Sarah Martinez",
      role: "Event Coordinator", 
      bio: "Expert in wine logistics and event planning. Ensures every tasting runs smoothly and memorably.",
      avatar: "SM"
    },
    {
      name: "James Richardson",
      role: "Wine Educator",
      bio: "Passionate about wine education and terroir. Leads our tasting discussions and scoring methodology.",
      avatar: "JR"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="py-16 bg-gradient-elegant">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-serif text-5xl font-bold text-foreground mb-6">
            About Bangkok Wine Club
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            A passionate community of wine lovers exploring the world's finest bottles 
            in the heart of Bangkok, Thailand.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl font-bold text-foreground mb-8 text-center">
            Our Story
          </h2>
          
          <div className="prose prose-lg mx-auto text-muted-foreground leading-relaxed">
            <p className="mb-6">
              Founded in 2021, Bangkok Wine Club began as a small gathering of expatriates and locals 
              who shared a passion for exceptional wine. What started as monthly dinners among friends 
              has evolved into Bangkok's most exclusive wine tasting community.
            </p>
            
            <p className="mb-6">
              Our mission is simple: to discover and appreciate the world's finest wines within accessible 
              price ranges, typically under 1,500 THB per bottle. Each month, we explore a different theme – 
              from Argentine Malbecs to French Burgundies – allowing our members to broaden their palates 
              and knowledge.
            </p>
            
            <p className="mb-6">
              What makes us unique is our democratic approach to wine appreciation. Every member votes on 
              each wine, and we crown a winner each evening. This collaborative tasting methodology has 
              helped us discover hidden gems and develop a deeper understanding of what makes a truly 
              exceptional bottle.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-wine-champagne/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl font-bold text-foreground mb-12 text-center">
            How Our Tastings Work
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-elegant transition-all duration-300">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gradient-wine rounded-full flex items-center justify-center mx-auto mb-6">
                  <Wine className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-serif text-xl font-semibold text-foreground mb-4">
                  Monthly Themes
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Each event focuses on a specific wine style, region, or grape variety. 
                  Themes are announced two weeks in advance with budget guidelines.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-elegant transition-all duration-300">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gradient-gold rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="h-8 w-8 text-foreground" />
                </div>
                <h3 className="font-serif text-xl font-semibold text-foreground mb-4">
                  Collaborative Tasting
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Members bring one bottle within the theme and budget. We taste blind, 
                  discuss each wine, and vote for our favorites.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-elegant transition-all duration-300">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gradient-wine rounded-full flex items-center justify-center mx-auto mb-6">
                  <MessageCircle className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-serif text-xl font-semibold text-foreground mb-4">
                  Learning & Sharing
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  After each event, we document our findings, share tasting notes, 
                  and celebrate the evening's winning bottle.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl font-bold text-foreground mb-12 text-center">
            Meet Our Team
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="text-center hover:shadow-elegant transition-all duration-300">
                <CardContent className="p-8">
                  <div className="w-20 h-20 bg-gradient-wine rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-lg">{member.avatar}</span>
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-foreground mb-2">
                    {member.name}
                  </h3>
                  <Badge className="bg-wine-gold text-foreground mb-4">
                    {member.role}
                  </Badge>
                  <p className="text-muted-foreground leading-relaxed">
                    {member.bio}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-gradient-elegant">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-foreground mb-2">36</div>
              <div className="text-muted-foreground">Events Hosted</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-foreground mb-2">150+</div>
              <div className="text-muted-foreground">Wines Tasted</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-foreground mb-2">25</div>
              <div className="text-muted-foreground">Active Members</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-foreground mb-2">12</div>
              <div className="text-muted-foreground">Countries Explored</div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-16 bg-gradient-wine">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-4xl font-bold text-white mb-6">
            Ready to Join Our Community?
          </h2>
          <p className="text-xl text-white/90 mb-8 leading-relaxed">
            Spaces are limited to maintain an intimate tasting environment. 
            Contact us to learn about membership and upcoming events.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-wine-gold hover:bg-wine-dark-gold text-foreground font-semibold px-8 py-3 shadow-lg">
              <Mail className="h-5 w-5 mr-2" />
              Contact Us
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-foreground px-8 py-3">
              <Calendar className="h-5 w-5 mr-2" />
              View Next Event
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;