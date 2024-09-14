import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import '../styles/menu.css'

const queryClient = new QueryClient();

export const Route = createRootRoute({
  component: () => (
    <>
     <QueryClientProvider client={queryClient}>
        <div className='menu'>
          <Link to="/" className="[&.active]:active">
            Home
          </Link>{' '}
          <Link to="/about" className="[&.active]:active">
            About
          </Link>
          <hr />
        </div>
        <Outlet />
        <TanStackRouterDevtools />
     </QueryClientProvider>
    </>
  ),
})