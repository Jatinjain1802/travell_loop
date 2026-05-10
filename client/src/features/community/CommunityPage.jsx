import { useState } from 'react';
import { 
  MessageSquare, Heart, Share2, 
  MapPin, Clock, Globe, Plus, 
  ShieldCheck, Sparkles
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
    time: '2h ago'
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
    time: '5h ago'
  },
];

export default function CommunityPage() {
  const [activeFilter, setActiveFilter] = useState('Trending');

  return (
    <div className="space-y-12 py-6">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10">
        <div className="space-y-4">
          <h1 className="text-5xl font-black tracking-tight text-secondary">Travel <span className="text-primary italic">Community</span></h1>
          <p className="text-muted font-medium max-w-lg leading-relaxed">Share your journeys, get advice from seasoned travelers, and find your next destination inspiration.</p>
        </div>
        <div className="flex items-center gap-4">
          <Button size="xl" className="shadow-glow">
            <Plus className="h-5 w-5" />
            Post Experience
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-12">
        {/* Main Feed */}
        <div className="lg:col-span-8 space-y-10">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar border-b border-border/60 pb-1">
            {['Trending', 'Latest', 'Following', 'Guides', 'Questions'].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={cn(
                  "px-8 py-4 text-sm font-black transition-all relative",
                  activeFilter === filter 
                    ? "text-primary" 
                    : "text-muted hover:text-secondary"
                )}
              >
                {filter}
                {activeFilter === filter && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-t-full shadow-glow" />
                )}
              </button>
            ))}
          </div>

          <div className="space-y-12">
            {posts.map((post) => (
              <div key={post.id} className="group space-y-6">
                {/* Post Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <img src={post.avatar} className="h-14 w-14 rounded-2xl object-cover shadow-xl" alt={post.user} />
                    <div>
                      <h3 className="text-lg font-black text-secondary flex items-center gap-2">
                        {post.user}
                        <ShieldCheck className="h-4 w-4 text-primary" />
                      </h3>
                      <div className="flex items-center gap-2 text-xs font-bold text-muted">
                        <MapPin className="h-3 w-3 text-primary" />
                        {post.location} • {post.time}
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" className="h-10 w-10 p-0 rounded-xl">
                    <Plus className="h-5 w-5" />
                  </Button>
                </div>

                {/* Post Content */}
                <p className="text-lg font-medium text-secondary leading-relaxed">
                  {post.content}
                </p>

                <div className="relative rounded-[40px] overflow-hidden aspect-video shadow-premium">
                  <img src={post.image} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" alt="post" />
                  <div className="absolute top-6 right-6 glass px-3 py-1.5 rounded-full flex items-center gap-2 text-sm font-black text-secondary shadow-xl">
                    <Sparkles className="h-4 w-4 text-primary" />
                    Trip Highlights
                  </div>
                </div>

                {/* Post Actions */}
                <div className="flex items-center gap-8 pt-2">
                  <button className="flex items-center gap-2 group/action">
                    <div className="p-3 bg-muted/10 rounded-2xl group-hover/action:bg-primary/10 transition-colors">
                      <Heart className="h-5 w-5 text-muted group-hover/action:text-primary transition-colors" />
                    </div>
                    <span className="text-sm font-black text-secondary">{post.likes}</span>
                  </button>
                  <button className="flex items-center gap-2 group/action">
                    <div className="p-3 bg-muted/10 rounded-2xl group-hover/action:bg-secondary/10 transition-colors">
                      <MessageSquare className="h-5 w-5 text-muted group-hover/action:text-secondary transition-colors" />
                    </div>
                    <span className="text-sm font-black text-secondary">{post.comments}</span>
                  </button>
                  <button className="flex items-center gap-2 group/action ml-auto">
                    <div className="p-3 bg-muted/10 rounded-2xl group-hover/action:bg-secondary/10 transition-colors">
                      <Share2 className="h-5 w-5 text-muted group-hover/action:text-secondary transition-colors" />
                    </div>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-4 space-y-10">
          <Card className="p-8 space-y-8">
            <h3 className="text-xl font-black text-secondary">Top Contributors</h3>
            <div className="space-y-6">
              {[
                { name: 'Elena Gilbert', trips: 142, points: '42k' },
                { name: 'Stefan Salvatore', trips: 98, points: '31k' },
                { name: 'Damon Salvatore', trips: 85, points: '28k' },
              ].map((user, idx) => (
                <div key={user.name} className="flex items-center justify-between group cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="text-lg font-black text-primary/40 w-6">0{idx + 1}</div>
                    <img src={`https://i.pravatar.cc/100?u=${user.name}`} className="h-12 w-12 rounded-xl" alt="avatar" />
                    <div>
                      <h4 className="font-bold text-secondary group-hover:text-primary transition-colors">{user.name}</h4>
                      <p className="text-[10px] font-black uppercase text-muted tracking-widest">{user.trips} Trips Shared</p>
                    </div>
                  </div>
                  <div className="text-xs font-black text-primary bg-primary/10 px-3 py-1 rounded-lg">
                    {user.points}
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full h-12">View Leaderboard</Button>
          </Card>

          <Card className="bg-primary p-10 text-white relative overflow-hidden group">
            <div className="relative z-10 space-y-6">
              <div className="bg-white/20 p-3 rounded-2xl w-fit">
                <Globe className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-black leading-tight">Host Your Own Trip Meetup!</h3>
              <p className="text-sm font-bold text-white/60 leading-relaxed">
                Connect with local travelers and organize group adventures easily.
              </p>
              <Button variant="secondary" className="bg-white text-primary hover:bg-white/90 w-full">Learn More</Button>
            </div>
            <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-[80px] -mr-24 -mt-24 group-hover:scale-150 transition-transform duration-1000" />
          </Card>
        </div>
      </div>
    </div>
  );
}
