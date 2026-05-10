import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  BookOpen, Plus, Trash2, ChevronLeft, Image as ImageIcon, 
  Search, MoreVertical, Calendar, MapPin, Tag, Heart
} from 'lucide-react';

export default function NotesPage() {
  const { id } = useParams();
  const [notes, setNotes] = useState([
    { 
      id: 1, 
      title: 'First Day in Paris', 
      content: 'The Eiffel Tower was breathtaking at sunset. We had some amazing croissants near the Seine.', 
      date: '2024-06-15', 
      location: 'Trocadéro, Paris',
      image: 'https://images.unsplash.com/photo-1543349689-9a4d426bee8e?q=80&w=2001',
      liked: true 
    },
    { 
      id: 2, 
      title: 'The Louvre Experience', 
      content: 'Spent the whole morning at the Louvre. Mona Lisa is smaller than I thought but the museum architecture is incredible.', 
      date: '2024-06-16', 
      location: 'Louvre Museum',
      image: 'https://images.unsplash.com/photo-1499856126354-5392d431f008?q=80&w=2070',
      liked: false 
    }
  ]);

  const [isAdding, setIsAdding] = useState(false);

  return (
    <div className="max-w-5xl mx-auto space-y-8 py-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <Link to={`/trips/${id}`} className="flex items-center gap-1 text-sm font-medium text-primary hover:underline">
            <ChevronLeft className="h-4 w-4" />
            Back to Itinerary
          </Link>
          <h1 className="text-3xl font-bold tracking-tight">Trip Journal & Notes</h1>
        </div>
        <button 
          onClick={() => setIsAdding(true)}
          className="bg-primary text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:scale-105 transition-all shadow-lg shadow-primary/20"
        >
          <Plus className="h-5 w-5" />
          Add Entry
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Search & Tags Sidebar */}
        <div className="space-y-6">
          <div className="bg-card border rounded-3xl p-6 shadow-sm space-y-6">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Search notes..." 
                className="w-full h-10 pl-10 pr-4 rounded-xl border bg-background text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </div>
            
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Quick Filters</label>
              <div className="flex flex-wrap gap-2">
                {['All', 'Favorites', 'Recent', 'With Photos'].map(tag => (
                  <button key={tag} className="px-3 py-1.5 rounded-lg border text-xs font-medium hover:bg-muted transition-colors">
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-indigo-600 to-primary rounded-3xl p-6 text-white space-y-4 shadow-xl">
            <BookOpen className="h-8 w-8 text-white/50" />
            <h3 className="font-bold text-lg leading-tight">Preserve your travel memories forever</h3>
            <p className="text-sm text-white/70">Capture thoughts, feelings, and the little details that make every trip unique.</p>
          </div>
        </div>

        {/* Notes Grid */}
        <div className="md:col-span-2 space-y-6">
          {notes.map((note) => (
            <div key={note.id} className="group bg-card border rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-300">
              <div className="grid md:grid-cols-5 h-full">
                <div className="md:col-span-2 relative overflow-hidden h-48 md:h-full">
                  <img src={note.image} alt={note.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute top-4 left-4">
                    <button className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/40 transition-colors">
                      <Heart className={`h-4 w-4 ${note.liked ? 'fill-red-500 text-red-500' : ''}`} />
                    </button>
                  </div>
                </div>
                <div className="md:col-span-3 p-6 flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-primary">
                        <Calendar className="h-3 w-3" />
                        {note.date}
                      </div>
                      <button className="p-1 hover:bg-muted rounded-lg transition-colors">
                        <MoreVertical className="h-4 w-4 text-muted-foreground" />
                      </button>
                    </div>
                    <h3 className="text-xl font-bold group-hover:text-primary transition-colors">{note.title}</h3>
                    <p className="text-muted-foreground text-sm line-clamp-3 leading-relaxed">
                      {note.content}
                    </p>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-dashed">
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <MapPin className="h-3.5 w-3.5" />
                      {note.location}
                    </div>
                    <button className="text-primary font-bold text-xs hover:underline flex items-center gap-1">
                      Read full entry
                      <ChevronLeft className="h-3 w-3 rotate-180" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {notes.length === 0 && (
            <div className="py-32 text-center border-2 border-dashed rounded-[40px] space-y-4">
              <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-10 w-10 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-bold">Your journal is empty</h3>
              <p className="text-muted-foreground">Start writing your first entry to capture the magic.</p>
              <button className="bg-primary text-white px-6 py-2.5 rounded-xl font-bold mt-4 shadow-lg shadow-primary/20">
                Write a Note
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
