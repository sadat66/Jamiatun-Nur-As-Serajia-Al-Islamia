export default function Navbar() {
  return (
    <nav className="navbar" id="navbar">
      <div className="container">
        <div className="navbar-inner">
          <a href="#" className="nav-item home-btn active">
            🏠 প্রচ্ছদ
          </a>
          <a href="#" className="nav-item has-dropdown">
            প্রাতিষ্ঠানিক পরিচিতি
          </a>
          <a href="#" className="nav-item">সফরসূচি</a>
          <a href="#" className="nav-item has-dropdown">সফরসূচি</a>
          <a href="#" className="nav-item has-dropdown">প্রকাশনা পরিচিতি</a>
          <a href="#" className="nav-item">যোগাযোগ</a>
        </div>
      </div>
    </nav>
  );
}
