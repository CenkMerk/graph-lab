import { useLocation } from "react-router-dom";
import { Navigation } from "./Navigation";
import { useAuth } from "../../contexts/AuthContext";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";
  const { user } = useAuth();
  return (
    <div className="h-screen hidden-scrollbar overflow-y-auto bg-gray-100 flex flex-col">
      {!isLoginPage && <Navigation />}
      <main
        className={
          isLoginPage ? "" : `${user ? "max-w-7xl w-full mx-auto py-8 px-4" : ""}`
        }
      >
        {children}
      </main>
    </div>
  );
}
