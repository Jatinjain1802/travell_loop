import { useState } from 'react';
import { 
  MessageSquare, Heart, Share2, 
  MapPin, Clock, Globe, Plus, 
  ShieldCheck, Sparkles, TrendingUp
} from 'lucide-react';
import { Button, Card, cn } from '@/components/common/UI';

const posts = [
  { 
    id: 1, 
    user: 'Alex Rivera', 
    avatar: 'https://i.pravatar.cc/150?u=alex',
    location: 'Bali, Indonesia',
    content: 'Just finished my 2-week digital nomad guide for Ubud. The coffee shops here are actually insane! ☕️🌴',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=2076',
    likes: 1240,
    comments: 84,
    time: '2h ago',
    verified: true
  },
  { 
    id: 2, 
    user: 'Sarah Chen', 
    avatar: 'https://i.pravatar.cc/150?u=sarah',
    location: 'Kyoto, Japan',
    content: 'Cherry blossoms are finally at peak bloom in Kyoto! If you\'re heading here this weekend, avoid the main path and try the Philosopher\'s Walk instead. 🌸',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=2070',
    likes: 3500,
    comments: 210,
    time: '5h ago',
    verified: true
  },
];

export default function CommunityPage() {
  const [activeFilter, setActiveFilter] = useState('Trending');

  return (
    <div className="space-y-12 pb-20 animate-premium">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10">
        <div className="space-y-4 text-left">
          <div className="flex items-center gap-3 text-primary">
            <Globe className="h-6 w-6" />
            <span className="text-xs font-black uppercase tracking-[0.2em]">Travel Loop Social</span>
          </div>
          <h1 className="text-6xl font-black tracking-tight text-secondary leading-none">The <span className="text-primary italic">Community.</span></h1>
          <p className="text-slate-400 font-bold max-w-lg leading-relaxed">Connect with fellow explorers, share your masterpieces, and get local tips in real-time.</p>
        </div>
        <div className="flex items-center gap-4">
          <Button size="xl" className="h-16 px-10 shadow-xl">
            <Plus className="h-6 w-6" />
            Post Experience
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-12">
        {/* Main Feed */}
        <div className="lg:col-span-8 space-y-12">
          <div className="flex items-center gap-10 overflow-x-auto no-scrollbar border-b border-slate-100 pb-6 px-2">
            {['Trending', 'Latest', 'Following', 'Guides', 'Questions'].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={cn(
                  "text-sm font-black uppercase tracking-widest transition-all relative pb-6 mb-[-25px]",
                  activeFilter === filter 
                    ? "text-secondary" 
                    : "text-slate-400 hover:text-secondary"
                )}
              >
                {filter}
                {activeFilter === filter && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-t-full shadow-glow" />
                )}
              </button>
            ))}
          </div>

          <div className="space-y-16">
            {posts.map((post) => (
              <div key={post.id} className="group space-y-8">
                {/* Post Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-5">
                    <div className="relative">
                      <img src={post.avatar} className="h-16 w-16 rounded-2xl object-cover shadow-xl border-4 border-white" alt={post.user} />
                      {post.verified && (
                        <div className="absolute -bottom-1 -right-1 bg-primary p-1 rounded-lg shadow-lg border-2 border-white">
                          <ShieldCheck className="h-3 w-3 text-white" />
                        </div>
                      )}
                    </div>
                    <div className="text-left">
                      <h3 className="text-xl font-black text-secondary group-hover:text-primary transition-colors flex items-center gap-2">
                        {post.user}
                      </h3>
                      <div className="flex items-center gap-3 text-xs font-bold text-slate-400">
                        <div className="flex items-center gap-1.5">
                          <MapPin className="h-3.5 w-3.5 text-primary" />
                          {post.location}
                        </div>
                        <div className="w-1 h-1 rounded-full bg-slate-200" />
                        <div className="flex items-center gap-1.5">
                          <Clock className="h-3.5 w-3.5 text-slate-300" />
                          {post.time}
                        </div>
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" className="h-12 w-12 p-0 rounded-2xl bg-slate-50 text-slate-400 hover:text-secondary">
                    <Plus className="h-6 w-6" />
                  </Button>
                </div>

                {/* Post Content */}
                <p className="text-xl font-medium text-secondary leading-relaxed text-left">
                  {post.content}
                </p>

                <Card padding="none" className="overflow-hidden border-none shadow-premium hover:shadow-2xl">
                  <div className="relative aspect-video">
                    <img src={post.image} className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105" alt="post" />
                    <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl flex items-center gap-2 text-xs font-black text-secondary shadow-xl">
                      <Sparkles className="h-4 w-4 text-primary" />
                      Trip Highlights
                    </div>
                  </div>
                </Card>

                {/* Post Actions */}
                <div className="flex items-center gap-12 pt-2">
                  <button className="flex items-center gap-2.5 group/action">
                    <div className="p-3 bg-slate-50 rounded-2xl group-hover/action:bg-primary/10 transition-colors">
                      <Heart className="h-6 w-6 text-slate-400 group-hover/action:text-primary transition-colors" />
                    </div>
                    <span className="text-sm font-black text-secondary">{post.likes}</span>
                  </button>
                  <button className="flex items-center gap-2.5 group/action">
                    <div className="p-3 bg-slate-50 rounded-2xl group-hover/action:bg-secondary/10 transition-colors">
                      <MessageSquare className="h-6 w-6 text-slate-400 group-hover/action:text-secondary transition-colors" />
                    </div>
                    <span className="text-sm font-black text-secondary">{post.comments}</span>
                  </button>
                  <button className="flex items-center gap-2.5 group/action ml-auto">
                    <div className="p-3 bg-slate-50 rounded-2xl hover:bg-slate-100 transition-colors">
                      <Share2 className="h-6 w-6 text-slate-400 hover:text-secondary transition-colors" />
                    </div>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-4 space-y-10">
          <Card className="p-10 space-y-10 border-none shadow-premium bg-slate-50">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-black text-secondary">Top Loops</h3>
              <TrendingUp className="h-5 w-5 text-primary" />
            </div>
            <div className="space-y-8">
              {[
                { name: 'Elena Gilbert', trips: 142, points: '42k' },
                { name: 'Stefan Salvatore', trips: 98, points: '31k' },
                { name: 'Damon Salvatore', trips: 85, points: '28k' },
              ].map((user, idx) => (
                <div key={user.name} className="flex items-center justify-between group cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="text-xl font-black text-primary/40 w-8">0{idx + 1}</div>
                    <img src={`https://i.pravatar.cc/100?u=${user.name}`} className="h-14 w-14 rounded-2xl border-4 border-white shadow-md" alt="avatar" />
                    <div className="text-left">
                      <h4 className="font-black text-secondary group-hover:text-primary transition-colors leading-none">{user.name}</h4>
                      <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mt-1.5">{user.trips} Trips Shared</p>
                    </div>
                  </div>
                  <div className="text-xs font-black text-primary bg-primary/10 px-4 py-1.5 rounded-xl">
                    {user.points}
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full h-14 border-slate-200 text-secondary">View Leaderboard</Button>
          </Card>

          <Card className="bg-secondary p-12 text-white relative overflow-hidden group border-none shadow-2xl">
            <div className="relative z-10 space-y-8">
              <div className="bg-primary p-4 rounded-2xl w-fit shadow-glow">
                <Globe className="h-8 w-8" />
              </div>
              <div className="space-y-3">
                <h3 className="text-3xl font-black leading-tight">Host Your Own <span className="text-primary italic">Meetup!</span></h3>
                <p className="text-sm font-bold text-white/50 leading-relaxed">
                  Connect with local travelers and organize group adventures in your city.
                </p>
              </div>
              <Button className="bg-white text-secondary hover:bg-white/90 w-full h-16">Learn More</Button>
            </div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[100px] -mr-32 -mt-32 group-hover:scale-150 transition-transform duration-1000" />
          </Card>
        </div>
      </div>
    </div>
  );
}
