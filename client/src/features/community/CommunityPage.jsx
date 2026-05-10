import { useState } from 'react';
import { 
  Heart, MessageSquare, Share2, Search, 
  MapPin, User, Star, Plus, Flame, Globe, Compass 
} from 'lucide-react';

const mockPosts = [
  {
    id: 1,
    author: 'Elena Rodriguez',
    avatar: 'https://i.pravatar.cc/100?u=elena',
    title: 'Secret Beaches of Santorini',
    location: 'Santorini, Greece',
    image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=2012',
    likes: 1240,
    comments: 86,
    tags: ['Beach', 'Photography', 'Greece'],
    rating: 4.9
  },
  {
    id: 2,
    author: 'Marcus Chen',
    avatar: 'https://i.pravatar.cc/100?u=marcus',
    title: 'Autumn in Kyoto: A Zen Journey',
    location: 'Kyoto, Japan',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=2070',
    likes: 856,
    comments: 42,
    tags: ['Culture', 'Autumn', 'Japan'],
    rating: 4.8
  },
  {
    id: 3,
    author: 'Sarah Jenkins',
    avatar: 'https://i.pravatar.cc/100?u=sarah',
    title: 'Hiking the Swiss Alps',
    location: 'Zermatt, Switzerland',
    image: 'https://images.unsplash.com/photo-1531310197839-ccf54634509e?q=80&w=1965',
    likes: 2105,
    comments: 154,
    tags: ['Hiking', 'Mountains', 'Nature'],
    rating: 5.0
  }
];

export default function CommunityPage() {
  const [activeFilter, setActiveFilter] = useState('Trending');

  return (
    <div className="max-w-6xl mx-auto space-y-10 py-6">
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-4xl font-bold tracking-tight">Traveler Community</h1>
          <p className="text-muted-foreground mt-1">Discover, share, and get inspired by fellow adventurers.</p>
        </div>
        <div className="relative w-full md:w-96 group">
          <Search className="absolute left-4 top-3.5 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <input 
            type="text" 
            placeholder="Search stories, people, places..." 
            className="w-full h-12 pl-12 pr-4 rounded-2xl border bg-card focus:ring-4 focus:ring-primary/10 outline-none transition-all"
          />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-10">
        {/* Main Feed */}
        <div className="flex-1 space-y-8">
          {/* Feed Filters */}
          <div className="flex items-center gap-4 border-b pb-4 overflow-x-auto no-scrollbar">
            {[
              { name: 'Trending', icon: Flame },
              { name: 'Latest', icon: Compass },
              { name: 'Regional', icon: MapPin },
              { name: 'Global', icon: Globe },
            ].map((f) => (
              <button
                key={f.name}
                onClick={() => setActiveFilter(f.name)}
                className={`flex items-center gap-2 px-6 py-2 rounded-full text-sm font-bold transition-all whitespace-nowrap ${
                  activeFilter === f.name 
                    ? 'bg-primary text-white shadow-lg shadow-primary/20 scale-105' 
                    : 'text-muted-foreground hover:bg-muted'
                }`}
              >
                <f.icon className="h-4 w-4" />
                {f.name}
              </button>
            ))}
          </div>

          {/* Posts Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {mockPosts.map((post) => (
              <div key={post.id} className="group bg-card border rounded-[40px] overflow-hidden hover:shadow-2xl transition-all duration-500 flex flex-col">
                <div className="relative h-72 overflow-hidden">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute top-6 right-6 flex gap-2">
                    <div className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1 text-sm font-bold shadow-xl">
                      <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                      {post.rating}
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                
                <div className="p-8 flex-1 flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <img src={post.avatar} alt={post.author} className="h-10 w-10 rounded-full border-2 border-primary/20" />
                      <div>
                        <p className="text-sm font-bold">{post.author}</p>
                        <div className="flex items-center gap-1 text-[10px] text-muted-foreground uppercase font-bold tracking-widest">
                          <MapPin className="h-3 w-3" />
                          {post.location}
                        </div>
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold group-hover:text-primary transition-colors leading-tight">
                      {post.title}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map(tag => (
                        <span key={tag} className="text-[10px] font-bold uppercase tracking-tighter text-muted-foreground bg-muted px-2.5 py-1 rounded-lg">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-6 border-t border-dashed">
                    <div className="flex items-center gap-6">
                      <button className="flex items-center gap-1.5 text-sm font-bold text-muted-foreground hover:text-red-500 transition-colors group/btn">
                        <Heart className="h-5 w-5 group-hover/btn:fill-red-500" />
                        {post.likes}
                      </button>
                      <button className="flex items-center gap-1.5 text-sm font-bold text-muted-foreground hover:text-primary transition-colors group/btn">
                        <MessageSquare className="h-5 w-5 group-hover/btn:fill-primary" />
                        {post.comments}
                      </button>
                    </div>
                    <button className="p-2 text-muted-foreground hover:bg-muted rounded-xl transition-colors">
                      <Share2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar - Recommendations */}
        <aside className="lg:w-80 space-y-10">
          <div className="bg-secondary rounded-[40px] p-8 text-white space-y-6 shadow-2xl relative overflow-hidden">
            <div className="relative z-10 space-y-4">
              <h3 className="text-2xl font-bold leading-tight">Share your journey with the world</h3>
              <p className="text-white/60 text-sm">Post your latest adventure and help other travelers plan their dream trips.</p>
              <button className="w-full bg-primary text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:scale-105 transition-all shadow-xl shadow-primary/20">
                <Plus className="h-5 w-5" />
                Create Post
              </button>
            </div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl -mr-16 -mt-16" />
          </div>

          <div className="space-y-6">
            <h3 className="font-bold text-xl">Top Contributors</h3>
            <div className="space-y-4">
              {[
                { name: 'Julian Wan', points: '12.4k', img: 'https://i.pravatar.cc/100?u=julian' },
                { name: 'Michael Dam', points: '10.2k', img: 'https://i.pravatar.cc/100?u=michael' },
                { name: 'Ayo Ogunseinde', points: '9.8k', img: 'https://i.pravatar.cc/100?u=ayo' },
              ].map((user) => (
                <div key={user.name} className="flex items-center justify-between group cursor-pointer">
                  <div className="flex items-center gap-3">
                    <img src={user.img} alt={user.name} className="h-12 w-12 rounded-full grayscale group-hover:grayscale-0 transition-all" />
                    <div>
                      <p className="font-bold text-sm group-hover:text-primary transition-colors">{user.name}</p>
                      <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">{user.points} points</p>
                    </div>
                  </div>
                  <button className="text-xs font-bold text-primary hover:underline">Follow</button>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
