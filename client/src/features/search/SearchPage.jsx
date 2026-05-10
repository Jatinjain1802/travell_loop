import { useState } from 'react';
import { Search, MapPin, Star, Filter, SlidersHorizontal, ChevronRight, Globe, Compass } from 'lucide-react';

const mockPlaces = [
  { id: 1, name: 'Santorini', country: 'Greece', rating: 4.9, category: 'Beach', image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=2012' },
  { id: 2, name: 'Kyoto', country: 'Japan', rating: 4.8, category: 'Cultural', image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=2070' },
  { id: 3, name: 'Zermatt', country: 'Switzerland', rating: 4.9, category: 'Mountain', image: 'https://images.unsplash.com/photo-1531310197839-ccf54634509e?q=80&w=1965' },
  { id: 4, name: 'Reykjavik', country: 'Iceland', rating: 4.7, category: 'Nature', image: 'https://images.unsplash.com/photo-1504109586057-7a2ae83d1338?q=80&w=2068' },
  { id: 5, name: 'Petra', country: 'Jordan', rating: 4.8, category: 'Historic', image: 'https://images.unsplash.com/photo-1589182337358-2cb63df99173?q=80&w=1974' },
  { id: 6, name: 'Machu Picchu', country: 'Peru', rating: 4.9, category: 'Adventure', image: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?q=80&w=2070' },
];

export default function SearchPage() {
  const [query, setQuery] = useState('');

  return (
    <div className="space-y-8 py-6">
      <div className="max-w-3xl mx-auto space-y-6">
        <h1 className="text-4xl font-bold tracking-tight text-center">Where to next?</h1>
        
        {/* Search Input */}
        <div className="relative group">
          <Search className="absolute left-4 top-4 h-6 w-6 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <input 
            type="text" 
            placeholder="Search cities, countries, or specific activities..." 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full h-14 pl-12 pr-4 rounded-2xl border bg-card text-lg focus:ring-4 focus:ring-primary/10 outline-none transition-all shadow-sm"
          />
        </div>

        {/* Quick Tags */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {['All', 'Beach', 'Mountain', 'Cultural', 'Adventure', 'Historic', 'City'].map(tag => (
            <button 
              key={tag}
              className="px-4 py-1.5 rounded-full text-sm font-medium border bg-card hover:bg-primary/5 hover:border-primary/50 transition-all"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 mt-10">
        {/* Sidebar Filters */}
        <aside className="lg:w-64 space-y-8">
          <div className="flex items-center justify-between">
            <h3 className="font-bold flex items-center gap-2">
              <SlidersHorizontal className="h-4 w-4" />
              Filters
            </h3>
            <button className="text-xs text-primary font-bold hover:underline">Reset</button>
          </div>

          <div className="space-y-6">
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Price Range</label>
              <div className="space-y-2">
                <input type="range" className="w-full accent-primary" />
                <div className="flex justify-between text-xs font-medium">
                  <span>$0</span>
                  <span>$5000+</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Rating</label>
              <div className="space-y-2">
                {[4, 3, 2].map(star => (
                  <label key={star} className="flex items-center gap-2 cursor-pointer group">
                    <input type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary" />
                    <div className="flex items-center gap-1 text-sm font-medium text-muted-foreground group-hover:text-foreground">
                      {star}+ <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Distance</label>
              <div className="space-y-2">
                {['Local', 'Regional', 'Global'].map(dist => (
                  <label key={dist} className="flex items-center gap-2 cursor-pointer group">
                    <input type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary" />
                    <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground">{dist}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Results Grid */}
        <div className="flex-1 space-y-6">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Showing <span className="font-bold text-foreground">128</span> results found
            </p>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-muted-foreground">Sort by:</span>
              <select className="bg-transparent font-bold outline-none cursor-pointer">
                <option>Popularity</option>
                <option>Newest</option>
                <option>Price: Low to High</option>
              </select>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {mockPlaces.filter(p => p.name.toLowerCase().includes(query.toLowerCase())).map(place => (
              <div key={place.id} className="group bg-card border rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col">
                <div className="relative h-48 overflow-hidden">
                  <img src={place.image} alt={place.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-2 py-1 rounded-lg flex items-center gap-1 text-sm font-bold text-gray-900 shadow-sm">
                    <Star className="h-3.5 w-3.5 text-yellow-500 fill-yellow-500" />
                    {place.rating}
                  </div>
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-primary mb-1">
                      <Globe className="h-3 w-3" />
                      {place.category}
                    </div>
                    <h3 className="text-xl font-bold">{place.name}</h3>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      {place.country}
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-dashed">
                    <div className="flex items-center gap-1 text-xs font-bold text-primary">
                      <Compass className="h-4 w-4" />
                      Exploration
                    </div>
                    <button className="p-2 bg-muted hover:bg-primary hover:text-white rounded-xl transition-all">
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
