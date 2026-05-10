import { useState } from 'react';
import { 
  CheckSquare, Square, Plus, 
  Trash2, Filter, ShieldCheck, 
  Tag, Info, MoreVertical, ArrowLeft
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Card, Input, cn } from '@/components/common/UI';

export default function ChecklistPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [items, setItems] = useState([
    { id: 1, text: 'Renew Passport', category: 'Documentation', completed: true },
    { id: 2, text: 'Buy Travel Insurance', category: 'Documentation', completed: false },
    { id: 3, text: 'Pack Universal Adapter', category: 'Gear', completed: false },
    { id: 4, text: 'Confirm Hotel Bookings', category: 'Bookings', completed: true },
  ]);

  const toggleItem = (id) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  return (
    <div className="max-w-5xl mx-auto py-12 space-y-12 animate-premium">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 border-b border-slate-100 pb-10">
        <div className="flex items-center gap-6">
          <button 
            onClick={() => navigate(`/trips/${id}`)}
            className="h-14 w-14 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 hover:text-secondary hover:bg-slate-100 transition-all"
          >
            <ArrowLeft className="h-6 w-6" />
          </button>
          <div className="space-y-1 text-left">
            <h1 className="text-4xl font-black text-secondary tracking-tight">Essential <span className="text-primary italic">Checklist.</span></h1>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Master list for: Tropical Escape</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right mr-4">
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Progress</p>
            <p className="text-2xl font-black text-secondary">50%</p>
          </div>
          <div className="w-24 h-3 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-primary rounded-full shadow-glow" style={{ width: '50%' }} />
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-12">
        {/* Input & Categories */}
        <div className="space-y-10">
          <Card className="p-10 space-y-8 bg-slate-50 border-none shadow-premium">
            <h3 className="text-2xl font-black text-secondary">Add Item</h3>
            <div className="space-y-6">
              <Input label="Item Name" placeholder="e.g. Extra batteries" icon={Plus} />
              <Input label="Category" placeholder="Documentation" icon={Tag} />
              <Button className="w-full h-16 shadow-lg">Add to Checklist</Button>
            </div>
          </Card>

          <Card className="p-10 space-y-6 bg-secondary text-white border-none shadow-2xl relative overflow-hidden group">
            <div className="relative z-10 space-y-6">
              <div className="bg-primary p-3 rounded-xl w-fit shadow-glow">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-black leading-tight">Pro Tip</h3>
              <p className="text-sm font-bold text-white/50 leading-relaxed">
                Always keep digital copies of your <span className="text-primary">Documentation</span> category items in your Notes.
              </p>
            </div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-[60px] -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-1000" />
          </Card>
        </div>

        {/* List Area */}
        <div className="lg:col-span-2 space-y-10">
           <div className="flex items-center justify-between px-2">
              <div className="flex items-center gap-6">
                 {['All', 'Documentation', 'Gear', 'Bookings'].map(cat => (
                   <button key={cat} className={cn("text-xs font-black uppercase tracking-widest transition-all", cat === 'All' ? "text-primary" : "text-slate-400 hover:text-secondary")}>
                      {cat}
                   </button>
                 ))}
              </div>
              <Button variant="ghost" className="h-10 text-slate-400 gap-2">
                 <Filter className="h-4 w-4" />
                 Sort
              </Button>
           </div>

           <div className="space-y-4">
              {items.map(item => (
                <div 
                  key={item.id}
                  onClick={() => toggleItem(item.id)}
                  className={cn(
                    "group flex items-center justify-between p-6 rounded-[24px] border-2 transition-all cursor-pointer",
                    item.completed 
                      ? "bg-slate-50 border-slate-50 opacity-60" 
                      : "bg-white border-slate-100 hover:border-primary/20 hover:shadow-md"
                  )}
                >
                  <div className="flex items-center gap-6">
                    <div className={cn(
                      "h-10 w-10 rounded-xl flex items-center justify-center transition-all",
                      item.completed ? "bg-primary text-white" : "bg-slate-50 text-slate-300 group-hover:text-primary"
                    )}>
                      {item.completed ? <CheckSquare className="h-6 w-6" /> : <Square className="h-6 w-6" />}
                    </div>
                    <div className="text-left">
                      <p className={cn("text-xl font-black transition-all", item.completed ? "text-slate-400 line-through" : "text-secondary")}>{item.text}</p>
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{item.category}</span>
                    </div>
                  </div>
                  <button className="p-3 text-slate-200 hover:text-destructive hover:bg-destructive/5 rounded-xl transition-all">
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              ))}
           </div>
           
           <div className="flex items-center justify-center gap-4 py-8 border-t border-dashed border-slate-100">
              <Info className="h-5 w-5 text-primary" />
              <p className="text-sm font-bold text-slate-400">Total 12 items. 6 remaining for absolute readiness.</p>
           </div>
        </div>
      </div>
    </div>
  );
}
