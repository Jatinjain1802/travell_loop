import { 
  Users, Globe, MapPin, 
  TrendingUp, ShieldCheck, 
  Settings, Search, MoreHorizontal,
  Bell, Layout, Sparkles, Filter
} from 'lucide-react';
import { Button, Card, cn } from '@/components/common/UI';

export default function AdminPage() {
  return (
    <div className="space-y-12 pb-20 animate-premium">
      {/* Header Area */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10">
        <div className="space-y-4 text-left">
          <div className="flex items-center gap-3 text-primary">
            <ShieldCheck className="h-6 w-6" />
            <span className="text-xs font-black uppercase tracking-[0.2em]">Administrative Hub</span>
          </div>
          <h1 className="text-6xl font-black tracking-tight text-secondary leading-none">The <span className="text-primary italic">Control.</span></h1>
          <p className="text-slate-400 font-bold max-w-lg leading-relaxed">Manage users, oversee global trends, and maintain the Traveloop ecosystem.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-primary transition-colors" />
            <input 
              type="text" 
              placeholder="Search anything..." 
              className="h-16 pl-12 pr-6 rounded-2xl bg-white border border-slate-100 text-sm font-bold focus:ring-4 focus:ring-primary/10 transition-all outline-none w-80 shadow-sm"
            />
          </div>
          <button className="h-16 w-16 glass rounded-2xl flex items-center justify-center text-slate-400 hover:text-secondary hover:bg-slate-50 transition-all relative">
            <Bell className="h-6 w-6" />
            <div className="absolute top-4 right-4 w-3 h-3 bg-primary border-4 border-white rounded-full shadow-glow" />
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        <AdminStat icon={Users} label="Active Users" value="52,450" trend="+12.5%" />
        <AdminStat icon={Globe} label="Live Trips" value="1,840" trend="+8.2%" />
        <AdminStat icon={TrendingUp} label="Loop Revenue" value="$2.4M" trend="+15.0%" />
        <AdminStat icon={Sparkles} label="AI Generations" value="128k" trend="+24.1%" />
      </div>

      <div className="grid lg:grid-cols-12 gap-12">
        {/* User Table area */}
        <div className="lg:col-span-8 space-y-10">
          <Card className="p-0 border-none shadow-premium overflow-hidden">
             <div className="p-8 border-b border-slate-50 flex items-center justify-between bg-white">
                <h3 className="text-2xl font-black text-secondary">Recent Members</h3>
                <div className="flex items-center gap-3">
                   <Button variant="ghost" className="h-10 text-slate-400 gap-2">
                      <Filter className="h-4 w-4" />
                      Filter
                   </Button>
                   <Button size="sm" className="h-10 px-6 rounded-xl">View All</Button>
                </div>
             </div>
             <div className="overflow-x-auto">
                <table className="w-full">
                   <thead className="bg-slate-50">
                      <tr>
                         <th className="px-8 py-5 text-left text-xs font-black uppercase tracking-widest text-slate-400">User Profile</th>
                         <th className="px-8 py-5 text-left text-xs font-black uppercase tracking-widest text-slate-400">Status</th>
                         <th className="px-8 py-5 text-left text-xs font-black uppercase tracking-widest text-slate-400">Location</th>
                         <th className="px-8 py-5 text-right text-xs font-black uppercase tracking-widest text-slate-400">Action</th>
                      </tr>
                   </thead>
                   <tbody className="divide-y divide-slate-50 bg-white">
                      {[1, 2, 3, 4, 5].map(i => (
                        <tr key={i} className="hover:bg-slate-50/50 transition-colors group">
                           <td className="px-8 py-6">
                              <div className="flex items-center gap-4">
                                 <img src={`https://i.pravatar.cc/100?u=${i + 20}`} className="h-12 w-12 rounded-xl shadow-md border-2 border-white" alt="user" />
                                 <div className="text-left">
                                    <p className="font-black text-secondary leading-none">Explorer {i}</p>
                                    <p className="text-[10px] font-bold text-slate-400 mt-1.5 uppercase tracking-widest">Premium Member</p>
                                 </div>
                              </div>
                           </td>
                           <td className="px-8 py-6">
                              <div className="flex items-center gap-2">
                                 <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
                                 <span className="text-xs font-black text-secondary uppercase tracking-widest">Active</span>
                              </div>
                           </td>
                           <td className="px-8 py-6 text-left">
                              <div className="flex items-center gap-2 text-sm font-bold text-slate-500">
                                 <MapPin className="h-4 w-4 text-primary" />
                                 San Francisco, CA
                              </div>
                           </td>
                           <td className="px-8 py-6 text-right">
                              <button className="p-3 text-slate-200 hover:text-secondary transition-colors">
                                 <MoreHorizontal className="h-5 w-5" />
                              </button>
                           </td>
                        </tr>
                      ))}
                   </tbody>
                </table>
             </div>
          </Card>
        </div>

        {/* System Insights */}
        <div className="lg:col-span-4 space-y-10">
           <Card className="p-10 space-y-8 border-none shadow-premium bg-secondary text-white relative overflow-hidden group">
              <div className="relative z-10 space-y-8 text-left">
                 <div className="bg-primary p-4 rounded-2xl w-fit shadow-glow">
                    <Layout className="h-8 w-8" />
                 </div>
                 <div className="space-y-3">
                    <h3 className="text-2xl font-black leading-tight">Platform Health</h3>
                    <div className="space-y-4">
                       <HealthBar label="API Response" value="99.9%" status="bg-green-500" />
                       <HealthBar label="Database" value="Optimal" status="bg-green-500" />
                       <HealthBar label="AI Latency" value="1.2s" status="bg-yellow-500" />
                    </div>
                 </div>
                 <Button className="w-full h-14 bg-white text-secondary hover:bg-white/90">System Dashboard</Button>
              </div>
              <div className="absolute top-0 right-0 w-40 h-40 bg-primary/20 rounded-full blur-[80px] -mr-20 -mt-20 group-hover:scale-150 transition-transform duration-1000" />
           </Card>

           <Card className="p-10 space-y-6 border-none shadow-premium bg-slate-50">
              <div className="flex items-center justify-between">
                 <h3 className="text-xl font-black text-secondary">Settings</h3>
                 <Settings className="h-5 w-5 text-slate-400" />
              </div>
              <div className="space-y-2">
                 <AdminSetting label="Global Maintenance" enabled={false} />
                 <AdminSetting label="Auto AI-Curation" enabled={true} />
                 <AdminSetting label="Community Moderation" enabled={true} />
              </div>
           </Card>
        </div>
      </div>
    </div>
  );
}

function AdminStat({ icon: Icon, label, value, trend }) {
  return (
    <Card padding="sm" className="border-none shadow-premium hover:shadow-2xl text-left">
       <div className="flex justify-between items-start">
          <div className="p-4 bg-primary/10 rounded-2xl">
             <Icon className="h-7 w-7 text-primary" />
          </div>
          <span className="text-[10px] font-black text-green-500 bg-green-50 px-2 py-1 rounded-lg uppercase tracking-widest">{trend}</span>
       </div>
       <div className="mt-8 space-y-1">
          <p className="text-4xl font-black text-secondary leading-none tracking-tighter">{value}</p>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mt-2">{label}</p>
       </div>
    </Card>
  );
}

function HealthBar({ label, value, status }) {
  return (
    <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5">
       <span className="text-xs font-bold text-white/60">{label}</span>
       <div className="flex items-center gap-2">
          <span className="text-xs font-black uppercase">{value}</span>
          <div className={cn("w-2 h-2 rounded-full", status)} />
       </div>
    </div>
  );
}

function AdminSetting({ label, enabled }) {
  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-50 shadow-sm hover:shadow-md transition-all cursor-pointer">
       <span className="text-sm font-bold text-secondary">{label}</span>
       <div className={cn(
          "w-12 h-6 rounded-full relative transition-all duration-300",
          enabled ? "bg-primary" : "bg-slate-200"
       )}>
          <div className={cn(
             "absolute top-1 w-4 h-4 rounded-full bg-white transition-all duration-300 shadow-md",
             enabled ? "left-7" : "left-1"
          )} />
       </div>
    </div>
  );
}
