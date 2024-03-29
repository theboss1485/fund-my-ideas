import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import 'bootstrap/dist/css/bootstrap.css';



import App from './App.jsx';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import SingleProjectWithComments from './pages/SingleProjectWithComments';
import MyProjects from './pages/MyProjects.jsx';
import PaymentSuccess from './pages/PaymentSuccess.jsx'
import PaymentFailure from './pages/PaymentFailure.jsx'
import ErrorPage from './pages/ErrorPage';

import {store, persistor} from '../store/index.js'

// Here, we set up a react router so that the application can use routes with react.
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
            },{
                path: '/me',
                element: <MyProjects/>
            }, {
                path: '/projects/:projectId',
                element: <SingleProjectWithComments/>
            }, {
                path: '/paymentSuccess',
                element: <PaymentSuccess/>
            }, {
                path: '/paymentFailure',
                element: <PaymentFailure/>
            }
        ]
    },
]);

/* We wrap everything in a Provider and PersistGate so that the entire application
has access to a store that persists across page refreshes.*/
ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}> 
        <PersistGate loading={null} persistor={persistor}>
            <RouterProvider router={router}>
                <App/>
            </RouterProvider>
        </PersistGate>
    </Provider>
)
