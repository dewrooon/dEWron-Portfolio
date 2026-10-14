import { createBrowserRouter } from 'react-router-dom'
import SiteLayout from '../layouts/SiteLayout/SiteLayout'
import Home from '../pages/Home/Home'
import NotFound from '../pages/NotFound/NotFound'

export const router = createBrowserRouter([
  {
    path: '/admin',
    lazy: async () => {
      const { default: Admin } = await import('../pages/Admin/Admin')
      return { Component: Admin }
    },
  },
  {
    element: <SiteLayout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '*', element: <NotFound /> },
    ],
  },
])
