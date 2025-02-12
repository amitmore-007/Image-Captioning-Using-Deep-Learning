import vector from '../../assets/navbar/Vector - 0.png';
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from '../../contexts/authContext.tsx'
import { doSignOut } from '../../firebase/auth.tsx'

const Navbar = () => {
    const navigate = useNavigate();
    const { userLoggedIn } = useAuth();

    const handleAuthAction = async () => {
        if (userLoggedIn) {
            await doSignOut(); // Ensure sign-out completes before navigating
        }
        navigate('/login');
    };

    return (
        <div className="w-full">
            <nav className="flex justify-between items-center py-4 px-8 bg-black text-white">
                {/* Logo Section */}
                <div className="flex items-center gap-2">
                    <img src={vector} alt="Logo" className="w-[16px] h-[16px]" />
                    <Link to="/" className="text-[15px] md:text-[18px] font-spaceGrotesk font-semibold text-white">
                        SnapCaption
                    </Link>
                </div>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center space-x-6">
                    <ul className="flex space-x-6">
                        <li>
                            <a href="#how-it-works" className="text-white hover:text-gray-400">
                                How It Works
                            </a>
                        </li>
                        <li>
                            <Link to="/privacy-policy" className="text-white hover:text-gray-400">
                                Privacy Policy
                            </Link>
                        </li>
                        <li>
                            <Link to="/reach-out" className="text-white hover:text-gray-400">
                                Contact Us
                            </Link>
                        </li>
                    </ul>

                    {/* Auth Button */}
                    <button
                        className="h-10 w-[120px] px-4 rounded-full bg-[#1AE5D1] text-black hover:bg-[#19d3c1]"
                        onClick={handleAuthAction}
                    >
                        {userLoggedIn ? "Logout" : "Get Started"}
                    </button>
                </div>
            </nav>

            {/* Border Line */}
            <div className="border-b border-[#E5E8EB] w-full"></div>
        </div>
    );
};

export default Navbar;
