import { Link, useLocation } from 'react-router-dom';

import Auth from '../utils/auth'

function NavTabs() {
    const currentPage = useLocation().pathname;

    const logout = (event) => {
        event.preventDefault();
        Auth.logout();
      };

    return (
        // testing codes, subjecting to change
      <ul className="nav nav-tabs custom-nav-tabs bg-info text-white">
        <div className="container flex-row justify-space-between-lg p-3">
        <div>
          <Link className="text-light" to="/">
            <h1 className="m-0">Fund My Idea$</h1>
          </Link>
          <p className="m-0">A Placed With Endless Possibilities!.</p>
        </div>
      
      </div>
        <li className="nav-item">
          <Link
            to="/"
            // This is a conditional (ternary) operator that checks to see if the current page is "Home"
            // If it is, we set the current page to 'nav-link-active', otherwise we set it to 'nav-link'
            className={currentPage === '/' ? 'nav-link active' : 'nav-link custom-inactive-tabs'}
          >
            Home
          </Link>
        </li >
        {Auth.loggedIn() ? (
            <>
                <li className="nav-item">
                <Link
                    to="/me"
                    // Check to see if the currentPage is `About`, and if so we use the active link class from bootstrap. Otherwise, we set it to a normal nav-link
                    className={currentPage === '/me' ? 'nav-link active' : 'nav-link custom-inactive-login-tabs'}
                >
                    {Auth.getProfile().data.username}'s profile
                </Link>
                </li>
                <li className="nav-item">
                <Link
                    to="/login" onClick={logout}
                    // Check to see if the currentPage is `Blog`, and if so we use the active link class from bootstrap. Otherwise, we set it to a normal nav-link
                    className={currentPage === '/login' ? 'nav-link active' : 'nav-link custom-login-button custom-inactive-logout-tabs'}
                >
                    Log Out
                </Link>
                </li>
            </>
        ) : (
            <>
                <li className=" nav-item">
                <Link
                    to="/login"
                    // Check to see if the currentPage is `About`, and if so we use the active link class from bootstrap. Otherwise, we set it to a normal nav-link
                    className={currentPage === '/login' ? 'nav-link active' : 'nav-link custom-inactive-login-tabs'}
                >
                    Log In
                </Link>
                </li>
                <li className="nav-item">
                <Link
                    to="/signup"
                    // Check to see if the currentPage is `Blog`, and if so we use the active link class from bootstrap. Otherwise, we set it to a normal nav-link
                    className={currentPage === '/signup' ? 'nav-link active' : 'nav-link custom-login-button custom-inactive-signup-tabs'}
                >
                    Sign Up
                </Link>
                </li>
            </>
        )}
      </ul>
    )
}

export default NavTabs;