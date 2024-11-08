import "./Header.css";

export const Header = () => {
  return (
    <>
      <nav className="navbar">
        <div className="navbar-left">
          <a href="/" className="logo">
            R3F Talk
          </a>
        </div>
        <div className="navbar-center">
          <ul className="nav-links">
            <li>
              <a href="/benchmark">Benchmark</a>
            </li>
            <li>
              <a href="/simple-scene">SimpleScene</a>
            </li>
            <li>
              <a href="/fiber">FullDemo</a>
            </li>
            <li>
              <a href="/thanks">Thanks</a>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};
