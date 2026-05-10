import { Search, MapPin, Calendar, Users, Star, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const popularDestinations = [
  {
    id: 1,
    name: 'Paris',
    country: 'France',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2073',
    rating: 4.9,
    price: '$1,200',
  },
  {
    id: 2,
    name: 'Bali',
    country: 'Indonesia',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=2076',
    rating: 4.8,
    price: '$800',
  },
  {
    id: 3,
    name: 'Rome',
    country: 'Italy',
    image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=80&w=1996',
    rating: 4.7,
    price: '$1,100',
  },
  {
    id: 4,
    name: 'Santorini',
    country: 'Greece',
    image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=2012',
    rating: 4.9,
    price: '$1,500',
  },
];

export default function LandingPage() {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative h-[500px] rounded-3xl overflow-hidden flex items-center justify-center text-white text-center px-4">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-black/40" />
        
        <div className="relative z-10 max-w-3xl space-y-6">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
            Your Next Adventure Starts Here
          </h1>
          <p className="text-xl text-white/90">
            Plan your dream trip, track your expenses, and share your experiences with a global community of travelers.
          </p>

          {/* Search Bar */}
          <div className="bg-white rounded-2xl p-2 shadow-2xl flex flex-col md:flex-row items-center gap-2 max-w-4xl mx-auto mt-8">
            <div className="flex items-center gap-3 px-4 py-2 w-full border-b md:border-b-0 md:border-r border-gray-100">
              <Search className="h-5 w-5 text-gray-400 shrink-0" />
              <input 
                type="text" 
                placeholder="Where to?" 
                className="bg-transparent border-none focus:ring-0 text-gray-900 w-full placeholder:text-gray-400"
              />
            </div>
            <div className="flex items-center gap-3 px-4 py-2 w-full border-b md:border-b-0 md:border-r border-gray-100">
              <Calendar className="h-5 w-5 text-gray-400 shrink-0" />
              <input 
                type="text" 
                placeholder="When?" 
                className="bg-transparent border-none focus:ring-0 text-gray-900 w-full placeholder:text-gray-400"
              />
            </div>
            <div className="flex items-center gap-3 px-4 py-2 w-full">
              <Users className="h-5 w-5 text-gray-400 shrink-0" />
              <input 
                type="text" 
                placeholder="Travelers" 
                className="bg-transparent border-none focus:ring-0 text-gray-900 w-full placeholder:text-gray-400"
              />
            </div>
            <button className="bg-primary text-white px-8 py-3 rounded-xl font-bold hover:bg-primary/90 transition-all w-full md:w-auto">
              Search
            </button>
          </div>
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-foreground">Top Regional Selections</h2>
            <p className="text-muted-foreground mt-1">Handpicked destinations for your next escape</p>
          </div>
          <Link to="/search" className="text-primary font-semibold flex items-center gap-1 hover:underline">
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularDestinations.map((dest) => (
            <div key={dest.id} className="group cursor-pointer">
              <div className="relative h-64 rounded-2xl overflow-hidden mb-4">
                <img 
                  src={dest.image} 
                  alt={dest.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-2 py-1 rounded-lg flex items-center gap-1 text-sm font-bold text-gray-900">
                  <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                  {dest.rating}
                </div>
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-lg text-foreground">{dest.name}</h3>
                  <div className="flex items-center gap-1 text-muted-foreground text-sm">
                    <MapPin className="h-3 w-3" />
                    {dest.country}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-primary font-bold">{dest.price}</div>
                  <div className="text-[10px] text-muted-foreground uppercase tracking-wider">Per Person</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Previous Trips Section */}
      <section className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Your Previous Trips</h2>
            <p className="text-muted-foreground mt-1">Relive your favorite memories</p>
          </div>
          <Link to="/trips" className="text-primary font-semibold hover:underline">
            View history
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { id: 1, title: 'Summer in Swiss Alps', date: 'June 2024', image: 'https://images.unsplash.com/photo-1531310197839-ccf54634509e?q=80&w=1965' },
            { id: 2, title: 'Kyoto Cherry Blossom', date: 'April 2024', image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=2070' },
            { id: 3, title: 'Safari in Kenya', date: 'Jan 2024', image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=2068' },
          ].map((trip) => (
            <Link key={trip.id} to={`/trips/${trip.id}`} className="flex items-center gap-4 p-4 rounded-2xl bg-card border hover:shadow-md transition-all group">
              <div className="h-20 w-20 rounded-xl overflow-hidden shrink-0">
                <img src={trip.image} alt={trip.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
              </div>
              <div>
                <h4 className="font-bold text-foreground line-clamp-1">{trip.title}</h4>
                <p className="text-sm text-muted-foreground">{trip.date}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Plan a Trip CTA */}
      <section className="bg-secondary rounded-3xl p-12 text-center space-y-6 relative overflow-hidden">
        <div className="relative z-10 space-y-6">
          <h2 className="text-4xl font-bold text-white">Ready to start your next trip?</h2>
          <p className="text-white/70 max-w-xl mx-auto">
            Use our smart itinerary builder to organize your travel days, track expenses, and never miss a detail.
          </p>
          <Link 
            to="/trips/create" 
            className="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-2xl font-bold text-lg hover:scale-105 transition-transform"
          >
            Start Planning Now
            <PlaneTakeoff className="h-5 w-5" />
          </Link>
        </div>
        
        {/* Background blobs */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/20 rounded-full blur-[100px]" />
      </section>
    </div>
  );
}

// Re-using icon for CTA
import { PlaneTakeoff } from 'lucide-react';
