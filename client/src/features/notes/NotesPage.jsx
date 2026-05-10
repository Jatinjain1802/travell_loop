import { useState } from 'react';
import { 
  Plus, Search, Edit3, 
  Trash2, Pin, Tag, 
  Clock, Maximize2, ArrowLeft,
  FileText, Sparkles
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Card, Input, cn } from '@/components/common/UI';

export default function NotesPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [notes, setNotes] = useState([
    { id: 1, title: 'Passport Copies', text: 'Scanned copy of main page and visa...', date: '2h ago', category: 'Travel Docs', pinned: true },
    { id: 2, title: 'Villa Entry Code', text: 'The code is 1245# - Gate near the pool...', date: '5h ago', category: 'Logistics', pinned: false },
    { id: 3, title: 'Restaurant Wishlist', text: '1. Merah Putih\n2. Sisterfields...', date: '1d ago', category: 'Food', pinned: false },
  ]);

  return (
    <div className="max-w-6xl mx-auto py-12 space-y-12 animate-premium">
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
            <h1 className="text-4xl font-black text-secondary tracking-tight">Travel <span className="text-primary italic">Notes.</span></h1>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Digital Vault for: Tropical Escape</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-primary transition-colors" />
            <input 
              type="text" 
              placeholder="Search notes..." 
              className="h-14 pl-12 pr-6 rounded-2xl bg-slate-50 border-none text-sm font-bold focus:ring-4 focus:ring-primary/10 transition-all outline-none w-64"
            />
          </div>
          <Button size="lg" className="h-14 px-8 shadow-xl">
            <Plus className="h-5 w-5" />
            Add Note
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-12">
        {/* Categories Sidebar */}
        <div className="space-y-10">
          <div className="space-y-6">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Categories</h3>
            <div className="space-y-2">
              {['All Notes', 'Travel Docs', 'Logistics', 'Food', 'Drafts'].map(cat => (
                <button key={cat} className={cn(
                  "flex items-center justify-between w-full p-4 rounded-2xl text-sm font-bold transition-all",
                  cat === 'All Notes' ? "bg-secondary text-white shadow-xl" : "text-slate-400 hover:bg-slate-50 hover:text-secondary"
                )}>
                  {cat}
                  <span className="text-[10px] bg-slate-100 text-slate-400 px-2 py-0.5 rounded-lg group-hover:bg-primary/20">12</span>
                </button>
              ))}
            </div>
          </div>

          <Card className="p-8 bg-primary/10 border-none space-y-6">
            <div className="bg-primary p-3 rounded-xl w-fit shadow-glow">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <div className="space-y-2">
              <h4 className="text-xl font-black text-secondary leading-tight">AI Note Summary</h4>
              <p className="text-sm font-bold text-slate-500 leading-relaxed">
                We've organized your villa entry codes and flight details into a quick-access dashboard.
              </p>
            </div>
            <Button variant="outline" className="w-full border-primary/20 text-primary hover:bg-primary/5">View Dashboard</Button>
          </Card>
        </div>

        {/* Notes Grid */}
        <div className="lg:col-span-3">
          <div className="grid md:grid-cols-2 gap-8">
            {notes.map(note => (
              <Card key={note.id} padding="none" className="group overflow-hidden border-none shadow-premium hover:shadow-2xl">
                 <div className="p-8 space-y-6 text-left">
                    <div className="flex justify-between items-start">
                      <div className="bg-slate-50 p-3 rounded-2xl">
                        <FileText className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex items-center gap-2">
                        {note.pinned && <Pin className="h-4 w-4 text-primary fill-primary" />}
                        <button className="p-2 text-slate-200 hover:text-secondary transition-colors"><MoreVertical className="h-5 w-5" /></button>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="text-2xl font-black text-secondary group-hover:text-primary transition-colors">{note.title}</h3>
                      <p className="text-sm font-bold text-slate-400 leading-relaxed line-clamp-3">{note.text}</p>
                    </div>

                    <div className="pt-6 border-t border-slate-50 flex items-center justify-between">
                       <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-300">
                          <Clock className="h-3.5 w-3.5" />
                          {note.date}
                       </div>
                       <div className="flex items-center gap-2">
                          <Button size="sm" variant="ghost" className="h-10 w-10 p-0 text-slate-300 hover:text-secondary">
                             <Edit3 className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="ghost" className="h-10 w-10 p-0 text-slate-300 hover:text-destructive">
                             <Trash2 className="h-4 w-4" />
                          </Button>
                       </div>
                    </div>
                 </div>
              </Card>
            ))}

            <button className="h-[340px] rounded-[32px] border-4 border-dashed border-slate-100 hover:border-primary/20 hover:bg-primary/5 transition-all group flex flex-col items-center justify-center gap-4">
               <div className="h-16 w-16 bg-primary/10 rounded-2xl flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all duration-500">
                  <Plus className="h-8 w-8 text-primary group-hover:text-white transition-colors" />
               </div>
               <div className="text-center">
                  <p className="text-lg font-black text-secondary">New Masterpiece</p>
                  <p className="text-sm font-bold text-slate-400">Write something fresh</p>
               </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
