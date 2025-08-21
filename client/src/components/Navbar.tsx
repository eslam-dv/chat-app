import { Link } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";
import { LogOut, MessageSquare, Settings, User, LogIn } from "lucide-react";

const Navbar = () => {
  const { logout, user } = useAuthStore();

  return (
    <header className="navbar bg-base-100 shadow-sm sticky z-50 top-0">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2.5 hover:opacity-80 transition-all"
        >
          <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center">
            <MessageSquare className="size-5 text-primary" />
          </div>
          <span>Chatty</span>
        </Link>
        {/* Navigation */}
        <nav>
          {user ? (
            <div className="flex gap-2 items-center">
              <Link
                to="/profile"
                className="btn flex gap-2 items-center bg-primary hover:bg-primary/75 rounded-lg text-primary-content"
              >
                <User className="size-5" />
                <span className="hidden sm:inline">Profile</span>
              </Link>
              <Link
                to="/settings"
                className="btn flex gap-2 items-center bg-primary hover:bg-primary/75 rounded-lg text-primary-content"
              >
                <Settings className="size-5" />
                <span className="hidden sm:inline">Settings</span>
              </Link>
              <button
                type="button"
                className="btn flex gap-2 items-center bg-primary hover:bg-primary/75 rounded-lg text-primary-content"
                onClick={logout}
              >
                <LogOut className="size-5" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="btn flex gap-2 items-center bg-primary hover:bg-primary/75 rounded-lg text-primary-content"
            >
              <LogIn className="size-5" />
              <span className="hidden sm:inline">Login</span>
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
