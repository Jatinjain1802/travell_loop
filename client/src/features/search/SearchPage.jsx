import { useState } from 'react';
import { 
  Search as SearchIcon, Filter, MapPin, 
  Star, ChevronDown, Grid, List, 
  TrendingUp, Globe, Sparkles
} from 'lucide-react';
import { Button, Card, cn } from '@/components/common/UI';

const destinations = [
  { id: 1, name: 'Bora Bora', country: 'French Polynesia', image: 'https://images.unsplash.com/photo-1500916434205-0c77489c6cf7?q=80&w=1974', rating: 4.9, price: '$3,400', tags: ['Beach', 'Luxury'] },
  { id: 2, name: 'Banff National Park', country: 'Canada', image: 'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?q=80&w=2070', rating: 4.8, price: '$1,800', tags: ['Nature', 'Adventure'] },
  { id: 3, name: 'Chefchaouen', country: 'Morocco', image: 'https://images.unsplash.com/photo-1548682792-2309f7b49742?q=80&w=1974', rating: 4.7, price: '$950', tags: ['Culture', 'City'] },
  { id: 4, name: 'Icelandic Fjords', country: 'Iceland', image: 'https://images.unsplash.com/photo-1476610182048-b716b8518aae?q=80&w=2059', rating: 5.0, price: '$2,200', tags: ['Nature', 'Ice'] },
];

