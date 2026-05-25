import { Suspense } from 'react';
import { useRoutes } from 'react-router-dom';
import { routes } from './routes/routes.jsx';
import ErrorBoundary from './components/common/ErrorBoundary.jsx';
import PageLoader from './components/common/PageLoader.jsx';

export default function App() {
  const element = useRoutes(routes);
  return (
    <ErrorBoundary>
      <Suspense fallback={<PageLoader />}>{element}</Suspense>
    </ErrorBoundary>
  );
}
