import { Routes, Route } from 'react-router-dom';
import FeedPage from './pages/FeedPage';
import ApplicationPreviewPage from './pages/ApplicationPreviewPage';
import ApplicationHistoryPage from './pages/ApplicationHistoryPage';
import OnboardingPage from './pages/OnboardingPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<FeedPage />} />
      <Route path="/applications" element={<ApplicationHistoryPage />} />
      <Route path="/onboarding" element={<OnboardingPage />} />
      <Route path="/applications/:id" element={<ApplicationPreviewPage />} />
    </Routes>
  );
}

export default App;



