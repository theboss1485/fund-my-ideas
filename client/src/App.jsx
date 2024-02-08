import { Outlet } from 'react-router-dom';
import Nav from './components/NavTabs';
import './App.css';
import Button from 'react-bootstrap/Button';

function App() {
    return (
        <>
            <Nav/>
            <main className="">
                <Outlet/>
            </main>
        </>
    )
}

export default App;