import { useState } from 'react';
import { 
  User as UserIcon, Mail, MapPin, Calendar, Settings, 
  Edit3, Grid, Heart, Map, Bell, Shield, 
  LogOut, Camera, ChevronRight, Globe 
} from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { Button, Card, cn } from '@/components/common/UI';

export default function ProfilePage() {
  const { user } = useAuthStore();
  const [activeTab, setActiveTab] = useState('Overview');

  return (
    <div className="space-y-12 py-10">
      {/* Profile Header */}
      <div className="relative group">
        {/* Cover Image */}
        <div className="h-80 rounded-[60px] bg-secondary border-8 border-white shadow-premium overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070" 
            className="w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform duration-1000"
            alt="cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-secondary via-transparent to-transparent" />
        </div>
        
        {/* Profile Info Overlay */}
        <div className="px-12 -mt-24 flex flex-col md:flex-row md:items-end justify-between gap-8 relative z-10">
          <div className="flex flex-col md:flex-row items-center md:items-end gap-8">
            <div className="relative group/avatar">
              <div className="h-48 w-48 rounded-[48px] border-[10px] border-white bg-card overflow-hidden shadow-2xl">
                <img 
                  src={`https://i.pravatar.cc/400?u=${user?.id}`} 
                  alt="avatar" 
                  className="h-full w-full object-cover group-hover/avatar:scale-110 transition-transform duration-500" 
                />
              </div>
              <button className="absolute bottom-4 right-4 p-3 bg-primary text-white rounded-2xl shadow-xl hover:scale-110 active:scale-95 transition-all opacity-0 group-hover/avatar:opacity-100">
                <Camera className="h-5 w-5" />
              </button>
            </div>
            
            <div className="text-center md:text-left space-y-2 pb-6">
              <h1 className="text-5xl font-black tracking-tight text-white drop-shadow-lg">
                {user?.firstName} {user?.lastName}
              </h1>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 text-white/80 font-bold">
                <span className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-primary" />
                  New York, USA
                </span>
                <span className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-primary" />
                  Member since 2024
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 pb-8">
            <Button variant="secondary" size="lg" className="bg-white text-secondary hover:bg-white/90">
              <Edit3 className="h-4 w-4" />
              Edit Profile
            </Button>
            <Button variant="ghost" className="h-14 w-14 glass text-white hover:bg-white/20 p-0 rounded-2xl">
              <Settings className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-12">
        {/* Left Column - Stats & Settings */}
        <div className="lg:col-span-4 space-y-8">
          <Card className="p-10 space-y-10">
            <div className="grid grid-cols-2 gap-8">
              <Stat label="Total Trips" value="24" />
              <Stat label="Stories" value="12" />
              <Stat label="Followers" value="1.8k" />
              <Stat label="Following" value="840" />
            </div>

            <div className="pt-10 border-t border-border/60 space-y-2">
              <MenuButton icon={Bell} label="Notifications" badge="3" />
              <MenuButton icon={Shield} label="Privacy & Security" />
              <MenuButton icon={Globe} label="Connected Apps" />
              <MenuButton icon={LogOut} label="Sign Out" variant="danger" />
            </div>
          </Card>

          <Card className="bg-primary/5 border-primary/20 p-8 space-y-6">
            <div className="space-y-2">
              <h3 className="text-xl font-black text-secondary">Traveloop Pro</h3>
              <p className="text-sm font-medium text-muted leading-relaxed">
                Unlock exclusive perks like AI itinerary generation and unlimited trip storage.
              </p>
            </div>
            <Button size="lg" className="w-full">Upgrade Now</Button>
          </Card>
        </div>

        {/* Right Column - Content */}
        <div className="lg:col-span-8 space-y-10">
          <div className="flex items-center gap-4 overflow-x-auto no-scrollbar border-b border-border/60 pb-1">
            {['Overview', 'My Trips', 'Saved Locations', 'Travel Journal'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "px-8 py-4 text-sm font-black transition-all relative",
                  activeTab === tab 
                    ? "text-primary" 
                    : "text-muted hover:text-secondary"
                )}
              >
                {tab}
                {activeTab === tab && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-t-full shadow-glow" />
                )}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <ActivityCard 
              icon={Map} 
              title="Current Trip: Tokyo 2024" 
              desc="Itinerary is 75% complete. Next step: Book Shinkansen tickets." 
              progress={75}
            />
            <ActivityCard 
              icon={Heart} 
              title="Saved: Swiss Alps Guide" 
              desc="You added this to your 'Winter Sports' collection yesterday." 
              color="text-red-500"
            />
          </div>

          <div className="space-y-6">
            <h3 className="text-2xl font-black text-secondary ml-2">About Me</h3>
            <Card className="p-10 leading-relaxed text-muted font-medium italic">
              "Avid traveler, photography enthusiast, and coffee lover. I believe the best way to see the world is one train ride at a time. Currently planning my next big adventure through Southeast Asia."
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div className="space-y-1">
      <p className="text-3xl font-black text-secondary">{value}</p>
      <p className="text-[10px] font-black uppercase tracking-widest text-muted">{label}</p>
    </div>
  );
}

function MenuButton({ icon: Icon, label, badge, variant }) {
  return (
    <button className={cn(
      "w-full flex items-center justify-between p-4 rounded-[20px] transition-all group hover:bg-muted/5",
      variant === 'danger' ? "text-destructive hover:bg-destructive/5" : "text-muted hover:text-secondary"
    )}>
      <div className="flex items-center gap-4">
        <Icon className="h-5 w-5" />
        <span className="text-sm font-bold">{label}</span>
      </div>
      <div className="flex items-center gap-2">
        {badge && <span className="px-2 py-0.5 bg-primary text-white text-[10px] font-black rounded-lg shadow-glow">{badge}</span>}
        <ChevronRight className="h-4 w-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
      </div>
    </button>
  );
}

function ActivityCard({ icon: Icon, title, desc, progress, color }) {
  return (
    <Card className="group cursor-pointer hover:border-primary/50 transition-all">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className={cn("p-4 rounded-2xl bg-muted/5 group-hover:scale-110 transition-transform", color || "text-primary")}>
            <Icon className="h-6 w-6" />
          </div>
          <span className="text-[10px] font-black uppercase tracking-widest text-muted">Activity</span>
        </div>
        <div className="space-y-2">
          <h4 className="text-xl font-black text-secondary group-hover:text-primary transition-colors">{title}</h4>
          <p className="text-xs font-bold text-muted leading-relaxed">{desc}</p>
        </div>
        {progress && (
          <div className="w-full bg-muted/10 h-2 rounded-full overflow-hidden">
            <div className="bg-primary h-full rounded-full shadow-glow" style={{ width: `${progress}%` }} />
          </div>
        )}
      </div>
    </Card>
  );
}
