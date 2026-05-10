import { useState } from 'react';
import { 
  User, Mail, MapPin, Calendar, Settings, 
  Edit3, Grid, Heart, Map, Bell, Shield, 
  LogOut, Camera, ChevronRight 
} from 'lucide-react';
import { useAuthStore } from '@/store/authStore';

export default function ProfilePage() {
  const { user } = useAuthStore();
  const [activeTab, setActiveTab] = useState('Overview');

  return (
    <div className="max-w-6xl mx-auto py-10 space-y-10">
      {/* Profile Header */}
      <div className="relative">
        {/* Cover Image */}
        <div className="h-64 rounded-[40px] bg-gradient-to-r from-primary/20 via-indigo-500/20 to-accent/20 border overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070')] bg-cover bg-center opacity-30 mix-blend-overlay" />
        </div>
        
        {/* Profile Info Overlay */}
        <div className="px-10 -mt-20 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="flex flex-col md:flex-row items-center md:items-end gap-6">
            <div className="relative group">
              <div className="h-40 w-40 rounded-[40px] border-8 border-background bg-card overflow-hidden shadow-2xl">
                <img src={`https://i.pravatar.cc/400?u=${user?.id}`} alt="avatar" className="h-full w-full object-cover" />
              </div>
              <button className="absolute bottom-4 right-4 p-2 bg-primary text-white rounded-2xl shadow-xl hover:scale-110 transition-all opacity-0 group-hover:opacity-100">
                <Camera className="h-4 w-4" />
              </button>
            </div>
            <div className="text-center md:text-left space-y-1 pb-4">
              <h1 className="text-4xl font-bold tracking-tight">{user?.firstName} {user?.lastName}</h1>
              <div className="flex items-center justify-center md:justify-start gap-4 text-muted-foreground font-medium">
                <span className="flex items-center gap-1.5 text-sm">
                  <MapPin className="h-4 w-4" />
                  New York, USA
                </span>
                <span className="flex items-center gap-1.5 text-sm">
                  <Calendar className="h-4 w-4" />
                  Joined May 2024
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 pb-4">
            <button className="flex items-center gap-2 px-6 py-2.5 bg-card border rounded-2xl font-bold text-sm hover:bg-muted transition-all">
              <Edit3 className="h-4 w-4" />
              Edit Profile
            </button>
            <button className="p-2.5 bg-muted rounded-2xl hover:bg-primary hover:text-white transition-all group">
              <Settings className="h-5 w-5 group-hover:rotate-90 transition-transform duration-500" />
            </button>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-10">
        {/* Left Column - Stats & Settings */}
        <div className="lg:col-span-1 space-y-8">
          <div className="bg-card border rounded-[40px] p-8 shadow-sm space-y-8">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-1">
                <p className="text-2xl font-bold">12</p>
                <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Trips</p>
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-bold">4.2k</p>
                <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Points</p>
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-bold">28</p>
                <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Postings</p>
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-bold">1.5k</p>
                <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Followers</p>
              </div>
            </div>

            <div className="pt-8 border-t space-y-2">
              {[
                { name: 'Notifications', icon: Bell },
                { name: 'Security', icon: Shield },
                { name: 'Connected Accounts', icon: Globe },
                { name: 'Logout', icon: LogOut, color: 'text-red-500' },
              ].map((item) => (
                <button 
                  key={item.name}
                  className={`w-full flex items-center justify-between p-3 rounded-xl hover:bg-muted transition-colors group ${item.color || 'text-foreground'}`}
                >
                  <div className="flex items-center gap-3">
                    <item.icon className="h-4 w-4" />
                    <span className="text-sm font-medium">{item.name}</span>
                  </div>
                  <ChevronRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              ))}
            </div>
          </div>

          <div className="bg-primary/10 rounded-[40px] p-8 space-y-4">
            <h3 className="font-bold text-lg text-primary">Traveloop Pro</h3>
            <p className="text-xs text-primary/70 leading-relaxed">Upgrade to unlock unlimited trips, AI-powered itinerary suggestions, and advanced budget analytics.</p>
            <button className="w-full bg-primary text-white py-3 rounded-2xl font-bold text-xs shadow-lg shadow-primary/20 hover:scale-105 transition-all">
              Upgrade Now
            </button>
          </div>
        </div>

        {/* Right Column - Tabs & Content */}
        <div className="lg:col-span-3 space-y-8">
          <div className="flex items-center gap-2 border-b pb-1">
            {['Overview', 'My Trips', 'Saved', 'Stories'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 text-sm font-bold transition-all relative ${
                  activeTab === tab 
                    ? 'text-primary' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-t-full shadow-[0_-4px_10px_rgba(59,130,246,0.5)]" />
                )}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Recent Activity Mock Cards */}
            <div className="bg-card border rounded-3xl p-6 shadow-sm hover:border-primary/50 transition-all cursor-pointer group">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-blue-100 text-blue-600 rounded-xl group-hover:scale-110 transition-transform">
                  <Map className="h-5 w-5" />
                </div>
                <span className="text-[10px] font-bold text-muted-foreground">2 days ago</span>
              </div>
              <h4 className="font-bold mb-1">Planning: Tokyo Cherry Blossoms</h4>
              <p className="text-xs text-muted-foreground">Itinerary is 45% complete. Next step: Add accommodation.</p>
            </div>

            <div className="bg-card border rounded-3xl p-6 shadow-sm hover:border-primary/50 transition-all cursor-pointer group">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-red-100 text-red-600 rounded-xl group-hover:scale-110 transition-transform">
                  <Heart className="h-5 w-5" />
                </div>
                <span className="text-[10px] font-bold text-muted-foreground">5 days ago</span>
              </div>
              <h4 className="font-bold mb-1">Favorited: Secret Rome Guide</h4>
              <p className="text-xs text-muted-foreground">By Marco Rossi. You saved this to your Italy collection.</p>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="font-bold text-xl">About Me</h3>
            <div className="bg-card border rounded-[40px] p-8 space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                Avid explorer and photography enthusiast. I love discovering hidden gems in European cities and documenting my journeys through visual storytelling. Currently planning a three-month backpacking trip across Southeast Asia.
              </p>
              <div className="flex flex-wrap gap-2">
                {['Backpacking', 'Photography', 'Slow Travel', 'Foodie'].map(tag => (
                  <span key={tag} className="px-4 py-1.5 rounded-full bg-muted text-xs font-bold text-muted-foreground">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import { Globe } from 'lucide-react';
