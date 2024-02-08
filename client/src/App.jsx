import { Outlet } from 'react-router-dom';
import Nav from './components/NavTabs';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


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