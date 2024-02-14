import { Link } from 'react-router-dom';


// This is the header component.  It contains the title and a tagline about the application.
const Header = () => {

    
  return (
    <header className="bg-primary text-light mb-4 py-3 flex-row align-center">
      <div className="container flex-row justify-space-between-lg justify-center align-center">
        <div>
          <Link className="text-light" to="/">
            <h1 className="m-0">Fund My Idea$</h1>
          </Link>
          <p className="m-0">A Placed With Endless Possibilities!.</p>
        </div>
      
      </div>
    </header>
  );
};

export default Header;