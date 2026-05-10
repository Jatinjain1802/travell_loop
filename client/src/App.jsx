import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import LoginPage from '@/features/auth/LoginPage';
import RegisterPage from '@/features/auth/RegisterPage';
import LandingPage from '@/features/landing/LandingPage';
import TripListingPage from '@/features/trips/TripListingPage';
import CreateTripPage from '@/features/trips/CreateTripPage';
import BuildItineraryPage from '@/features/trips/BuildItineraryPage';
import ItineraryViewPage from '@/features/trips/ItineraryViewPage';
import SearchPage from '@/features/search/SearchPage';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Protected Routes (wrapped in MainLayout) */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<LandingPage />} />
          <Route path="trips" element={<TripListingPage />} />
          <Route path="trips/create" element={<CreateTripPage />} />
          <Route path="trips/:id" element={<ItineraryViewPage />} />
          <Route path="trips/:id/build" element={<BuildItineraryPage />} />
          <Route path="search" element={<SearchPage />} />
          {/* Add more routes here as we build them */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
