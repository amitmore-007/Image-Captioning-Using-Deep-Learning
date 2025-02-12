import { useNavigate } from "react-router-dom";
import { Command } from "lucide-react";

export default function Landing() {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/login");
  };

  return (
    <div className="bg-[#18212C] text-white h-auto flex flex-col w-full items-center justify-center px-4 gap-y-[50px]">
      <div className="md:flex mt-[40px] md:mt-[100px] md:gap-[60px] justify-center items-center p-6">
        <div className="flex flex-col gap-[38px] w-[490px] mb-[60px]">
          <h1 className="text-[50px] font-bold text-[#D6DDE6] md:text-[70px] text-center leading-[120px] tracking-[-1.4px] font-[Plus Jakarta Sans]">
            Your AI Image Caption Generator
          </h1>
          <div className="flex justify-center">
            <button 
              className="flex items-center justify-center h-10 min-w-[84px] max-w-[480px] px-4 rounded-[20px] bg-[#1AE5D1] text-black hover:bg-[#19d3c1]" 
              onClick={handleNavigate}
            >
              Get Started
            </button>
          </div>
        </div>

        <div className="flex justify-center mb-8">
          <div className="relative">
            <Command className="w-40 h-40 md:w-80 md:h-80 text-[#1AE5D1]" />
          </div>
        </div>
      </div>

      {/* features */}
      <div className="flex flex-col gap-8 justify-center mt-2 mb-4">
        <h2 className="text-[18px] font-bold text-white leading-[23px] font-spaceGrotesk dlig-on">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[25px] max-w-4xl">
          {/* Feature 1 */}
          <div className="flex flex-col items-start w-[300px] md:w-[450px] border-t-2 border-[#19E5D1]">
            <div className="flex flex-col gap-[15px] mt-[15px]">
              <div>
                <Command className="w-4 h-4 text-[#19E5D1]" />
              </div>
              <div className="flex flex-col">
                <h3 className="text-[14px] font-normal text-[#94C7C2] font-spaceGrotesk dlig-on">Multi-Image Upload</h3>
                <p className="text-[14px] font-normal text-[#94C7C2] font-spaceGrotesk dlig-on">
                  Upload multiple images at once for batch processing
                </p>
              </div>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="flex flex-col items-start w-[300px] md:w-[450px] border-t-2 border-[#19E5D1]">
            <div className="flex flex-col gap-[15px] mt-[15px]">
              <div>
                <Command className="w-4 h-4 text-[#19E5D1]" />
              </div>
              <div className="flex flex-col">
                <h3 className="text-[14px] font-normal text-[#94C7C2] font-spaceGrotesk dlig-on">AI-Powered</h3>
                <p className="text-[14px] font-normal text-[#94C7C2] font-spaceGrotesk dlig-on">
                  Generate accurate captions using advanced AI models
                </p>
              </div>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="flex flex-col items-start w-[300px] md:w-[450px] border-t-2 border-[#19E5D1]">
            <div className="flex flex-col gap-[15px] mt-[15px]">
              <div>
                <Command className="w-4 h-4 text-[#19E5D1]" />
              </div>
              <div className="flex flex-col">
                <h3 className="text-[14px] font-normal text-[#94C7C2] font-spaceGrotesk dlig-on">Instant Results</h3>
                <p className="text-[14px] font-normal text-[#94C7C2] font-spaceGrotesk dlig-on">
                  Get multiple captions for each image instantly
                </p>
              </div>
            </div>
          </div>

          {/* Feature 4 */}
          <div className="flex flex-col items-start w-[300px] md:w-[450px] border-t-2 border-[#19E5D1]">
            <div className="flex flex-col gap-[15px] mt-[15px]">
              <div>
                <Command className="w-4 h-4 text-[#19E5D1]" />
              </div>
              <div className="flex flex-col">
                <h3 className="text-[14px] font-normal text-[#94C7C2] font-spaceGrotesk dlig-on">Easy to Use</h3>
                <p className="text-[14px] font-normal text-[#94C7C2] font-spaceGrotesk dlig-on">
                  Simple drag and drop interface for quick uploads
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div id="how-it-works" className="flex flex-col mt-2 max-w-5xl gap-[35px] mb-[100px]">
        <h2 className="text-[22px] font-bold text-white font-spaceGrotesk leading-none self-stretch dlig-on">How it works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[40px]">
          {/* Upload */}
          <div className="flex flex-col items-start gap-3 w-[301px] p-3 rounded-[8px] border border-[#19E5D1] bg-[rgba(29,29,29,0.60)] self-stretch flex-shrink-0">
            <Command className="w-8 h-8 text-[#19E5D1]" />
            <h3 className="text-[16px] font-bold text-white leading-[20px] font-spaceGrotesk dlig-on">Upload</h3>
            <p className="text-[14px] font-normal text-[#94C7C2] leading-[21px] font-spaceGrotesk dlig-on">
              Upload your images in bulk
            </p>
          </div>

          {/* AI Analysis */}
          <div className="flex flex-col items-start gap-3 w-[301px] p-3 rounded-[8px] border border-[#19E5D1] bg-[rgba(29,29,29,0.60)] self-stretch flex-shrink-0">
            <Command className="w-8 h-8 text-[#19E5D1]" />
            <h3 className="text-[16px] font-bold text-white leading-[20px] font-spaceGrotesk dlig-on">AI Analysis</h3>
            <p className="text-[14px] font-normal text-[#94C7C2] leading-[21px] font-spaceGrotesk dlig-on">
              Our advanced AI analyzes your images
            </p>
          </div>

          {/* Instant Report */}
          <div className="flex flex-col items-start gap-3 w-[301px] p-3 rounded-[8px] border border-[#19E5D1] bg-[rgba(29,29,29,0.60)] self-stretch flex-shrink-0">
            <Command className="w-8 h-8 text-[#19E5D1]" />
            <h3 className="text-[16px] font-bold text-white leading-[20px] font-spaceGrotesk dlig-on">Get Captions</h3>
            <p className="text-[14px] font-normal text-[#94C7C2] leading-[21px] font-spaceGrotesk dlig-on">
              Receive multiple unique captions
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}