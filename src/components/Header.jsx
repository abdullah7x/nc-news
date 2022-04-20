import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <Link to="/">
        <h1 className="NC-news">NC News</h1>
      </Link>
      <h2 className="greeting">Hello guest_user!</h2>
    </header>
  );
};

export default Header;
