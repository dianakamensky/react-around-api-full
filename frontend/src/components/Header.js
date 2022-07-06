import { Link } from 'react-router-dom';

function Header(props) {
  return (
    <header className="header">
      <img className="header__title" src={props.img} alt={props.alt} />

      <p className="header__nav">
        {props.loggedIn && (
          <span className="header__email">{props.loggedIn}</span>
        )}
        <Link
          to={props.navLink}
          className={`header__nav-text ${
            props.loggedIn && 'header__nav-text_main'
          }`}
          onClick={() => localStorage.removeItem('jwt')}
        >
          {props.navText}
        </Link>
      </p>
    </header>
  );
}

export default Header;
