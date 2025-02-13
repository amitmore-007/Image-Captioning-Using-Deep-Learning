import { useNavigate, Link } from "react-router-dom";
import { useAuth } from '../contexts/AuthContext';
import { Command } from "lucide-react";

export function Navbar() {
  const navigate = useNavigate();
  const { userLoggedIn, logout } = useAuth();

  const handleAuthAction = async () => {
    if (userLoggedIn) {
      try {
        await logout();
        navigate('/');
      } catch (error) {
        console.error("Logout failed:", error);
      }
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="w-full">
      <nav className="flex justify-between items-center py-4 px-8 bg-black text-white">
        {/* Logo Section */}
        <div className="flex items-center gap-2">
          <Command className="w-6 h-6" />
          <Link to="/" className="text-[15px] md:text-[18px] font-bold text-white">
            SnapCaption
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="flex items-center space-x-6">
          <ul className="flex space-x-6">
            {userLoggedIn && (
              <li>
                <Link to="/dashboard" className="text-white hover:text-gray-400">
                  Dashboard
                </Link>
              </li>
            )}
            {!userLoggedIn && (
              <li>
                <Link to="/register" className="text-white hover:text-gray-400">
                  Register
                </Link>
              </li>
            )}
            <li>
              <Link to="/contact" className="text-white hover:text-gray-400">
                Contact Us
              </Link>
            </li>
          </ul>

          {/* Auth Button */}
          <button
            className="h-10 w-[120px] px-4 rounded-full bg-[#1AE5D1] text-black hover:bg-[#19d3c1]"
            onClick={handleAuthAction}
          >
            {userLoggedIn ? "Logout" : "Login"}
          </button>
        </div>
      </nav>

      {/* Border Line */}
      <div className="border-b border-[#E5E8EB] w-full"></div>
    </div>
  );
}