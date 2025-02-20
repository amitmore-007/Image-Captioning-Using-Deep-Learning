// import { useNavigate, Link } from "react-router-dom";
// import { useAuth } from '../contexts/AuthContext';
// import { Command } from "lucide-react";

// export function Navbar() {
//   const navigate = useNavigate();
//   const { currentUser, logout } = useAuth();

//   const handleAuthAction = async () => {
//     if (currentUser) {
//       try {
//         await logout();
//         navigate('/');
//       } catch (error) {
//         console.error("Logout failed:", error);
//       }
//     } else {
//       navigate('/login');
//     }
//   };

//   return (
//     <div className="w-full">
//       <nav className="flex justify-between items-center py-4 px-8 bg-black text-white">
//         {/* Logo Section */}
//         <div className="flex items-center gap-2">
//           <Command className="w-6 h-6" />
//           <Link to={currentUser ? "/home" : "/"} className="text-[15px] md:text-[18px] font-bold text-white">
//             SnapCaption
//           </Link>
//         </div>

//         {/* Desktop Menu */}
//         <div className="flex items-center space-x-6">
//           <ul className="flex space-x-6">
//             <li>
//               <Link to="/reachout" className="text-white hover:text-gray-400">
//                 Contact Us
//               </Link>
//             </li>
//           </ul>

//           {/* Auth Button */}
//           <button
//             className="h-10 w-[120px] px-4 rounded-full bg-[#1AE5D1] text-black hover:bg-[#19d3c1]"
//             onClick={handleAuthAction}
//           >
//             {currentUser ? "Logout" : "Get Started"}
//           </button>
//         </div>
//       </nav>

//       {/* Border Line */}
//       <div className="border-b border-[#E5E8EB] w-full"></div>
//     </div>
//   );
// }
import React, { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.tsx";
import vector from "../assets/Vector - 0.png";
import { doSignOut } from "../firebase/auth.ts";
import { Menu, X, Sparkles, ChevronRight } from "lucide-react";

export function Navbar ()  {
  const navigate = useNavigate();
  const location = useLocation();
  const { userLoggedIn } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleAuthAction = async () => {
    if (userLoggedIn) {
      await doSignOut();
    }
    navigate("/login");
  };

  const handleMouseMove = (e) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  const isActivePath = (path) => {
    return location.pathname === path;
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-500 py-3 ${
        scrollPosition > 10
          ? "bg-slate-800/80 backdrop-blur-xl border-b border-white/10"
          : "bg-slate-800/50 backdrop-blur-sm"
      }`}
      onMouseMove={handleMouseMove}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center space-x-3 group">
            <div className="w-12 h-12 relative transition-transform duration-500 group-hover:rotate-12">
              <div className="absolute -inset-1 bg-gradient-to-r from-violet-600 via-indigo-600 to-purple-600 rounded-xl opacity-30 group-hover:opacity-70 blur-xl transition-all duration-500 animate-pulse" />
              <img
                 src={vector}
                alt="Logo" 
                className="w-7 h-7 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 group-hover:scale-110 transition-all duration-500 z-10"
              />
            </div>

            <Link to="/" className="relative">
              <span className="text-2xl font-bold bg-gradient-to-r from-violet-300 via-indigo-300 to-purple-300 bg-clip-text text-transparent">
                SnapCaption
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {["Privacy Policy", "Contact Us"].map((item) => {
              const path =
                item === "Contact Us"
                  ? "/reachout"
                  : `/${item.toLowerCase().replace(" ", "-")}`;
              return (
                <Link
                  key={item}
                  to={path}
                  className="text-gray-300 hover:text-white transition-colors duration-300 relative py-2 px-4"
                >
                  <span className="relative z-10">{item}</span>
                  <span
                    className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-violet-400 to-purple-400 transform origin-left transition-all duration-300 ${
                      isActivePath(path)
                        ? "scale-x-100"
                        : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </Link>
              );
            })}

            <button
              className="relative px-6 py-2.5 rounded-full overflow-hidden group"
              onClick={handleAuthAction}
            >
              <span className="absolute inset-0 bg-gradient-to-r from-violet-600 via-indigo-600 to-purple-600 opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative flex items-center gap-2 text-white font-medium">
                {userLoggedIn ? "Logout" : "Get Started"}
                <ChevronRight className="w-4 h-4" />
              </span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-300 hover:text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-500 ${
            isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="pt-4 pb-3 space-y-2">
            {["Privacy Policy", "Contact Us"].map((item) => {
              const path =
                item === "Contact Us"
                  ? "/reach-out"
                  : `/${item.toLowerCase().replace(" ", "-")}`;
              return (
                <Link
                  key={item}
                  to={path}
                  className="block px-4 py-2 text-gray-300 hover:text-white transition-colors duration-300"
                >
                  {item}
                </Link>
              );
            })}
            <div className="px-4 pt-2">
              <button
                className="w-full relative px-6 py-2.5 rounded-lg overflow-hidden group"
                onClick={handleAuthAction}
              >
                <span className="absolute inset-0 bg-gradient-to-r from-violet-600 via-indigo-600 to-purple-600 opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative flex items-center justify-center gap-2 text-white font-medium">
                  {userLoggedIn ? "Logout" : "Get Started"}
                  <ChevronRight className="w-4 h-4" />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
