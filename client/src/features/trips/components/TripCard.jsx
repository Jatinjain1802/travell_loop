import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Calendar, Clock, MoreHorizontal, ChevronRight, Users } from 'lucide-react';
import { Card, Button, cn } from '@/components/common/UI';

export default function TripCard({ trip }) {
  return (
    <Card padding="none" className="group overflow-hidden border-none hover:shadow-2xl transition-all duration-500 animate-in fade-in zoom-in-95">
      <Link to={`/trips/${trip.id}`} className="block">
        {/* Image Section */}
        <div className="relative h-72 overflow-hidden">
          <img 
            src={trip.image || `https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070`} 
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
            alt={trip.title}
          />
          <div className="absolute inset-0 bg-linear-to-t from-secondary/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <div className="absolute top-6 left-6 bg-white/95 backdrop-blur-md px-4 py-2 rounded-xl flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-secondary shadow-xl">
            <Clock className="h-3.5 w-3.5 text-primary" />
            {trip.status === 'active' ? 'Ongoing' : 'Upcoming'}
          </div>
        </div>

        {/* Content Section */}
        <div className="p-10 space-y-8 text-left">
          <div className="space-y-4">
            <div className="flex justify-between items-start">
              <h3 className="text-3xl font-black text-secondary group-hover:text-primary transition-colors leading-tight">
                {trip.title}
              </h3>
              <button className="p-2 text-slate-300 hover:text-secondary hover:bg-slate-50 rounded-lg transition-all">
                <MoreHorizontal className="h-6 w-6" />
              </button>
            </div>
            
            <div className="flex flex-wrap items-center gap-6 text-sm font-bold text-slate-400">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                {trip.place}
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-primary" />
                {trip.dates || 'Plan Pending'}
              </div>
            </div>
          </div>

          {/* Footer Section */}
          <div className="pt-8 border-t border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex -space-x-3">
                {[1, 2, 3].map(i => (
                  <img 
                    key={i} 
                    src={`https://i.pravatar.cc/100?u=${trip.id + i}`} 
                    className="h-10 w-10 rounded-xl border-4 border-white shadow-lg object-cover" 
                    alt="traveler" 
                  />
                ))}
              </div>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">+2 others</span>
            </div>
            
            <div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-primary group-hover:gap-3 transition-all">
              Manage
              <ChevronRight className="h-4 w-4" />
            </div>
          </div>
        </div>
      </Link>
    </Card>
  );
}
