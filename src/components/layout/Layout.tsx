import { useLocation } from 'react-router-dom'
import { Navigation } from './Navigation'

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  const location = useLocation()
  const isLoginPage = location.pathname === '/login'

  return (
    <div className="h-screen hidden-scrollbar overflow-y-auto bg-gray-100">
      {!isLoginPage && <Navigation />}
      <main className={isLoginPage ? '' : 'max-w-7xl mx-auto py-8 px-4'}>
        {children}
      </main>
    </div>
  )
} 