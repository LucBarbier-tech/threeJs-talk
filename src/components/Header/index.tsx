import "./Header.css";

export const Header = () => {
  return (
    <>
      <nav className="navbar">
        <div className="navbar-left">
          <a href="/" className="logo">
            ThreeJs Talk
          </a>
        </div>
        <div className="navbar-center">
          <ul className="nav-links">
            <li>
              <a href="/benchmark">Benchmark</a>
            </li>
            <li>
              <a href="/fiber">ReactFiber</a>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};
