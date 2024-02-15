import { Link, useLocation } from 'react-router-dom';

import Auth from '../utils/auth'

// This component contains the navigation bar at the top of the application.
const NavTabs = () => {
    const currentPage = useLocation().pathname;

    const logout = (event) => {
        event.preventDefault();
        Auth.logout();
      };

    return (
        <>
            <div className=" custom-header">
                <div>
                    <Link className="custom-header-color" to="/">
                        <h1 className="custom-header-title">Fund My Idea$</h1>
                    </Link>
                    <p className="custom-header-description-color">~ A Place With Endless Possibilities! ~</p>
                </div>
            </div>
            <ul className="nav custom-nav-tabs nav-ul">
                <li className="nav-item">
                    <Link
                        to="/"
                        // This is a conditional (ternary) operator that checks to see if the current page is "Home"
                        // If it is, we set the current page to 'nav-link-active', otherwise we set it to 'nav-link'
                        className={currentPage === '/' ? ' nav-link custom-nav-link-active' : 'nav-link custom-inactive-home-tabs'}
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
                                className={currentPage === '/me' ? 'nav-link custom-nav-link-active' : 'nav-link custom-inactive-login-tabs'}
                            >
                                {Auth.getProfile().data.username}'s Projects
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                to="/login" onClick={logout}

                                // Check to see if the currentPage is `Blog`, and if so we use the active link class from bootstrap. Otherwise, we set it to a normal nav-link
                                className={currentPage === '/login' ? 'nav-link custom-nav-link-active' : 'nav-link custom-inactive-logout-tabs'}
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
                            className={currentPage === '/login' ? 'nav-link custom-nav-link-active' : 'nav-link custom-inactive-login-tabs'}
                        >
                            Log In
                        </Link>
                        </li>
                        <li className="nav-item">
                        <Link
                            to="/signup"
                            // Check to see if the currentPage is `Blog`, and if so we use the active link class from bootstrap. Otherwise, we set it to a normal nav-link
                            className={currentPage === '/signup' ? 'nav-link custom-nav-link-active' : 'nav-link custom-login-button custom-inactive-signup-tabs'}
                        >
                            Sign Up
                        </Link>
                        </li>
                    </>
                )}
        </ul>
      </>
    )
}

export default NavTabs;