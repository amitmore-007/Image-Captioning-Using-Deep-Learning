// import { Link } from 'react-router-dom';
// import { Instagram, Twitter, Facebook } from 'lucide-react';

// export function Footer() {
//   return (
//     <div className="w-full">
//       <div className="border-b border-[#E5E8EB] w-full"></div>
//       <footer className="bg-[#18212C] text-white h-[80px] md:h-[149px] py-10 px-4 text-center font-spaceGrotesk text-[8px] md:text-[16px] font-normal">
//         <div className="flex items-center justify-between">
//           <div className="ml-2 md:ml-10">
//             <p>SnapCaption</p>
//           </div>

//           <div className="flex justify-center md:space-x-[100px] space-x-[10px]">
//             <Link to="/help" className="hover:text-gray-400">Help</Link>
//             <Link to="/contact" className="hover:text-gray-400">Contact Us</Link>
//             <Link to="/terms" className="hover:text-gray-400">Terms</Link>
//           </div>

//           <div className="flex justify-center md:space-x-6 md:mr-10 space-x-2">
//             <a href="#" className="hover:text-gray-400">
//               <Instagram className="w-[14px] h-[14px] md:w-[24px] md:h-[24px]" />
//             </a>
//             <a href="#" className="hover:text-gray-400">
//               <Twitter className="w-[14px] h-[14px] md:w-[24px] md:h-[24px]" />
//             </a>
//             <a href="#" className="hover:text-gray-400">
//               <Facebook className="w-[14px] h-[14px] md:w-[24px] md:h-[24px]" />
//             </a>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// }
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, GithubIcon, LinkedinIcon } from 'lucide-react';

export function Footer () {
  return (
    <div className="relative w-full bg-gradient-to-br from-gray-900 via-[#1a0b2e] to-[#0f0728] overflow-hidden">
      {/* Ambient background effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,214,0,0.03),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(216,180,254,0.05),transparent_50%)]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand Section */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-200 bg-clip-text text-transparent">
              SnapCaption
            </h2>
            <p className="text-purple-200/80">
              Turn your moments into words with our state-of-the-art image captioning technology.
            </p>
            <div className="flex space-x-4">
              {/* GitHub */}
              <a
                href="#"
                className="w-10 h-10 bg-gradient-to-br from-purple-500/10 via-purple-400/5 to-transparent 
                  backdrop-blur-xl rounded-full flex items-center justify-center
                  border border-purple-500/20 hover:border-yellow-500/40 transition-all duration-300"
              >
                <GithubIcon className="w-5 h-5 text-purple-300" />
              </a>

              {/* LinkedIn */}
              <a
                href="#"
                className="w-10 h-10 bg-gradient-to-br from-purple-500/10 via-purple-400/5 to-transparent 
                  backdrop-blur-xl rounded-full flex items-center justify-center
                  border border-purple-500/20 hover:border-yellow-500/40 transition-all duration-300"
              >
                <LinkedinIcon className="w-5 h-5 text-purple-300" />
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-semibold bg-gradient-to-r from-amber-200 to-yellow-200 bg-clip-text text-transparent mb-6">
              Contact Us
            </h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <MapPin className="text-amber-300/80 w-5 h-5" />
                <span className="text-purple-200/80">Maharashtra, India</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="text-amber-300/80 w-5 h-5" />
                <span className="text-purple-200/80">info@snapcaption.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="text-amber-300/80 w-5 h-5" />
                <span className="text-purple-200/80">+91 123 456 7890</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-purple-500/20">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-purple-200/70 text-sm">
              © 2025 SnapCaption. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item) => (
                <Link
                  key={item}
                  to={`/${item.toLowerCase().replace(/\s+/g, '-')}`}
                  className="text-purple-200/70 hover:text-yellow-200 text-sm transition-colors"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;