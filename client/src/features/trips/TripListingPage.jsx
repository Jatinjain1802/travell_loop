import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Calendar, MapPin, ChevronRight, Clock, MoreVertical, Search, Filter } from 'lucide-react';
import { useTripStore } from '@/store/tripStore';

export default function TripListingPage() {
  const { trips, loading, fetchTrips } = useTripStore();

  useEffect(() => {
    fetchTrips();
  }, [fetchTrips]);

  return (
    <div className="space-y-8 py-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">My Travels</h1>
          <p className="text-muted-foreground mt-1">Manage and view all your planned adventures</p>
        </div>
        <Link 
          to="/trips/create" 
          className="bg-primary text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:scale-105 transition-all shadow-lg shadow-primary/20"
        >
          <Plus className="h-5 w-5" />
          Plan New Trip
        </Link>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Search trips by destination or title..." 
            className="w-full h-12 pl-10 pr-4 rounded-2xl border bg-card focus:ring-2 focus:ring-primary/20 outline-none transition-all"
          />
        </div>
        <button className="flex items-center gap-2 px-6 h-12 border rounded-2xl bg-card hover:bg-muted transition-colors font-medium">
          <Filter className="h-5 w-5" />
          Filters
        </button>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-[300px] bg-muted animate-pulse rounded-3xl" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trips.length === 0 ? (
            <div className="col-span-full py-20 text-center space-y-4">
              <div className="bg-muted w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Calendar className="h-10 w-10 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-bold">No trips found</h3>
              <p className="text-muted-foreground">You haven't planned any adventures yet.</p>
              <Link to="/trips/create" className="text-primary font-bold hover:underline inline-block mt-4">
                Start your first trip now
              </Link>
            </div>
          ) : (
            trips.map((trip) => (
              <div key={trip.id} className="group bg-card border rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-300">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={trip.image || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=2070'} 
                    alt={trip.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-4 right-4 flex gap-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-md ${
                      trip.status === 'completed' ? 'bg-green-500/80 text-white' : 'bg-primary/80 text-white'
                    }`}>
                      {trip.status}
                    </span>
                    <button className="p-1.5 bg-black/20 hover:bg-black/40 rounded-full text-white backdrop-blur-md transition-colors">
                      <MoreVertical className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                
                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="text-xl font-bold group-hover:text-primary transition-colors line-clamp-1">{trip.title}</h3>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                      <MapPin className="h-3 w-3" />
                      {trip.place}
                    </div>
                  </div>

                  <div className="flex items-center justify-between py-4 border-y border-dashed">
                    <div className="space-y-1">
                      <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Duration</p>
                      <div className="flex items-center gap-1 text-sm font-medium">
                        <Clock className="h-3.5 w-3.5" />
                        10 Days
                      </div>
                    </div>
                    <div className="space-y-1 text-right">
                      <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Budget</p>
                      <p className="text-sm font-bold text-foreground">${trip.totalBudget || '0'}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <div className="flex -space-x-2">
                      {[1, 2].map(i => (
                        <div key={i} className="h-8 w-8 rounded-full border-2 border-card bg-muted flex items-center justify-center overflow-hidden">
                          <img src={`https://i.pravatar.cc/100?u=${trip.id}${i}`} alt="user" />
                        </div>
                      ))}
                      <div className="h-8 w-8 rounded-full border-2 border-card bg-muted flex items-center justify-center text-[10px] font-bold">
                        +3
                      </div>
                    </div>
                    <Link 
                      to={`/trips/${trip.id}`} 
                      className="inline-flex items-center gap-1 text-sm font-bold text-primary hover:gap-2 transition-all"
                    >
                      View Details
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
