import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';

import App from './App.jsx';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import SingleProject from './pages/SingleProject';
import Profile from './pages/Profile';
import MyProfile from './pages/MyProfile';
import ErrorPage from './pages/ErrorPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    errorElement: <ErrorPage/>,
    children: [
      {
        index: true,
        element: <Home/>
      }, 
      {
        path: '/login',
        element: <Login/>
      }, 
      {
        path: '/signup',
        element: <Signup/>
      }, {
        path: '/profiles/:username',
        element: <Profile/>
      }, {
        path: '/me',
        element: <MyProfile/>
      }, {
        path: '/projects/:projectId',
        element: <SingleProject/>
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
