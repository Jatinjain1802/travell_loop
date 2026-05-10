import { 
  User, Settings, MapPin, Calendar, 
  Star, ShieldCheck, Heart, Plane, 
  Compass, History, Edit3, Camera
} from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { Button, Card, cn } from '@/components/common/UI';

export default function ProfilePage() {
  const { user } = useAuthStore();

  return (
    <div className="space-y-12 pb-20 animate-premium">
      {/* Profile Hero */}
      <div className="relative pt-12">
        <div className="absolute top-0 left-0 right-0 h-80 bg-secondary rounded-[48px] -z-10 overflow-hidden">
          <div className="absolute inset-0 bg-primary/5 blur-[80px]" />
          <div className="absolute bottom-[-50%] right-[-10%] w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px]" />
        </div>

        <div className="container mx-auto px-10">
          <div className="flex flex-col md:flex-row md:items-end gap-10">
            <div className="relative group">
              <img 
                src={`https://i.pravatar.cc/300?u=${user?.id}`} 
                className="h-48 w-48 rounded-[40px] border-[12px] border-white shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]"
                alt="Profile"
              />
              <button className="absolute bottom-4 right-4 p-3 bg-primary text-white rounded-2xl shadow-xl hover:scale-110 transition-all">
                <Camera className="h-5 w-5" />
              </button>
            </div>
            
            <div className="flex-1 pb-4 space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-2 text-left">
                  <div className="flex items-center gap-3">
                    <h1 className="text-5xl font-black text-white tracking-tighter">{user?.firstName} {user?.lastName}</h1>
                    <div className="bg-primary p-1.5 rounded-xl shadow-glow">
                      <ShieldCheck className="h-5 w-5 text-white" />
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-white/60 font-bold">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-primary" />
                      San Francisco, CA
                    </div>
                    <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-primary" />
                      Joined Oct 2023
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <Button variant="secondary" className="h-14 px-8 glass text-white border-white/10">
                    <Settings className="h-5 w-5" />
                    Settings
                  </Button>
                  <Button className="h-14 px-8 shadow-glow">
                    <Edit3 className="h-5 w-5" />
                    Edit Profile
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-12">
        {/* Left Sidebar - Stats */}
        <div className="lg:col-span-4 space-y-10">
          <Card className="p-10 space-y-8 border-none shadow-premium bg-slate-50">
            <h3 className="text-2xl font-black text-secondary">Travel Statistics</h3>
            <div className="grid gap-6">
              <ProfileStat icon={Compass} label="Countries" value="12" color="text-blue-500" />
              <ProfileStat icon={Plane} label="Total Trips" value="48" color="text-primary" />
              <ProfileStat icon={Star} label="Loop Points" value="12,450" color="text-yellow-500" />
            </div>
            <div className="pt-8 border-t border-slate-200">
               <h4 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-6">Expertise Level</h4>
               <div className="space-y-4">
                  <div className="flex justify-between items-end">
                    <span className="text-sm font-black text-secondary">Pro Explorer</span>
                    <span className="text-xs font-black text-primary">85% to Legend</span>
                  </div>
                  <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full shadow-glow" style={{ width: '85%' }} />
                  </div>
               </div>
            </div>
          </Card>

          <Card className="p-10 space-y-6 border-none shadow-premium">
            <h3 className="text-xl font-black text-secondary">Interests</h3>
            <div className="flex flex-wrap gap-2">
              {['Beach', 'Hiking', 'Architecture', 'Nightlife', 'Foodie', 'History'].map(tag => (
                <span key={tag} className="px-4 py-2 rounded-xl bg-slate-50 text-slate-500 text-xs font-black uppercase tracking-widest border border-slate-100 hover:border-primary/30 hover:text-primary cursor-pointer transition-all">
                  {tag}
                </span>
              ))}
            </div>
          </Card>
        </div>

        {/* Right Area - Tabs & Content */}
        <div className="lg:col-span-8 space-y-10">
          <div className="flex items-center gap-10 border-b border-slate-100 pb-6 px-2">
            <ProfileTab label="My Adventures" icon={History} active />
            <ProfileTab label="Saved Places" icon={Heart} />
            <ProfileTab label="Reviews" icon={Star} />
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[1, 2, 3, 4].map(i => (
              <Card key={i} padding="none" className="group overflow-hidden border-none shadow-premium hover:shadow-2xl">
                 <div className="relative h-56 overflow-hidden">
                    <img src={`https://images.unsplash.com/photo-${1500000000000 + i * 10000}?q=80&w=2000`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" alt="trip" />
                    <div className="absolute top-4 right-4 glass p-2 rounded-xl text-secondary">
                      <Heart className="h-4 w-4" />
                    </div>
                 </div>
                 <div className="p-8 space-y-3 text-left">
                    <span className="text-[10px] font-black uppercase tracking-widest text-primary">Completed Trip</span>
                    <h4 className="text-2xl font-black text-secondary group-hover:text-primary transition-colors">Summer in {['Paris', 'Tokyo', 'London', 'Berlin'][i-1]}</h4>
                    <p className="text-sm font-bold text-slate-400">May 12 - 20, 2023 • 2 Travelers</p>
                 </div>
              </Card>
            ))}
          </div>
          
          <Button variant="outline" className="w-full h-16 border-slate-100 text-slate-400 hover:text-secondary">Load Older Activities</Button>
        </div>
      </div>
    </div>
  );
}

function ProfileStat({ icon: Icon, label, value, color }) {
  return (
    <div className="flex items-center justify-between p-5 bg-white rounded-2xl border border-slate-50 shadow-sm hover:shadow-md transition-all">
      <div className="flex items-center gap-4">
        <div className={cn("p-3 rounded-xl bg-slate-50", color.replace('text', 'bg').replace('500', '100'))}>
          <Icon className={cn("h-6 w-6", color)} />
        </div>
        <span className="text-sm font-black text-slate-400 uppercase tracking-widest">{label}</span>
      </div>
      <span className="text-2xl font-black text-secondary">{value}</span>
    </div>
  );
}

function ProfileTab({ label, icon: Icon, active }) {
  return (
    <button className={cn(
      "flex items-center gap-3 pb-6 mb-[-25px] transition-all relative",
      active ? "text-secondary" : "text-slate-400 hover:text-secondary"
    )}>
      <Icon className={cn("h-5 w-5", active ? "text-primary" : "text-slate-300")} />
      <span className="text-sm font-black uppercase tracking-widest">{label}</span>
      {active && <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-t-full shadow-glow" />}
    </button>
  );
}
