import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-white shadow-md">
          <ul className="flex gap-6 p-4 max-w-7xl mx-auto">
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
        </nav>

        <main className="max-w-7xl mx-auto p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
