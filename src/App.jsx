import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Track from './components/Track';
import './App.css';
import NotFound from './components/NotFound';
import { UserContext } from './contexts/UserContext';
import { useState } from 'react';
import Private from './components/Private';
import Diet from './components/Diet';
import ForgotPassword from './components/Forgot-password';
import Otp from './components/Otp';
import Unregister from './components/Un-register';


function App() {
  const [loggedUser, setLoggedUser] = useState(
    JSON.parse(localStorage.getItem('nutrify-user'))
  );

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Login />,
      errorElement: <NotFound />,
    },
    {
      path: '/register',
      element: <Register />,
    },
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '/track',
      element: <Private Component={Track} />,
    },
    {
      path: '/diet',
      element: <Private Component={Diet} />,
    },
    {
      path: '/forgot-password',
      element: <ForgotPassword />,
    },
    {
      path: '/otp',
      element: <Otp />,
    },
    {
      path: '/un-register',
      element: <Unregister />,
    },
   
    {
      path: '*',
      element: <NotFound />,
    },
  ], {
    future: {
      v7_relativeSplatPath: true,
      v7_startTransition: true, // ✅ This resolves the warning you're seeing
    },
  });

  return (
    <UserContext.Provider value={{ loggedUser, setLoggedUser }}>
      <RouterProvider router={router} />
    </UserContext.Provider>
  );
}

export default App;
