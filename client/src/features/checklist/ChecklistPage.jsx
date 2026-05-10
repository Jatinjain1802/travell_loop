import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  CheckSquare, Square, Plus, Trash2, ChevronLeft, 
  Filter, Package, Briefcase, Camera, HeartPulse 
} from 'lucide-react';

export default function ChecklistPage() {
  const { id } = useParams();
  const [items, setItems] = useState([
    { id: 1, text: 'Passport and Visa', category: 'Documents', checked: true },
    { id: 2, text: 'Travel Insurance', category: 'Documents', checked: false },
    { id: 3, text: 'Hiking Boots', category: 'Clothing', checked: true },
    { id: 4, text: 'Power Bank', category: 'Electronics', checked: false },
    { id: 5, text: 'Sunscreen', category: 'Essentials', checked: false },
  ]);

  const [newItem, setNewItem] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const toggleItem = (itemId) => {
    setItems(items.map(item => 
      item.id === itemId ? { ...item, checked: !item.checked } : item
    ));
  };

  const addItem = (e) => {
    e.preventDefault();
    if (!newItem.trim()) return;
    setItems([...items, { 
      id: Date.now(), 
      text: newItem, 
      category: 'Essentials', 
      checked: false 
    }]);
    setNewItem('');
  };

  const deleteItem = (itemId) => {
    setItems(items.filter(item => item.id !== itemId));
  };

  const progress = Math.round((items.filter(i => i.checked).length / items.length) * 100);

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <Link to={`/trips/${id}`} className="flex items-center gap-1 text-sm font-medium text-primary hover:underline">
            <ChevronLeft className="h-4 w-4" />
            Back to Itinerary
          </Link>
          <h1 className="text-3xl font-bold tracking-tight">Packing Checklist</h1>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-primary">{progress}%</p>
          <p className="text-xs text-muted-foreground uppercase font-bold tracking-widest">Progress</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-3 bg-muted rounded-full overflow-hidden shadow-inner">
        <div 
          className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-700 ease-out shadow-[0_0_15px_rgba(59,130,246,0.5)]"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="grid md:grid-cols-4 gap-8">
        {/* Categories Sidebar */}
        <aside className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Categories</label>
            <nav className="space-y-1">
              {[
                { name: 'All', icon: Filter },
                { name: 'Documents', icon: Briefcase },
                { name: 'Clothing', icon: Package },
                { name: 'Electronics', icon: Camera },
                { name: 'Essentials', icon: HeartPulse },
              ].map((cat) => (
                <button
                  key={cat.name}
                  onClick={() => setSelectedCategory(cat.name)}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    selectedCategory === cat.name 
                      ? 'bg-primary text-white shadow-lg shadow-primary/20 scale-105' 
                      : 'hover:bg-muted text-muted-foreground'
                  }`}
                >
                  <cat.icon className="h-4 w-4" />
                  {cat.name}
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* Checklist Content */}
        <div className="md:col-span-3 space-y-6">
          {/* Add Item Form */}
          <form onSubmit={addItem} className="flex gap-2 p-2 bg-card border rounded-2xl shadow-sm focus-within:ring-2 focus-within:ring-primary/20 transition-all">
            <input 
              type="text" 
              placeholder="Add a new item to pack..." 
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              className="flex-1 bg-transparent border-none focus:ring-0 px-4 text-sm"
            />
            <button 
              type="submit"
              className="bg-primary text-white p-2.5 rounded-xl hover:bg-primary/90 transition-colors shadow-md"
            >
              <Plus className="h-5 w-5" />
            </button>
          </form>

          {/* Items List */}
          <div className="space-y-3">
            {items
              .filter(i => selectedCategory === 'All' || i.category === selectedCategory)
              .map((item) => (
                <div 
                  key={item.id}
                  className={`group flex items-center justify-between p-4 rounded-2xl border bg-card transition-all hover:shadow-md ${
                    item.checked ? 'bg-muted/30 border-muted opacity-80' : 'hover:border-primary/50'
                  }`}
                >
                  <div className="flex items-center gap-4 cursor-pointer" onClick={() => toggleItem(item.id)}>
                    <div className={`transition-transform duration-200 ${item.checked ? 'scale-110' : 'group-hover:scale-110'}`}>
                      {item.checked ? (
                        <CheckSquare className="h-6 w-6 text-primary fill-primary/10" />
                      ) : (
                        <Square className="h-6 w-6 text-muted-foreground" />
                      )}
                    </div>
                    <div>
                      <p className={`font-medium transition-all ${item.checked ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                        {item.text}
                      </p>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">{item.category}</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => deleteItem(item.id)}
                    className="p-2 text-destructive opacity-0 group-hover:opacity-100 hover:bg-destructive/10 rounded-lg transition-all"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            
            {items.length === 0 && (
              <div className="py-20 text-center border-2 border-dashed rounded-3xl space-y-4">
                <CheckSquare className="h-12 w-12 text-muted-foreground mx-auto" />
                <p className="text-muted-foreground">No items in this category.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
