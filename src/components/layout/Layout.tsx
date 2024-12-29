import { useLocation } from 'react-router-dom'
import { Navigation } from './Navigation'

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  const location = useLocation()
  const isLoginPage = location.pathname === '/login'

  return (
    <div className="min-h-screen bg-gray-100">
      {!isLoginPage && <Navigation />}
      <main className={isLoginPage ? '' : 'max-w-7xl mx-auto p-4'}>
        {children}
      </main>
    </div>
  )
} 