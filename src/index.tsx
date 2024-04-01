import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { App } from './components/App';
import { createRoot } from 'react-dom/client'
import { Statistic } from './pages/Statistic/Statistic';


const root = document.getElementById('root');

if (!root) {
  throw new Error('root not found')
}

const container = createRoot(root);

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: '/statistic',
        element: <Statistic />
      }
    ]
  },

]);

container.render(
  <RouterProvider router={router} />
)


