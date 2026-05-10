import api from './axios';

export const tripApi = {
  getTrips: (status) => api.get('/trips', { params: { status } }),
  getTrip: (id) => api.get(`/trips/${id}`),
  createTrip: (tripData) => api.post('/trips', tripData),
  updateTrip: (id, tripData) => api.put(`/trips/${id}`, tripData),
  deleteTrip: (id) => api.delete(`/trips/${id}`),
  getItinerary: (id) => api.get(`/trips/${id}/itinerary`),
  updateItinerary: (id, itineraryData) => api.put(`/trips/${id}/itinerary`, itineraryData),
};
