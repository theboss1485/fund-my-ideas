import { Link, useLocation } from 'react-router-dom';

function NavTabs() {
    const currentPage = useLocation().pathname;

    return (
        // testing codes, subjecting to change
      <ul className="nav nav-tabs custom-nav-tabs">
        <li className="nav-item">
          <Link
            to="/"
            // This is a conditional (ternary) operator that checks to see if the current page is "Home"
            // If it is, we set the current page to 'nav-link-active', otherwise we set it to 'nav-link'
            className={currentPage === '/' ? 'nav-link active' : 'nav-link'}
          >
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to="/me"
            // Check to see if the currentPage is `About`, and if so we use the active link class from bootstrap. Otherwise, we set it to a normal nav-link
            className={currentPage === '/me' ? 'nav-link active' : 'nav-link'}
          >
            My Profile
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to="/login"
            // Check to see if the currentPage is `Blog`, and if so we use the active link class from bootstrap. Otherwise, we set it to a normal nav-link
            className={currentPage === '/login' ? 'nav-link active' : 'nav-link custom-login-button'}
          >
            Log In
          </Link>
        </li>
      </ul>
    )
}

export default NavTabs;