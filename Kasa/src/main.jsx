import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'
import Index from './Index.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router'
import Propos from './Propos.jsx'
import Error from './Error.jsx'
import Logement from './Logement.jsx'

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