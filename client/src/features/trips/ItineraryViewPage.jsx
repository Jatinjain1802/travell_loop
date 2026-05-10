import { useState } from 'react';
import { 
  Calendar, MapPin, Clock, 
  ChevronRight, MoreHorizontal, 
  Plus, Plane, Hotel, Utensils, 
  Map as MapIcon, Share2, Download,
  TrendingUp, Wallet, Sparkles
} from 'lucide-react';
import { Button, Card, cn } from '@/components/common/UI';

export default function ItineraryViewPage() {
  const [activeDay, setActiveDay] = useState(1);

  return (
    <div className="space-y-12 pb-20 animate-premium">
      {/* Header / Hero */}
      <div className="relative h-[450px] rounded-[48px] overflow-hidden group shadow-2xl">
        <img 
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073" 
          className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-105" 
          alt="Trip Header" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/20 to-transparent" />
        
        <div className="absolute bottom-12 left-12 right-12 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="bg-primary px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-white shadow-glow">
                Upcoming Adventure
              </div>
              <div className="bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-white border border-white/20">
                Oct 12 - 24, 2024
              </div>
            </div>
            <h1 className="text-6xl md:text-7xl font-black text-white tracking-tighter leading-none">Tropical Escape: <br /><span className="text-primary italic">Bali & Beyond</span></h1>
            <div className="flex items-center gap-6 text-white/80 font-bold">
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                Ubud & Canggu, Indonesia
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                4 Explorers
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <Button variant="secondary" className="h-16 px-8 glass border-white/10 text-white">
              <Share2 className="h-5 w-5" />
              Collaborate
            </Button>
            <Button className="h-16 px-10 shadow-glow">
              <Download className="h-5 w-5" />
              Export PDF
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-12 gap-12">
        {/* Left Column - Timeline */}
        <div className="lg:col-span-8 space-y-12">
          {/* Day Selector */}
          <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-2">
            {[1, 2, 3, 4, 5, 6, 7].map((day) => (
              <button
                key={day}
                onClick={() => setActiveDay(day)}
                className={cn(
                  "min-w-[120px] h-24 rounded-3xl flex flex-col items-center justify-center gap-1 transition-all duration-300 border-2",
                  activeDay === day 
                    ? "bg-secondary border-secondary text-white shadow-xl scale-105" 
                    : "bg-white border-slate-100 text-slate-400 hover:border-primary/30 hover:text-secondary"
                )}
              >
                <span className="text-[10px] font-black uppercase tracking-widest">Day</span>
                <span className="text-3xl font-black leading-none">0{day}</span>
              </button>
            ))}
            <button className="min-w-[120px] h-24 rounded-3xl border-2 border-dashed border-slate-100 flex items-center justify-center text-slate-300 hover:text-primary hover:border-primary transition-all">
              <Plus className="h-8 w-8" />
            </button>
          </div>

          {/* Timeline Events */}
          <div className="space-y-10 relative pl-10 border-l-4 border-slate-50">
            <TimelineEvent 
              time="09:00 AM"
              title="Traditional Balinese Breakfast"
              location="Ubud Traditional Market"
              category="Food"
              icon={Utensils}
              image="https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=1974"
            />
            <TimelineEvent 
              time="11:30 AM"
              title="Sacred Monkey Forest Sanctuary"
              location="Jl. Monkey Forest, Ubud"
              category="Activity"
              icon={MapIcon}
              image="https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=2076"
            />
            <TimelineEvent 
              time="02:30 PM"
              title="Tegalalang Rice Terrace Trek"
              location="Tegalalang, Gianyar"
              category="Nature"
              icon={TrendingUp}
              image="https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?q=80&w=2080"
            />
          </div>
        </div>

        {/* Right Column - Stats & Insights */}
        <div className="lg:col-span-4 space-y-10">
          <Card className="p-10 space-y-8 bg-slate-50 border-none shadow-premium">
            <h3 className="text-2xl font-black text-secondary">Trip Budget</h3>
            <div className="space-y-6">
              <div className="flex justify-between items-end">
                <div className="space-y-1">
                  <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Total Spent</p>
                  <p className="text-4xl font-black text-secondary">$3,450.00</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-black text-primary uppercase tracking-widest">Target: $5k</p>
                  <p className="text-sm font-bold text-slate-400">69% Utilized</p>
                </div>
              </div>
              <div className="h-4 bg-slate-200 rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full shadow-glow" style={{ width: '69%' }} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <BudgetTag label="Flights" value="$1,200" color="bg-blue-500" />
                <BudgetTag label="Hotels" value="$1,800" color="bg-coral-500" />
              </div>
            </div>
            <Button variant="outline" className="w-full h-14 border-slate-200 text-secondary">View Expense Report</Button>
          </Card>

          <Card className="p-10 space-y-6 bg-secondary text-white border-none shadow-2xl relative overflow-hidden group">
            <div className="relative z-10 space-y-6">
              <div className="bg-primary p-3 rounded-xl w-fit shadow-glow">
                <Sparkles className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-black leading-tight">Smart Suggestion</h3>
              <p className="text-sm font-bold text-white/50 leading-relaxed">
                Weather forecast predicts light rain tomorrow. Consider moving the <span className="text-primary italic">Rice Terrace Trek</span> to Day 4 for better views.
              </p>
              <Button className="w-full h-14 bg-white text-secondary hover:bg-white/90">Optimize Schedule</Button>
            </div>
            <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-primary/10 rounded-full blur-[80px] group-hover:scale-150 transition-transform duration-1000" />
          </Card>
        </div>
      </div>
    </div>
  );
}

function TimelineEvent({ time, title, location, category, icon: Icon, image }) {
  return (
    <div className="relative group">
      {/* Timeline Dot */}
      <div className="absolute -left-[54px] top-6 w-10 h-10 bg-white border-4 border-slate-50 rounded-2xl flex items-center justify-center shadow-xl z-10 group-hover:border-primary group-hover:scale-110 transition-all duration-300">
        <Icon className="h-4 w-4 text-primary" />
      </div>

      <Card padding="none" className="overflow-hidden hover:shadow-2xl border-none">
        <div className="flex flex-col md:flex-row h-full">
          <div className="md:w-64 h-64 md:h-auto overflow-hidden">
            <img src={image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt={title} />
          </div>
          <div className="flex-1 p-8 space-y-6 text-left">
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5 text-primary">
                    <Clock className="h-4 w-4" />
                    <span className="text-xs font-black uppercase tracking-widest">{time}</span>
                  </div>
                  <div className="w-1 h-1 rounded-full bg-slate-200" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{category}</span>
                </div>
                <h4 className="text-2xl font-black text-secondary group-hover:text-primary transition-colors leading-tight">{title}</h4>
              </div>
              <button className="p-2 text-slate-300 hover:text-secondary transition-colors">
                <MoreHorizontal className="h-6 w-6" />
              </button>
            </div>
            
            <div className="flex items-center gap-2 text-sm font-bold text-slate-400">
              <MapPin className="h-4 w-4 text-primary" />
              {location}
            </div>

            <div className="flex items-center gap-4 pt-4 border-t border-slate-50">
              <Button size="sm" variant="ghost" className="h-10 text-primary">View on Map</Button>
              <Button size="sm" variant="ghost" className="h-10 text-secondary">Add Note</Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

function BudgetTag({ label, value, color }) {
  return (
    <div className="p-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
      <div className="flex items-center gap-2 mb-1">
        <div className={cn("w-2 h-2 rounded-full", color)} />
        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{label}</span>
      </div>
      <p className="text-lg font-black text-secondary">{value}</p>
    </div>
  );
}
