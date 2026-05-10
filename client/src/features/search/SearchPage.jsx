import { useState } from 'react';
import { 
  Search as SearchIcon, Filter, MapPin, 
  Star, Heart, SlidersHorizontal, ArrowUpDown,
  Grid, List, Sparkles, Globe, Plane
} from 'lucide-react';
import { Button, Card, cn } from '@/components/common/UI';

const destinations = [
  { id: 1, name: 'Santorini', country: 'Greece', image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=2012', rating: 4.9, price: 1200, category: 'Luxury' },
  { id: 2, name: 'Kyoto', country: 'Japan', image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=2070', rating: 4.8, price: 2400, category: 'Culture' },
  { id: 3, name: 'Swiss Alps', country: 'Switzerland', image: 'https://images.unsplash.com/photo-1531310197839-ccf54634509e?q=80&w=1965', rating: 5.0, price: 3100, category: 'Adventure' },
  { id: 4, name: 'Bora Bora', country: 'French Polynesia', image: 'https://images.unsplash.com/photo-1532408840957-031d8034aeef?q=80&w=2032', rating: 4.9, price: 4200, category: 'Luxury' },
  { id: 5, name: 'Reykjavik', country: 'Iceland', image: 'https://images.unsplash.com/photo-1504109586057-7a2ae83d1338?q=80&w=2066', rating: 4.7, price: 1900, category: 'Adventure' },
  { id: 6, name: 'Amalfi Coast', country: 'Italy', image: 'https://images.unsplash.com/photo-1633321088355-d0f81134ca3b?q=80&w=2070', rating: 4.9, price: 2800, category: 'Luxury' },
];

export default function SearchPage() {
  const [view, setView] = useState('grid');
  const [activeCategory, setActiveCategory] = useState('All');

  return (
    <div className="space-y-12 pb-20 animate-premium">
      {/* Header & Search Bar */}
      <div className="flex flex-col items-center text-center space-y-10 py-10">
        <div className="space-y-4">
          <div className="flex items-center justify-center gap-3 text-primary">
            <Globe className="h-6 w-6" />
            <span className="text-xs font-black uppercase tracking-[0.2em]">Global Discovery</span>
          </div>
          <h1 className="text-6xl font-black text-secondary tracking-tight">Explore the <span className="text-primary italic">World.</span></h1>
          <p className="text-slate-400 font-bold max-w-2xl mx-auto">Discover thousands of unique destinations curated by our travel experts and powered by local insights.</p>
        </div>

        <div className="w-full max-w-4xl relative group">
          <div className="absolute inset-0 bg-primary/5 blur-[80px] rounded-full group-hover:bg-primary/10 transition-all duration-700" />
          <div className="relative glass h-24 rounded-[32px] p-3 flex items-center gap-4 shadow-2xl border-white/50">
            <div className="flex-1 flex items-center gap-4 px-6 border-r border-slate-100">
              <SearchIcon className="h-6 w-6 text-primary" />
              <input 
                type="text" 
                placeholder="Where do you want to go?" 
                className="bg-transparent border-none outline-none text-lg font-black text-secondary placeholder:text-slate-300 w-full"
              />
            </div>
            <div className="hidden md:flex items-center gap-4 px-6 border-r border-slate-100">
              <Calendar className="h-5 w-5 text-primary" />
              <span className="text-sm font-black text-secondary whitespace-nowrap">Add Dates</span>
            </div>
            <Button size="lg" className="h-16 px-10 shadow-glow rounded-2xl">
              <Plane className="h-5 w-5" />
              Find Trips
            </Button>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="grid lg:grid-cols-12 gap-12">
        {/* Filters Sidebar */}
        <div className="lg:col-span-3 space-y-10">
          <div className="space-y-8">
            <div className="flex items-center justify-between px-2">
              <h3 className="text-xl font-black text-secondary">Filters</h3>
              <button className="text-xs font-black text-primary uppercase tracking-widest hover:underline">Reset</button>
            </div>
            
            <div className="space-y-6">
              <FilterSection title="Category">
                {['All', 'Luxury', 'Adventure', 'Culture', 'Nature', 'City'].map(cat => (
                  <button 
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={cn(
                      "flex items-center justify-between w-full p-4 rounded-2xl text-sm font-bold transition-all",
                      activeCategory === cat 
                        ? "bg-secondary text-white shadow-xl" 
                        : "hover:bg-slate-50 text-slate-500"
                    )}
                  >
                    {cat}
                    {activeCategory === cat && <Sparkles className="h-4 w-4 text-primary" />}
                  </button>
                ))}
              </FilterSection>

              <FilterSection title="Price Range">
                <div className="space-y-6 px-2">
                  <div className="h-1.5 bg-slate-100 rounded-full relative">
                    <div className="absolute h-full bg-primary rounded-full" style={{ left: '20%', right: '30%' }} />
                    <div className="absolute top-1/2 -translate-y-1/2 left-[20%] w-5 h-5 bg-white border-4 border-primary rounded-full shadow-lg cursor-pointer" />
                    <div className="absolute top-1/2 -translate-y-1/2 right-[30%] w-5 h-5 bg-white border-4 border-primary rounded-full shadow-lg cursor-pointer" />
                  </div>
                  <div className="flex justify-between text-xs font-black text-slate-400">
                    <span>$0</span>
                    <span>$5,000+</span>
                  </div>
                </div>
              </FilterSection>

              <FilterSection title="Rating">
                {[5, 4, 3].map(stars => (
                  <label key={stars} className="flex items-center gap-3 p-2 cursor-pointer group">
                    <input type="checkbox" className="w-5 h-5 rounded-lg border-slate-200 text-primary focus:ring-primary/20" />
                    <div className="flex items-center gap-1">
                      {Array.from({ length: stars }).map((_, i) => (
                        <Star key={i} className="h-3.5 w-3.5 text-primary fill-primary" />
                      ))}
                      <span className="text-xs font-black text-slate-400 ml-2">& up</span>
                    </div>
                  </label>
                ))}
              </FilterSection>
            </div>
          </div>
        </div>

        {/* Results Main Area */}
        <div className="lg:col-span-9 space-y-10">
          <div className="flex items-center justify-between px-2">
            <p className="text-sm font-bold text-slate-400">Showing <span className="text-secondary font-black">2,450</span> incredible destinations</p>
            <div className="flex items-center gap-4">
              <div className="flex bg-slate-100 p-1 rounded-xl">
                <button onClick={() => setView('grid')} className={cn("p-2.5 rounded-lg transition-all", view === 'grid' ? "bg-white text-primary shadow-sm" : "text-slate-400")}><Grid className="h-4 w-4" /></button>
                <button onClick={() => setView('list')} className={cn("p-2.5 rounded-lg transition-all", view === 'list' ? "bg-white text-primary shadow-sm" : "text-slate-400")}><List className="h-4 w-4" /></button>
              </div>
              <Button variant="outline" size="sm" className="h-10 border-slate-200 text-secondary gap-2">
                <ArrowUpDown className="h-4 w-4" />
                Sort: Popular
              </Button>
            </div>
          </div>

          <div className={cn(
            "grid gap-10",
            view === 'grid' ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1"
          )}>
            {destinations.map(dest => (
              <DestinationCard key={dest.id} destination={dest} view={view} />
            ))}
          </div>

          <div className="flex justify-center pt-10">
            <Button variant="outline" size="lg" className="h-16 px-12 border-slate-200 text-secondary">Load More Destinations</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function DestinationCard({ destination, view }) {
  return (
    <Card padding="none" className={cn(
      "group overflow-hidden border-none shadow-premium hover:shadow-2xl",
      view === 'list' && "flex flex-col md:flex-row"
    )}>
      <div className={cn(
        "relative overflow-hidden",
        view === 'grid' ? "h-72" : "md:w-80 h-72 md:h-auto"
      )}>
        <img src={destination.image} className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110" alt={destination.name} />
        <div className="absolute top-6 left-6 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl flex items-center gap-1.5 text-xs font-black shadow-xl">
          <Star className="h-4 w-4 text-primary fill-primary" />
          {destination.rating}
        </div>
        <button className="absolute top-6 right-6 h-10 w-10 bg-white/90 backdrop-blur-md rounded-xl flex items-center justify-center hover:bg-primary hover:text-white transition-all text-secondary shadow-xl">
          <Heart className="h-5 w-5" />
        </button>
      </div>

      <div className="flex-1 p-8 space-y-6 text-left">
        <div className="space-y-2">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">{destination.category}</span>
              <h3 className="text-3xl font-black text-secondary group-hover:text-primary transition-colors leading-tight">{destination.name}</h3>
            </div>
            <div className="text-right">
              <p className="text-2xl font-black text-secondary leading-none">${destination.price}</p>
              <p className="text-[10px] font-black uppercase text-slate-400 mt-1">Starting from</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm font-bold text-slate-400">
            <MapPin className="h-4 w-4 text-primary" />
            {destination.country}
          </div>
        </div>

        <p className="text-slate-400 text-sm leading-relaxed line-clamp-2">
          Experience the ultimate {destination.category.toLowerCase()} getaway in {destination.name}. Perfect for those seeking high-fidelity adventure and local authentic experiences.
        </p>

        <div className="pt-6 border-t border-slate-50 flex items-center justify-between">
           <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {[1, 2].map(i => <img key={i} src={`https://i.pravatar.cc/100?u=${i + destination.id}`} className="h-8 w-8 rounded-lg border-2 border-white shadow-sm" alt="user" />)}
              </div>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">124+ Visited</span>
           </div>
           <Button size="sm" className="rounded-xl h-10 px-6">Explore</Button>
        </div>
      </div>
    </Card>
  );
}

function FilterSection({ title, children }) {
  return (
    <div className="space-y-4">
      <h4 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 ml-1">{title}</h4>
      <div className="space-y-2">{children}</div>
    </div>
  );
}
