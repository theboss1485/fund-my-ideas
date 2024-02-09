import { Outlet } from 'react-router-dom';
import Nav from './components/NavTabs';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Footer from './components/Footer';


function App() {
    return (
        <>
        <div className="custom-main">
            <Nav/>
            <main className="">
                <Outlet/>
            </main>
            <Footer/>
        </div>
        </>
    )
}

export default App;