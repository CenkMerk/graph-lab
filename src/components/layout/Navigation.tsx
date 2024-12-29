import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export function Navigation() {
  const { user, signOut } = useAuth();

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <ul className="flex items-center gap-6">
            <li>
              <Link
                to={user ? "/app" : "/"}
                className="text-gray-700 hover:text-gray-900 font-medium"
              >
                Ana Sayfa
              </Link>
            </li>

            {user && (
              <>
                {/* <li>
                  <Link
                    to="/matrix-creator"
                    className="text-gray-700 hover:text-gray-900 font-medium"
                  >
                    Matris Oluşturucu
                  </Link>
                </li>
                <li>
                  <Link
                    to="/my-graphs"
                    className="text-gray-700 hover:text-gray-900 font-medium"
                  >
                    Graflarım
                  </Link>
                </li> */}
              </>
            )}
          </ul>
          <div className="flex items-center gap-4">
            {user ? (
              <>
                <span className="text-gray-700">{user.email}</span>
                <button
                  onClick={signOut}
                  className="text-sm text-red-600 hover:text-red-800"
                >
                  Çıkış Yap
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="text-sm text-blue-600 hover:text-blue-800 font-medium"
              >
                Giriş Yap
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
