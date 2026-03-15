import { verifyToken } from "@/lib/auth";

export default async function Navbar() {
  const session = await verifyToken();

  return (
    <nav className="navbar" id="navbar">
      <div className="container">
        <div className="navbar-inner">
          {session ? (
            <a href="/admin/dashboard" className="nav-item home-btn active">
              🏠 ড্যাশবোর্ড
            </a>
          ) : (
            <a href="/admin/login" className="nav-item home-btn active">
              🏠 লগইন
            </a>
          )}
          <a href="/porichiti" className="nav-item">
            প্রাতিষ্ঠানিক পরিচিতি
          </a>
          <a href="/jogajog" className="nav-item">যোগাযোগ</a>
        </div>
      </div>
    </nav>
  );
}
