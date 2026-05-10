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
import ProfilePage from '@/features/profile/ProfilePage';
import CommunityPage from '@/features/community/CommunityPage';
import AdminPage from '@/features/admin/AdminPage';
import ChecklistPage from '@/features/checklist/ChecklistPage';
import NotesPage from '@/features/notes/NotesPage';
import InvoicePage from '@/features/invoice/InvoicePage';

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
          <Route path="trips/:id/checklist" element={<ChecklistPage />} />
          <Route path="trips/:id/notes" element={<NotesPage />} />
          <Route path="trips/:id/invoice" element={<InvoicePage />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="community" element={<CommunityPage />} />
          <Route path="admin" element={<AdminPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
