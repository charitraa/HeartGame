import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import AppContext from './context/ContextApp.tsx';
import './index.css'
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 20,
      gcTime: 1000 * 60 * 5,
      retry: 3,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchOnMount: false,
      refetchInterval: 1000 * 90,
      refetchIntervalInBackground: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <AppContext>
          <App />
        </AppContext>
      </QueryClientProvider>
  </BrowserRouter>
)