import { Button } from "@/components/ui/button"
import { Wine, Calendar, Users, MapPin } from "lucide-react"
import { Link } from "react-router-dom"

const Navigation = () => {
  return (
    <nav className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Wine className="h-8 w-8 text-primary" />
            <span className="font-serif text-2xl font-semibold text-foreground">Bangkok Wine Club</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-foreground hover:text-primary transition-colors font-medium">
              Home
            </Link>
            <Link to="/events" className="text-foreground hover:text-primary transition-colors font-medium">
              Events
            </Link>
            <Link to="/about" className="text-foreground hover:text-primary transition-colors font-medium">
              About
            </Link>
            <Link to="/join">
              <Button variant="default" size="sm" className="bg-gradient-wine text-primary-foreground hover:opacity-90 transition-opacity">
                Join Club
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" size="sm">
              <Wine className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navigation