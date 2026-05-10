import { Link } from 'react-router-dom';
import { 
  Plus, Search, MapPin, 
  ChevronRight, Filter, TrendingUp, Sparkles,
  Clock, Users, MoreHorizontal, Calendar
} from 'lucide-react';
import { useTripStore } from '@/store/tripStore';
import { Button, Card, cn } from '@/components/common/UI';

export default function TripListingPage() {
  const { trips } = useTripStore();

  return (
    <div className="space-y-12 pb-20 animate-premium">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
        <div className="space-y-4 text-left">
          <div className="flex items-center gap-3 text-primary">
            <TrendingUp className="h-6 w-6" />
            <span className="text-xs font-black uppercase tracking-[0.2em]">Trip Manager</span>
          </div>
          <h1 className="text-6xl font-black tracking-tight text-secondary leading-none">Your <span className="text-primary italic">Journeys.</span></h1>
          <p className="text-slate-400 font-bold max-w-lg leading-relaxed">Organize, explore, and relive your adventures with high-precision tools.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative group flex-1 lg:flex-none">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-primary transition-colors" />
            <input 
              type="text" 
              placeholder="Search your trips..." 
              className="h-16 pl-12 pr-6 rounded-2xl bg-white border-slate-100 border text-sm font-bold focus:ring-4 focus:ring-primary/10 transition-all outline-none w-full lg:w-80 shadow-sm"
            />
          </div>
          <Link to="/trips/create">
            <Button size="lg" className="h-16 px-10 shadow-xl">
              <Plus className="h-6 w-6" />
              New Adventure
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-12">
        {/* Main Feed */}
        <div className="lg:col-span-9 space-y-10">
          <div className="flex items-center justify-between border-b border-slate-100 pb-8 px-2">
            <div className="flex items-center gap-8">
              <button className="text-sm font-black text-secondary relative pb-8 mb-[-33px]">
                Active Trips
                <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-primary rounded-t-full shadow-glow" />
              </button>
              <button className="text-sm font-black text-slate-400 hover:text-secondary transition-colors pb-8 mb-[-33px]">
                Past Experiences
              </button>
              <button className="text-sm font-black text-slate-400 hover:text-secondary transition-colors pb-8 mb-[-33px]">
                Drafts
              </button>
            </div>
            <Button variant="ghost" className="h-10 px-4 gap-2 text-slate-400 font-black">
              <Filter className="h-4 w-4" />
              Refine View
            </Button>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            {trips.map((trip) => (
              <Card key={trip.id} padding="none" className="group overflow-hidden border-none hover:shadow-2xl">
                <Link to={`/trips/${trip.id}`} className="block">
                  <div className="relative h-72 overflow-hidden">
                    <img 
                      src={`https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070`} 
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
                      alt={trip.title}
                    />
                    <div className="absolute top-6 left-6 bg-white/95 backdrop-blur-md px-4 py-2 rounded-xl flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-secondary shadow-xl">
                      <Clock className="h-3.5 w-3.5 text-primary" />
                      In 12 Days
                    </div>
                  </div>
                  <div className="p-10 space-y-8 text-left">
                    <div className="space-y-3">
                      <div className="flex justify-between items-start">
                        <h3 className="text-3xl font-black text-secondary group-hover:text-primary transition-colors leading-tight">{trip.title}</h3>
                        <button className="p-2 text-slate-300 hover:text-secondary transition-colors">
                          <MoreHorizontal className="h-6 w-6" />
                        </button>
                      </div>
                      <div className="flex items-center gap-6 text-sm font-bold text-slate-400">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-primary" />
                          {trip.place}
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-primary" />
                          Oct 12 - 24
                        </div>
                      </div>
                    </div>

                    <div className="pt-8 border-t border-slate-100 flex items-center justify-between">
                      <div className="flex -space-x-3">
                        {[1, 2, 3].map(i => (
                          <img key={i} src={`https://i.pravatar.cc/100?u=${i}`} className="h-10 w-10 rounded-xl border-4 border-white shadow-lg" alt="user" />
                        ))}
                        <div className="h-10 w-10 rounded-xl border-4 border-white bg-slate-50 flex items-center justify-center text-[10px] font-black text-slate-400 shadow-lg">+2</div>
                      </div>
                      <div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-primary">
                        View Hub
                        <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              </Card>
            ))}

            <Link to="/trips/create" className="h-[520px] rounded-[32px] border-4 border-dashed border-slate-100 hover:border-primary/40 hover:bg-primary/5 transition-all group flex flex-col items-center justify-center gap-6">
              <div className="h-20 w-20 bg-primary/10 rounded-3xl flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all duration-500 shadow-glow">
                <Plus className="h-10 w-10 text-primary group-hover:text-white transition-colors" />
              </div>
              <div className="text-center space-y-2">
                <p className="text-2xl font-black text-secondary">Plan New Adventure</p>
                <p className="text-sm font-bold text-slate-400">Start from scratch or use AI</p>
              </div>
            </Link>
          </div>
        </div>

        {/* Sidebar Insights */}
        <div className="lg:col-span-3 space-y-10">
          <Card className="bg-secondary p-10 text-white relative overflow-hidden group border-none shadow-2xl">
            <div className="relative z-10 space-y-8">
              <div className="bg-primary p-4 rounded-2xl w-fit shadow-glow">
                <Sparkles className="h-8 w-8 text-white" />
              </div>
              <div className="space-y-3">
                <h3 className="text-2xl font-black leading-tight">AI Discovery</h3>
                <p className="text-sm font-bold text-white/50 leading-relaxed">
                  We noticed you love beaches. Have you considered <span className="text-primary italic">Siargao</span> for your next escape?
                </p>
              </div>
              <Button className="w-full h-14 bg-white text-secondary hover:bg-white/90">Get AI Proposal</Button>
            </div>
            <div className="absolute top-0 right-0 w-40 h-40 bg-primary/20 rounded-full blur-[80px] -mr-20 -mt-20 group-hover:scale-150 transition-transform duration-1000" />
          </Card>

          <div className="space-y-6">
            <h3 className="text-xl font-black text-secondary ml-2">Quick Stats</h3>
            <div className="grid gap-6">
              <StatItem label="Miles Flowed" value="12,450" icon={TrendingUp} />
              <StatItem label="Loop Points" value="8,240" icon={Sparkles} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatItem({ label, value, icon: Icon }) {
  return (
    <Card padding="sm" className="bg-white border-slate-50 shadow-sm hover:shadow-md">
      <div className="flex items-center gap-5">
        <div className="p-4 bg-primary/10 rounded-2xl">
          <Icon className="h-6 w-6 text-primary" />
        </div>
        <div className="text-left">
          <p className="text-2xl font-black text-secondary leading-none">{value}</p>
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-1.5">{label}</p>
        </div>
      </div>
    </Card>
  );
}
