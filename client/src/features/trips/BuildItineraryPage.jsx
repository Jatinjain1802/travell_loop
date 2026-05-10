import { useState } from 'react';
import { 
  Plus, Search, MapPin, 
  Clock, Calendar, Sparkles,
  Utensils, Map as MapIcon, 
  TrendingUp, Save, ArrowLeft
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Card, Input, cn } from '@/components/common/UI';

export default function BuildItineraryPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeDay, setActiveDay] = useState(1);

  return (
    <div className="space-y-12 pb-20 animate-premium">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 border-b border-slate-100 pb-10">
        <div className="flex items-center gap-6">
          <button 
            onClick={() => navigate(`/trips/${id}`)}
            className="h-14 w-14 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 hover:text-secondary hover:bg-slate-100 transition-all"
          >
            <ArrowLeft className="h-6 w-6" />
          </button>
          <div className="space-y-1 text-left">
            <h1 className="text-4xl font-black text-secondary tracking-tight">Builder <span className="text-primary">Mode.</span></h1>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Tropical Escape: Bali & Beyond</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline" className="h-14 px-8 border-slate-200 text-secondary">Discard Changes</Button>
          <Button className="h-14 px-10 shadow-xl">
            <Save className="h-5 w-5" />
            Save masterpiece
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-12">
        {/* Planner Sidebar */}
        <div className="lg:col-span-4 space-y-10">
          <Card className="p-10 space-y-8 border-none shadow-premium bg-slate-50">
            <h3 className="text-2xl font-black text-secondary">Add Activity</h3>
            <div className="space-y-6">
              <Input label="Activity Name" placeholder="e.g. Visit Rice Fields" icon={Sparkles} />
              <Input label="Location" placeholder="Ubud, Bali" icon={MapPin} />
              <div className="grid grid-cols-2 gap-4">
                <Input label="Start Time" type="time" icon={Clock} />
                <Input label="Category" placeholder="Food" icon={Utensils} />
              </div>
              <Button className="w-full h-16 shadow-lg">
                <Plus className="h-5 w-5" />
                Add to Day {activeDay}
              </Button>
            </div>
          </Card>

          <Card className="p-10 space-y-6 bg-secondary text-white border-none shadow-2xl relative overflow-hidden group">
            <div className="relative z-10 space-y-6">
              <div className="bg-primary p-3 rounded-xl w-fit shadow-glow">
                <Sparkles className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-black leading-tight">AI Auto-Build</h3>
              <p className="text-sm font-bold text-white/50 leading-relaxed">
                Let our AI engine populate Day {activeDay} with top-rated spots based on your travel style.
              </p>
              <Button className="w-full h-14 bg-white text-secondary hover:bg-white/90">Generate Schedule</Button>
            </div>
            <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-primary/10 rounded-full blur-[80px] group-hover:scale-150 transition-transform duration-1000" />
          </Card>
        </div>

        {/* Builder Timeline Area */}
        <div className="lg:col-span-8 space-y-12">
           <div className="flex items-center gap-4 overflow-x-auto no-scrollbar pb-2">
             {[1, 2, 3, 4, 5, 6, 7].map(day => (
               <button 
                key={day}
                onClick={() => setActiveDay(day)}
                className={cn(
                  "min-w-[100px] h-20 rounded-2xl flex flex-col items-center justify-center transition-all duration-300 border-2",
                  activeDay === day 
                    ? "bg-primary border-primary text-white shadow-glow scale-105" 
                    : "bg-white border-slate-100 text-slate-400 hover:border-primary/20"
                )}
               >
                 <span className="text-[10px] font-black uppercase tracking-widest">Day</span>
                 <span className="text-2xl font-black leading-none">{day}</span>
               </button>
             ))}
           </div>

           <div className="space-y-6">
              <div className="flex items-center justify-between px-2">
                <h3 className="text-2xl font-black text-secondary">Schedule for Day {activeDay}</h3>
                <div className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-widest">
                  <TrendingUp className="h-4 w-4 text-primary" />
                  3 Activities Planned
                </div>
              </div>

              <div className="space-y-4">
                 <DraggableActivity time="09:00 AM" title="Traditional Breakfast" />
                 <DraggableActivity time="11:30 AM" title="Monkey Forest Sanctuary" />
                 <DraggableActivity time="02:30 PM" title="Rice Terrace Trek" />
                 
                 <button className="w-full h-32 rounded-3xl border-4 border-dashed border-slate-50 flex flex-col items-center justify-center gap-3 text-slate-300 hover:text-primary hover:border-primary/20 hover:bg-slate-50 transition-all group">
                    <Plus className="h-8 w-8 transition-transform group-hover:scale-110" />
                    <span className="text-sm font-black uppercase tracking-[0.2em]">Drop to Add Activity</span>
                 </button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}

function DraggableActivity({ time, title }) {
  return (
    <div className="bg-white border border-slate-100 p-6 rounded-3xl shadow-sm flex items-center justify-between hover:shadow-md transition-all cursor-move group">
      <div className="flex items-center gap-6">
        <div className="bg-slate-50 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-primary transition-colors">
          {time}
        </div>
        <h4 className="text-xl font-black text-secondary">{title}</h4>
      </div>
      <div className="flex items-center gap-2">
        <button className="h-10 w-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-300 hover:text-secondary hover:bg-slate-100 transition-all">
          <MapIcon className="h-4 w-4" />
        </button>
        <button className="h-10 w-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-300 hover:text-destructive hover:bg-destructive/5 transition-all">
          <Plus className="h-4 w-4 rotate-45" />
        </button>
      </div>
    </div>
  );
}
