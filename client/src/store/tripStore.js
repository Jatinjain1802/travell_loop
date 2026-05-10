import { create } from 'zustand';

export const useTripStore = create((set, get) => ({
  trips: [],
  loading: false,
  currentTrip: null,

  // Mock fetching trips
  fetchTrips: async () => {
    set({ loading: true });
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Initial mock data if empty
    if (get().trips.length === 0) {
      set({
        trips: [
          {
            id: '1',
            title: 'Summer in Swiss Alps',
            place: 'Switzerland',
            startDate: '2024-06-15',
            endDate: '2024-06-25',
            status: 'completed',
            totalBudget: 3500,
            image: 'https://images.unsplash.com/photo-1531310197839-ccf54634509e?q=80&w=1965',
            sections: []
          }
        ]
      });
    }
    set({ loading: false });
  },

  addTrip: (trip) => set((state) => ({ 
    trips: [
      ...state.trips, 
      { 
        ...trip, 
        id: Math.random().toString(36).substr(2, 9),
        status: 'upcoming' 
      }
    ] 
  })),

  updateTrip: (id, data) => set((state) => ({
    trips: state.trips.map(t => t.id === id ? { ...t, ...data } : t)
  })),

  deleteTrip: (id) => set((state) => ({
    trips: state.trips.filter(t => t.id !== id)
  })),

  setCurrentTrip: (trip) => set({ currentTrip: trip }),
}));
