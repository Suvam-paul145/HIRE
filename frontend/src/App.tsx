import { Routes, Route } from 'react-router-dom';
import FeedPage from './pages/FeedPage';
import ApplicationPreviewPage from './pages/ApplicationPreviewPage';
import OnboardingPage from './pages/OnboardingPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<FeedPage />} />
      <Route path="/onboarding" element={<OnboardingPage />} />
      <Route path="/applications/:id" element={<ApplicationPreviewPage />} />
    </Routes>
  );
}

export default App;



