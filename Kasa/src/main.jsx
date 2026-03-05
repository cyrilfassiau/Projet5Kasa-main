import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'
import Index from './pages/Index.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router'
import Propos from './pages/Propos.jsx'
import Error from './pages/Error.jsx'
import Logement from './pages/Logement.jsx'

const router = createBrowserRouter([
  { path: "/", element: <Index /> },
  { path: "/apropos", element: <Propos /> },
  { path: "/logement/:id", element: <Logement /> },
  { path: "*", element: <Error /> },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);