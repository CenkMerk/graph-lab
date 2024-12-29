import { Link } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

export function Navigation() {
  const { user, signOut } = useAuth()

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <ul className="flex items-center gap-6">
            <li>
              <Link to="/" className="text-gray-700 hover:text-gray-900 font-medium">
                Ana Sayfa
              </Link>
            </li>
            <li>
              <Link to="/about" className="text-gray-700 hover:text-gray-900 font-medium">
                Hakkında
              </Link>
            </li>
          </ul>
          {user && (
            <div className="flex items-center gap-4">
              <span className="text-gray-700">{user.email}</span>
              <button
                onClick={signOut}
                className="text-sm text-red-600 hover:text-red-800"
              >
                Çıkış Yap
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
} 