import { useState } from 'react';
import { 
  Users, Database, ShieldCheck, BarChart3, 
  Search, Filter, MoreVertical, Trash2, 
  CheckCircle, XCircle, AlertTriangle, TrendingUp 
} from 'lucide-react';

export default function AdminPage() {
  const [activeView, setActiveView] = useState('Users');

  return (
    <div className="max-w-7xl mx-auto py-10 space-y-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-4xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-muted-foreground mt-1">Platform management, analytics, and data controls.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-secondary text-white px-6 py-2.5 rounded-2xl font-bold text-sm shadow-xl">
            <Database className="h-4 w-4" />
            Export Data
          </button>
        </div>
      </div>

      {/* Admin Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Users', value: '24,512', trend: '+12%', icon: Users, color: 'text-blue-600', bg: 'bg-blue-100' },
          { label: 'Active Trips', value: '1,840', trend: '+5.4%', icon: TrendingUp, color: 'text-green-600', bg: 'bg-green-100' },
          { label: 'Reports', value: '12', trend: '-2', icon: AlertTriangle, color: 'text-amber-600', bg: 'bg-amber-100' },
          { label: 'Revenue', value: '$8,420', trend: '+18%', icon: BarChart3, color: 'text-purple-600', bg: 'bg-purple-100' },
        ].map((stat) => (
          <div key={stat.label} className="bg-card border rounded-[32px] p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color}`}>
                <stat.icon className="h-6 w-6" />
              </div>
              <span className={`text-xs font-bold ${stat.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                {stat.trend}
              </span>
            </div>
            <div className="space-y-1">
              <p className="text-muted-foreground text-xs font-bold uppercase tracking-widest">{stat.label}</p>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-4 gap-10">
        {/* Navigation Sidebar */}
        <aside className="lg:col-span-1 space-y-6">
          <nav className="space-y-2">
            {[
              { name: 'Users', icon: Users },
              { name: 'Trip Data', icon: Database },
              { name: 'Security', icon: ShieldCheck },
              { name: 'Analytics', icon: BarChart3 },
            ].map((nav) => (
              <button
                key={nav.name}
                onClick={() => setActiveView(nav.name)}
                className={`w-full flex items-center gap-3 px-6 py-4 rounded-2xl text-sm font-bold transition-all ${
                  activeView === nav.name 
                    ? 'bg-primary text-white shadow-xl shadow-primary/20 scale-105' 
                    : 'text-muted-foreground hover:bg-muted'
                }`}
              >
                <nav.icon className="h-5 w-5" />
                {nav.name}
              </button>
            ))}
          </nav>
        </aside>

        {/* Management Area */}
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-card border rounded-[40px] overflow-hidden shadow-sm">
            <div className="p-8 border-b space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold">{activeView} Management</h3>
                <div className="flex items-center gap-2">
                  <button className="p-2 border rounded-xl hover:bg-muted transition-colors">
                    <Filter className="h-4 w-4" />
                  </button>
                  <button className="p-2 border rounded-xl hover:bg-muted transition-colors">
                    <Search className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-muted/30 border-b">
                    <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">User</th>
                    <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Status</th>
                    <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Trips</th>
                    <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {[
                    { name: 'Alex Johnson', email: 'alex@example.com', status: 'Active', trips: 14, img: 'https://i.pravatar.cc/100?u=alex' },
                    { name: 'Elena Rodriguez', email: 'elena@example.com', status: 'Pending', trips: 2, img: 'https://i.pravatar.cc/100?u=elena' },
                    { name: 'Marcus Chen', email: 'marcus@example.com', status: 'Suspended', trips: 0, img: 'https://i.pravatar.cc/100?u=marcus' },
                    { name: 'Sarah Jenkins', email: 'sarah@example.com', status: 'Active', trips: 8, img: 'https://i.pravatar.cc/100?u=sarah' },
                  ].map((user) => (
                    <tr key={user.email} className="group hover:bg-muted/10 transition-colors">
                      <td className="px-8 py-4">
                        <div className="flex items-center gap-3">
                          <img src={user.img} className="h-10 w-10 rounded-full grayscale group-hover:grayscale-0 transition-all" />
                          <div>
                            <p className="font-bold text-sm">{user.name}</p>
                            <p className="text-xs text-muted-foreground">{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-4">
                        <div className="flex items-center gap-2">
                          {user.status === 'Active' && <CheckCircle className="h-4 w-4 text-green-500" />}
                          {user.status === 'Pending' && <AlertTriangle className="h-4 w-4 text-amber-500" />}
                          {user.status === 'Suspended' && <XCircle className="h-4 w-4 text-red-500" />}
                          <span className="text-sm font-medium">{user.status}</span>
                        </div>
                      </td>
                      <td className="px-8 py-4 font-bold text-sm">{user.trips}</td>
                      <td className="px-8 py-4 text-right">
                        <button className="p-2 hover:bg-muted rounded-xl transition-colors">
                          <MoreVertical className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="p-6 bg-muted/20 border-t flex items-center justify-between">
              <p className="text-xs text-muted-foreground">Showing 4 of 24,512 users</p>
              <div className="flex items-center gap-2">
                <button className="px-4 py-1.5 border rounded-lg text-xs font-bold hover:bg-muted transition-colors">Previous</button>
                <button className="px-4 py-1.5 border rounded-lg text-xs font-bold hover:bg-muted transition-colors">Next</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
