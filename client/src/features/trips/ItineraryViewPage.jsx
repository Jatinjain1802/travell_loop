import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Calendar, MapPin, Users, Share2, MessageSquare, 
  CheckSquare, FileText, ChevronRight, Clock, Plus, 
  MoreHorizontal, Star, TrendingUp
} from 'lucide-react';
import { useTripStore } from '@/store/tripStore';

export default function ItineraryViewPage() {
  const { id } = useParams();
  const { trips } = useTripStore();
  const trip = trips.find(t => t.id === id) || trips[0]; // Fallback to first trip if id not found (mock)

  const [activeTab, setActiveTab] = useState('Day 1');

  if (!trip) return <div className="p-10 text-center">Trip not found</div>;

  return (
    <div className="max-w-6xl mx-auto space-y-8 py-6 relative">
      {/* Header Info */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b">
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <Link to="/trips" className="hover:text-primary transition-colors">My Trips</Link>
            <ChevronRight className="h-4 w-4" />
            <span>Itinerary</span>
          </div>
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tight">{trip.title}</h1>
            <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4" />
                {trip.place}
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                June 15 - June 25, 2024
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-green-100 text-green-700 text-xs font-bold uppercase tracking-wider">
                {trip.status}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex -space-x-3 mr-4">
            {[1, 2, 3].map(i => (
              <img 
                key={i} 
                src={`https://i.pravatar.cc/100?u=${i}`} 
                alt="user" 
                className="h-10 w-10 rounded-full border-2 border-background"
              />
            ))}
            <button className="h-10 w-10 rounded-full border-2 border-background bg-muted flex items-center justify-center text-xs font-bold hover:bg-primary hover:text-white transition-all">
              +
            </button>
          </div>
          <button className="p-2.5 border rounded-xl hover:bg-muted transition-colors">
            <Share2 className="h-5 w-5" />
          </button>
          <button className="flex items-center gap-2 bg-primary text-white px-6 py-2.5 rounded-xl font-bold shadow-lg shadow-primary/20 hover:scale-105 transition-all">
            <MessageSquare className="h-5 w-5" />
            Join Community
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-10">
        {/* Left Column - Itinerary Timeline */}
        <div className="lg:col-span-2 space-y-8">
          {/* Day Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
            {['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5'].map((day) => (
              <button
                key={day}
                onClick={() => setActiveTab(day)}
                className={`px-6 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-all ${
                  activeTab === day 
                    ? 'bg-secondary text-white shadow-md' 
                    : 'bg-muted/50 text-muted-foreground hover:bg-muted'
                }`}
              >
                {day}
              </button>
            ))}
            <button className="p-2.5 text-primary hover:bg-primary/10 rounded-xl transition-colors shrink-0">
              <Plus className="h-5 w-5" />
            </button>
          </div>

          {/* Timeline */}
          <div className="space-y-6 relative before:absolute before:left-4 before:top-4 before:bottom-4 before:w-0.5 before:bg-muted">
            {[
              { time: '09:00 AM', title: 'Breakfast at Café de Flore', category: 'Food', duration: '1h', rating: 4.8 },
              { time: '11:00 AM', title: 'Eiffel Tower Tour', category: 'Sightseeing', duration: '2h', rating: 4.9 },
              { time: '02:00 PM', title: 'Louvre Museum Visit', category: 'Culture', duration: '3h', rating: 4.7 },
              { time: '07:00 PM', title: 'Dinner Cruise on Seine', category: 'Experience', duration: '2.5h', rating: 4.9 },
            ].map((activity, idx) => (
              <div key={idx} className="relative pl-12 group">
                <div className="absolute left-0 top-2 w-8 h-8 rounded-full bg-background border-2 border-primary flex items-center justify-center z-10">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                </div>
                
                <div className="bg-card border rounded-3xl p-5 hover:border-primary/50 transition-all hover:shadow-md group">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest">
                        <Clock className="h-3.5 w-3.5" />
                        {activity.time} • {activity.duration}
                      </div>
                      <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">{activity.title}</h3>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="flex items-center gap-1 text-sm font-bold text-yellow-500">
                          <Star className="h-3.5 w-3.5 fill-yellow-500" />
                          {activity.rating}
                        </div>
                        <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-tighter">{activity.category}</p>
                      </div>
                      <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                        <MoreHorizontal className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            <button className="ml-12 w-full py-4 border-2 border-dashed rounded-3xl text-muted-foreground font-bold flex items-center justify-center gap-2 hover:bg-muted/30 hover:border-primary/30 transition-all group">
              <Plus className="h-5 w-5 group-hover:scale-110 transition-transform" />
              Add Activity to {activeTab}
            </button>
          </div>
        </div>

        {/* Right Column - Insights & Tools */}
        <div className="space-y-8">
          {/* Budget Insight Quick Card */}
          <div className="bg-secondary rounded-3xl p-6 text-white space-y-6 shadow-xl shadow-secondary/20 relative overflow-hidden">
            <div className="relative z-10 space-y-4">
              <div className="flex items-center justify-between">
                <div className="bg-white/20 p-2 rounded-xl">
                  <TrendingUp className="h-5 w-5" />
                </div>
                <span className="text-xs font-bold uppercase tracking-widest text-white/60">Budget Analysis</span>
              </div>
              <div className="space-y-1">
                <p className="text-3xl font-bold">$2,450.00</p>
                <p className="text-sm text-white/60">Estimated total expenses</p>
              </div>
              <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                <div className="bg-primary w-[65%] h-full rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
              </div>
              <p className="text-xs text-white/50 text-center italic">"You're 35% under your total budget. Great job!"</p>
            </div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -mr-16 -mt-16" />
          </div>

          {/* Quick Actions / Tools */}
          <div className="grid grid-cols-1 gap-4">
            <Link to={`/trips/${id}/checklist`} className="flex items-center justify-between p-5 bg-card border rounded-2xl hover:border-primary hover:shadow-md transition-all group">
              <div className="flex items-center gap-4">
                <div className="bg-orange-100 text-orange-600 p-3 rounded-xl group-hover:scale-110 transition-transform">
                  <CheckSquare className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-bold">Packing Checklist</h4>
                  <p className="text-xs text-muted-foreground">12/24 items packed</p>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </Link>

            <Link to={`/trips/${id}/invoice`} className="flex items-center justify-between p-5 bg-card border rounded-2xl hover:border-primary hover:shadow-md transition-all group">
              <div className="flex items-center gap-4">
                <div className="bg-blue-100 text-blue-600 p-3 rounded-xl group-hover:scale-110 transition-transform">
                  <FileText className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-bold">Expense Invoice</h4>
                  <p className="text-xs text-muted-foreground">Generate PDF report</p>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