export default function SearchPage() {
  const [viewMode, setViewMode] = useState('grid');

  return (
    <div className="space-y-12 py-6">
      {/* Search & Header */}
      <div className="flex flex-col gap-8">
        <div className="space-y-2">
          <h1 className="text-5xl font-black tracking-tight text-secondary">Find your next <span className="text-primary italic">Adventure</span></h1>
          <p className="text-muted font-medium">Browse through thousands of hand-picked destinations worldwide.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative group">
            <SearchIcon className="absolute left-6 top-1/2 -translate-y-1/2 h-6 w-6 text-muted group-focus-within:text-primary transition-colors" />
            <input 
              type="text" 
              placeholder="Search by city, country or experiences..." 
              className="w-full h-20 pl-16 pr-8 rounded-[32px] glass text-lg font-bold border-none outline-none focus:ring-4 focus:ring-primary/10 transition-all shadow-premium"
            />
          </div>
          <Button size="xl" className="h-20 px-12 shadow-glow">
            <Sparkles className="h-5 w-5" />
            AI Suggestion
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-12">
        {/* Sidebar Filters */}
        <div className="lg:col-span-3 space-y-10">
          <div className="space-y-6">
            <h3 className="text-xl font-black text-secondary flex items-center gap-2">
              <Filter className="h-5 w-5 text-primary" />
              Filters
            </h3>
            
            <FilterSection title="Category">
              <FilterTag label="Adventure" active />
              <FilterTag label="Relaxation" />
              <FilterTag label="Cultural" />
              <FilterTag label="Nature" />
              <FilterTag label="Nightlife" />
            </FilterSection>

            <FilterSection title="Price Range">
              <div className="space-y-4 pt-2">
                <div className="h-2 bg-muted/20 rounded-full relative">
                  <div className="absolute left-0 right-1/4 h-full bg-primary rounded-full" />
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-6 h-6 bg-white border-4 border-primary rounded-full shadow-glow cursor-pointer" />
                  <div className="absolute right-1/4 top-1/2 -translate-y-1/2 w-6 h-6 bg-white border-4 border-primary rounded-full shadow-glow cursor-pointer" />
                </div>
                <div className="flex justify-between text-xs font-black text-muted uppercase tracking-widest">
                  <span>$0</span>
                  <span>$5,000+</span>
                </div>
              </div>
            </FilterSection>

            <FilterSection title="Duration">
              <div className="grid gap-2">
                <Checkbox label="1-3 Days" />
                <Checkbox label="4-7 Days" active />
                <Checkbox label="1-2 Weeks" />
                <Checkbox label="1 Month+" />
              </div>
            </FilterSection>
          </div>

          <Card className="bg-secondary p-8 text-white space-y-6">
            <div className="p-3 bg-white/10 w-fit rounded-2xl">
              <TrendingUp className="h-6 w-6 text-primary" />
            </div>
            <h4 className="text-xl font-black leading-tight">Trending in Europe</h4>
            <p className="text-sm font-bold text-white/50 leading-relaxed">Most people are currently booking trips to Tuscany this season.</p>
            <Button variant="ghost" className="text-primary font-black p-0 hover:bg-transparent">
              View Guide
            </Button>
          </Card>
        </div>

        {/* Results Area */}
        <div className="lg:col-span-9 space-y-8">
          <div className="flex items-center justify-between border-b border-border/60 pb-6">
            <p className="font-black text-secondary">Showing 1,240 Results</p>
            <div className="flex items-center gap-4">
              <div className="flex bg-muted/10 p-1.5 rounded-2xl gap-1">
                <button 
                  onClick={() => setViewMode('grid')}
                  className={cn("p-2.5 rounded-xl transition-all", viewMode === 'grid' ? "bg-white shadow-md text-primary" : "text-muted hover:text-secondary")}
                >
                  <Grid className="h-5 w-5" />
                </button>
                <button 
                  onClick={() => setViewMode('list')}
                  className={cn("p-2.5 rounded-xl transition-all", viewMode === 'list' ? "bg-white shadow-md text-primary" : "text-muted hover:text-secondary")}
                >
                  <List className="h-5 w-5" />
                </button>
              </div>
              <Button variant="outline" className="border-border">
                Sort by: Featured
                <ChevronDown className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className={cn("grid gap-8", viewMode === 'grid' ? "md:grid-cols-2" : "grid-cols-1")}>
            {destinations.map((dest) => (
              <Card key={dest.id} padding="none" className="group overflow-hidden">
                <div className={cn("flex flex-col", viewMode === 'list' && "md:flex-row h-72")}>
                  <div className={cn("relative overflow-hidden", viewMode === 'list' ? "md:w-2/5 h-full" : "h-64")}>
                    <img 
                      src={dest.image} 
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                      alt={dest.name} 
                    />
                    <div className="absolute top-6 left-6 glass px-3 py-1 rounded-full flex items-center gap-1.5 text-sm font-black shadow-xl">
                      <Star className="h-4 w-4 text-accent fill-accent" />
                      {dest.rating}
                    </div>
                  </div>
                  
                  <div className="p-8 flex-1 flex flex-col justify-between space-y-6">
                    <div className="space-y-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-2xl font-black text-secondary group-hover:text-primary transition-colors">{dest.name}</h3>
                          <div className="flex items-center gap-2 text-sm font-bold text-muted">
                            <MapPin className="h-4 w-4 text-primary" />
                            {dest.country}
                          </div>
                        </div>
                        <span className="text-xl font-black text-secondary">{dest.price}</span>
                      </div>
                      <div className="flex flex-wrap gap-2 pt-2">
                        {dest.tags.map(tag => (
                          <span key={tag} className="px-3 py-1 bg-muted/10 text-muted text-[10px] font-black uppercase tracking-widest rounded-lg">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-4 pt-6 border-t border-dashed border-border/60">
                      <Button className="flex-1">Book Trip</Button>
                      <Button variant="outline" className="px-5">Save</Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="flex justify-center pt-10">
            <Button variant="outline" size="lg" className="px-12 border-border font-black">
              Load More Results
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function FilterSection({ title, children }) {
  return (
    <div className="space-y-4">
      <h4 className="text-xs font-black uppercase tracking-[0.2em] text-muted">{title}</h4>
      <div className="flex flex-wrap gap-2">
        {children}
      </div>
    </div>
  );
}

function FilterTag({ label, active }) {
  return (
    <button className={cn(
      "px-4 py-2 rounded-xl text-xs font-black transition-all",
      active ? "bg-primary text-white shadow-glow" : "bg-muted/10 text-muted hover:bg-muted/20"
    )}>
      {label}
    </button>
  );
}

function Checkbox({ label, active }) {
  return (
    <div className="flex items-center gap-3 group cursor-pointer">
      <div className={cn(
        "h-5 w-5 rounded-lg border-2 transition-all flex items-center justify-center",
        active ? "bg-primary border-primary" : "border-border group-hover:border-primary/50"
      )}>
        {active && <div className="h-2 w-2 bg-white rounded-sm" />}
      </div>
      <span className={cn("text-sm font-bold transition-colors", active ? "text-secondary" : "text-muted group-hover:text-secondary")}>
        {label}
      </span>
    </div>
  );
}
