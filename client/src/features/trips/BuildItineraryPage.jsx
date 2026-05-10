import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Plus, Search, Clock, Calendar, MapPin, Save, ChevronRight, Info } from 'lucide-react';
import { useTripStore } from '@/store/tripStore';

const mockActivities = [
  { id: 1, name: 'Eiffel Tower Visit', category: 'Sightseeing', duration: '2h', location: 'Paris' },
  { id: 2, name: 'Louvre Museum', category: 'Culture', duration: '3h', location: 'Paris' },
  { id: 3, name: 'Seine River Cruise', category: 'Leisure', duration: '1h', location: 'Paris' },
  { id: 4, name: 'Montmartre Walk', category: 'Nature', duration: '2h', location: 'Paris' },
];

export default function BuildItineraryPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { trips } = useTripStore();
  const trip = trips.find(t => t.id === id);

  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [itinerary, setItinerary] = useState([]);

  const handleAddActivity = (activity) => {
    if (!selectedDate || !selectedTime) {
      alert('Please select date and time first');
      return;
    }
    setItinerary([...itinerary, { ...activity, date: selectedDate, time: selectedTime }]);
    setSearchQuery('');
  };

  const handleSave = () => {
    console.log('Saving itinerary:', itinerary);
    navigate(`/trips/${id}`);
  };

  if (!trip) return <div className="p-10 text-center">Trip not found</div>;

  return (
    <div className="max-w-6xl mx-auto space-y-8 py-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
            <Link to="/trips" className="hover:text-primary">Trips</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="font-medium text-foreground">{trip.title}</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Build Your Itinerary</h1>
        </div>
        <button 
          onClick={handleSave}
          className="bg-primary text-white px-8 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
        >
          <Save className="h-5 w-5" />
          Complete Itinerary
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Step 1 & 2: Time & Date Selection */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-card border rounded-3xl p-6 shadow-sm space-y-6">
            <h3 className="font-bold flex items-center gap-2">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-white text-[10px]">1</span>
              Set Time & Date
            </h3>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Select Date</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <input 
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full h-11 pl-10 pr-4 rounded-xl border bg-background outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Select Time</label>
                <div className="relative">
                  <Clock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <input 
                    type="time"
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    className="w-full h-11 pl-10 pr-4 rounded-xl border bg-background outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 flex gap-3 text-blue-800 text-sm">
            <Info className="h-5 w-5 shrink-0" />
            <p>Select a date and time from your trip range, then find an activity to add it to your schedule.</p>
          </div>
        </div>

        {/* Step 3: Activity Search & Selection */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-card border rounded-3xl p-6 shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="font-bold flex items-center gap-2">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-white text-[10px]">2</span>
                Find Activities
              </h3>
              <div className="relative w-64">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <input 
                  type="text" 
                  placeholder="Search..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-9 pl-9 pr-4 rounded-lg border bg-background text-sm outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {mockActivities.filter(a => a.name.toLowerCase().includes(searchQuery.toLowerCase())).map(activity => (
                <div key={activity.id} className="border rounded-2xl p-4 hover:border-primary hover:bg-primary/5 transition-all group">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-2 py-0.5 rounded">
                      {activity.category}
                    </span>
                    <button 
                      onClick={() => handleAddActivity(activity)}
                      className="p-1.5 bg-primary text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  <h4 className="font-bold text-foreground">{activity.name}</h4>
                  <div className="flex items-center gap-3 mt-3 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {activity.duration}
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {activity.location}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Current Itinerary Preview */}
          <div className="space-y-4">
            <h3 className="font-bold text-lg">Itinerary Draft</h3>
            {itinerary.length === 0 ? (
              <div className="h-32 border-2 border-dashed rounded-3xl flex items-center justify-center text-muted-foreground text-sm">
                No activities added yet
              </div>
            ) : (
              <div className="space-y-3">
                {itinerary.map((item, idx) => (
                  <div key={idx} className="bg-card border rounded-2xl p-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="bg-primary/10 text-primary p-3 rounded-xl">
                        <Calendar className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-bold">{item.name}</h4>
                        <p className="text-xs text-muted-foreground">{item.date} at {item.time}</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => setItinerary(itinerary.filter((_, i) => i !== idx))}
                      className="text-destructive hover:bg-destructive/10 p-2 rounded-lg transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

import { Link } from 'react-router-dom';
import { Trash2 } from 'lucide-react';
