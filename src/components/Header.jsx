import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-gray-900 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          My Blog
        </Link>
        <nav>
          <Link to="/" className="mr-4">
            Home
          </Link>
          <Link to="/write" className="mr-4">
            Write
          </Link>
          <Link to="/login">Login</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
