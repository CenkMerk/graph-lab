import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';

export function Login() {
  const { user, signInWithGoogle } = useAuth();

  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-xl shadow-2xl">
          <div className="text-center">
            <div className="mx-auto h-16 w-16 bg-blue-600 rounded-full flex items-center justify-center">
              <svg 
                className="h-10 w-10 text-white"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" 
                />
              </svg>
            </div>
            <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
              Graph Lab
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Graf teorisi çalışmalarınız için dijital laboratuvar
            </p>
          </div>

          <div className="mt-8">
            <button
              onClick={signInWithGoogle}
              className="group relative flex w-full items-center justify-center gap-3 rounded-lg border-2 border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200"
            >
              {/* <FcGoogle className="h-5 w-5" /> */}
              Google ile Devam Et
            </button>
          </div>

          <div className="mt-8 text-center text-sm text-gray-600">
            <p>
              Giriş yaparak{' '}
              <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                Kullanım Koşulları
              </a>
              {' '}ve{' '}
              <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                Gizlilik Politikası
              </a>
              'nı kabul etmiş olursunuz
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 