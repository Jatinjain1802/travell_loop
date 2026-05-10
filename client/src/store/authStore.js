import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { authApi } from '@/api/authApi';

export const useAuthStore = create()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      loading: false,
      error: null,

      login: async (credentials) => {
        set({ loading: true, error: null });
        try {
          const response = await authApi.login(credentials);
          const { user } = response.data;
          set({ user, isAuthenticated: true, loading: false });
          return user;
        } catch (error) {
          const message = error.response?.data?.message || 'Login failed';
          set({ error: message, loading: false });
          throw error;
        }
      },

      register: async (userData) => {
        set({ loading: true, error: null });
        try {
          const response = await authApi.register(userData);
          const { user } = response.data;
          set({ user, isAuthenticated: true, loading: false });
          return user;
        } catch (error) {
          const message = error.response?.data?.message || 'Registration failed';
          set({ error: message, loading: false });
          throw error;
        }
      },

      logout: async () => {
        try {
          await authApi.logout();
        } finally {
          set({ user: null, isAuthenticated: false });
          localStorage.removeItem('traveloop-auth');
        }
      },

      checkAuth: async () => {
        set({ loading: true });
        try {
          const response = await authApi.getMe();
          set({ user: response.data.user, isAuthenticated: true, loading: false });
        } catch (error) {
          set({ user: null, isAuthenticated: false, loading: false });
        }
      },

      updateUser: (userData) => set((state) => ({
        user: { ...state.user, ...userData }
      })),
    }),
    {
      name: 'traveloop-auth',
      partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }),
    }
  )
);

