import { create } from 'zustand';
import { tripApi } from '@/api/tripApi';

export const useTripStore = create((set, get) => ({
  trips: [],
  loading: false,
  error: null,
  currentTrip: null,
  itinerary: [],

  fetchTrips: async (status) => {
    set({ loading: true, error: null });
    try {
      const response = await tripApi.getTrips(status);
      set({ trips: response.data.trips, loading: false });
    } catch (error) {
      set({ error: 'Failed to fetch trips', loading: false });
    }
  },

  fetchTrip: async (id) => {
    set({ loading: true, error: null });
    try {
      const response = await tripApi.getTrip(id);
      set({ currentTrip: response.data.trip, loading: false });
      return response.data.trip;
    } catch (error) {
      set({ error: 'Failed to fetch trip details', loading: false });
      throw error;
    }
  },

  addTrip: async (tripData) => {
    set({ loading: true, error: null });
    try {
      const response = await tripApi.createTrip(tripData);
      set((state) => ({ 
        trips: [response.data.trip, ...state.trips],
        loading: false 
      }));
      return response.data.trip;
    } catch (error) {
      set({ error: 'Failed to create trip', loading: false });
      throw error;
    }
  },

  updateTrip: async (id, data) => {
    set({ loading: true, error: null });
    try {
      const response = await tripApi.updateTrip(id, data);
      set((state) => ({
        trips: state.trips.map(t => t.id === id ? response.data.trip : t),
        currentTrip: state.currentTrip?.id === id ? response.data.trip : state.currentTrip,
        loading: false
      }));
    } catch (error) {
      set({ error: 'Failed to update trip', loading: false });
      throw error;
    }
  },

  deleteTrip: async (id) => {
    set({ loading: true, error: null });
    try {
      await tripApi.deleteTrip(id);
      set((state) => ({
        trips: state.trips.filter(t => t.id !== id),
        loading: false
      }));
    } catch (error) {
      set({ error: 'Failed to delete trip', loading: false });
      throw error;
    }
  },

  fetchItinerary: async (id) => {
    set({ loading: true, error: null });
    try {
      const response = await tripApi.getItinerary(id);
      set({ itinerary: response.data.itinerary, loading: false });
    } catch (error) {
      set({ error: 'Failed to fetch itinerary', loading: false });
    }
  },

  setCurrentTrip: (trip) => set({ currentTrip: trip }),
}));

