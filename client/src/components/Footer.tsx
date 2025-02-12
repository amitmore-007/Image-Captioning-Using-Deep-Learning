import { Link } from 'react-router-dom';
import { Instagram, Twitter, Facebook } from 'lucide-react';

export function Footer() {
  return (
    <div className="w-full">
      <div className="border-b border-[#E5E8EB] w-full"></div>
      <footer className="bg-[#18212C] text-white h-[80px] md:h-[149px] py-10 px-4 text-center font-spaceGrotesk text-[8px] md:text-[16px] font-normal">
        <div className="flex items-center justify-between">
          <div className="ml-2 md:ml-10">
            <p>SnapCaption</p>
          </div>

          <div className="flex justify-center md:space-x-[100px] space-x-[10px]">
            <Link to="/help" className="hover:text-gray-400">Help</Link>
            <Link to="/contact" className="hover:text-gray-400">Contact Us</Link>
            <Link to="/terms" className="hover:text-gray-400">Terms</Link>
          </div>

          <div className="flex justify-center md:space-x-6 md:mr-10 space-x-2">
            <a href="#" className="hover:text-gray-400">
              <Instagram className="w-[14px] h-[14px] md:w-[24px] md:h-[24px]" />
            </a>
            <a href="#" className="hover:text-gray-400">
              <Twitter className="w-[14px] h-[14px] md:w-[24px] md:h-[24px]" />
            </a>
            <a href="#" className="hover:text-gray-400">
              <Facebook className="w-[14px] h-[14px] md:w-[24px] md:h-[24px]" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
