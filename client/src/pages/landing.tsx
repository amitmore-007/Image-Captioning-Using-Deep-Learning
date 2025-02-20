// import { useNavigate } from "react-router-dom";
// import { Command } from "lucide-react";

// export default function Landing() {
//   const navigate = useNavigate();

//   const handleNavigate = () => {
//     navigate("/login");
//   };

//   return (
//     <div className="bg-[#18212C] text-white h-auto flex flex-col w-full items-center justify-center px-4 gap-y-[50px]">
//       <div className="md:flex mt-[40px] md:mt-[100px] md:gap-[60px] justify-center items-center p-6">
//         <div className="flex flex-col gap-[38px] w-[490px] mb-[60px]">
//           <h1 className="text-[50px] font-bold text-[#D6DDE6] md:text-[70px] text-center leading-[120px] tracking-[-1.4px] font-[Plus Jakarta Sans]">
//             Your AI Image Caption Generator
//           </h1>
//           <div className="flex justify-center">
//             <button 
//               className="flex items-center justify-center h-10 min-w-[84px] max-w-[480px] px-4 rounded-[20px] bg-[#1AE5D1] text-black hover:bg-[#19d3c1]" 
//               onClick={handleNavigate}
//             >
//               Get Started
//             </button>
//           </div>
//         </div>

//         <div className="flex justify-center mb-8">
//           <div className="relative">
//             <Command className="w-40 h-40 md:w-80 md:h-80 text-[#1AE5D1]" />
//           </div>
//         </div>
//       </div>

//       {/* features */}
//       <div className="flex flex-col gap-8 justify-center mt-2 mb-4">
//         <h2 className="text-[18px] font-bold text-white leading-[23px] font-spaceGrotesk">Features</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-[25px] max-w-4xl">
//           {/* Feature 1 */}
//           <div className="flex flex-col items-start w-[300px] md:w-[450px] border-t-2 border-[#19E5D1]">
//             <div className="flex flex-col gap-[15px] mt-[15px]">
//               <div>
//                 <Command className="w-4 h-4 text-[#19E5D1]" />
//               </div>
//               <div className="flex flex-col">
//                 <h3 className="text-[14px] font-normal text-[#94C7C2]">Multi-Image Upload</h3>
//                 <p className="text-[14px] font-normal text-[#94C7C2]">
//                   Upload multiple images at once for batch processing
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* Feature 2 */}
//           <div className="flex flex-col items-start w-[300px] md:w-[450px] border-t-2 border-[#19E5D1]">
//             <div className="flex flex-col gap-[15px] mt-[15px]">
//               <div>
//                 <Command className="w-4 h-4 text-[#19E5D1]" />
//               </div>
//               <div className="flex flex-col">
//                 <h3 className="text-[14px] font-normal text-[#94C7C2]">AI-Powered</h3>
//                 <p className="text-[14px] font-normal text-[#94C7C2]">
//                   Generate accurate captions using advanced AI models
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* Feature 3 */}
//           <div className="flex flex-col items-start w-[300px] md:w-[450px] border-t-2 border-[#19E5D1]">
//             <div className="flex flex-col gap-[15px] mt-[15px]">
//               <div>
//                 <Command className="w-4 h-4 text-[#19E5D1]" />
//               </div>
//               <div className="flex flex-col">
//                 <h3 className="text-[14px] font-normal text-[#94C7C2]">Instant Results</h3>
//                 <p className="text-[14px] font-normal text-[#94C7C2]">
//                   Get multiple captions for each image instantly
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* Feature 4 */}
//           <div className="flex flex-col items-start w-[300px] md:w-[450px] border-t-2 border-[#19E5D1]">
//             <div className="flex flex-col gap-[15px] mt-[15px]">
//               <div>
//                 <Command className="w-4 h-4 text-[#19E5D1]" />
//               </div>
//               <div className="flex flex-col">
//                 <h3 className="text-[14px] font-normal text-[#94C7C2]">Easy to Use</h3>
//                 <p className="text-[14px] font-normal text-[#94C7C2]">
//                   Simple drag and drop interface for quick uploads
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* How It Works section */}
//       <div id="how-it-works" className="flex flex-col mt-2 max-w-5xl gap-[35px] mb-[100px]">
//         <h2 className="text-[22px] font-bold text-white leading-none self-stretch">How it works</h2>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-[40px]">
//           {/* Upload */}
//           <div className="flex flex-col items-start gap-3 w-[301px] p-3 rounded-[8px] border border-[#19E5D1] bg-[rgba(29,29,29,0.60)]">
//             <Command className="w-8 h-8 text-[#19E5D1]" />
//             <h3 className="text-[16px] font-bold text-white leading-[20px]">Upload</h3>
//             <p className="text-[14px] font-normal text-[#94C7C2] leading-[21px]">
//               Upload your images in bulk
//             </p>
//           </div>

//           {/* AI Analysis */}
//           <div className="flex flex-col items-start gap-3 w-[301px] p-3 rounded-[8px] border border-[#19E5D1] bg-[rgba(29,29,29,0.60)]">
//             <Command className="w-8 h-8 text-[#19E5D1]" />
//             <h3 className="text-[16px] font-bold text-white leading-[20px]">AI Analysis</h3>
//             <p className="text-[14px] font-normal text-[#94C7C2] leading-[21px]">
//               Our advanced AI analyzes your images
//             </p>
//           </div>

//           {/* Instant Report */}
//           <div className="flex flex-col items-start gap-3 w-[301px] p-3 rounded-[8px] border border-[#19E5D1] bg-[rgba(29,29,29,0.60)]">
//             <Command className="w-8 h-8 text-[#19E5D1]" />
//             <h3 className="text-[16px] font-bold text-white leading-[20px]">Get Captions</h3>
//             <p className="text-[14px] font-normal text-[#94C7C2] leading-[21px]">
//               Receive multiple unique captions
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCube } from "swiper/modules";
import { doSignOut } from "../firebase/auth.ts";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.tsx";
import { motion } from "framer-motion";
import { FC } from "react";
import img1 from "../assets/img/img1.jpg";  
import img2 from "../assets/img/img2.jpg";
import img3 from "../assets/img/img3.jpg";
import img4 from "../assets/img/img4.jpg";

import {
  GithubIcon,
  LinkedinIcon,
  BrainCircuit,
  Cpu,
  Shield,
  Workflow,
  MessageSquareCode,
  Image as ImageIcon,
  Lightbulb,
  Zap,
} from "lucide-react";
import "swiper/css";
import "swiper/css/effect-cube";
import amitImage from "../assets/amit.jpg";
import pranavImage from "../assets/pranav.jpg";
import ganeshImage from "../assets/ganesh.jpg";
import renukaImage from "../assets/renuka.jpg"
const StaticBackground = () => (
  <div className="absolute inset-0 overflow-hidden">
    {[...Array(20)].map((_, i) => {
      const size = Math.random() * 300 + 100;
      return (
        <div
          key={i}
          className="absolute rounded-full bg-gradient-to-br from-blue-500 to-purple-500 opacity-10"
          style={{
            width: size,
            height: size,
            top: Math.random() * window.innerHeight,
            left: Math.random() * window.innerWidth,
            filter: "blur(8px)",
          }}
        />
      );
    })}
  </div>
);




const FloatingParticles = ({ color = "blue" }) => (
  <div className="absolute inset-0 overflow-hidden">
    {[...Array(30)].map((_, i) => (
      <motion.div
        key={i}
        className={`absolute w-2 h-2 rounded-full bg-${color}-500 opacity-20`}
        initial={{
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
        }}
        animate={{
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
        }}
        transition={{
          duration: Math.random() * 5 + 3,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      />
    ))}
  </div>
);





interface FeatureCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  delay?: number;
}

const FeatureCard: FC<FeatureCardProps> = ({
  icon: Icon,
  title,
  description,
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    whileHover={{ scale: 1.05 }}
    className="bg-gradient-to-br from-white/[0.12] via-white/[0.06] to-transparent 
      backdrop-blur-xl rounded-2xl p-8 
      border border-white/[0.08] hover:border-blue-500/40 transition-all duration-300 
      shadow-[0_8px_32px_rgba(0,0,0,0.15)] hover:shadow-[0_8px_32px_rgba(59,130,246,0.25)]
      relative group overflow-hidden"
  >
    {/* Background glow effect */}
    <div
      className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-transparent 
      opacity-0 group-hover:opacity-100 transition-all duration-500 blur-xl -z-10"
    />

    <div className="flex flex-col items-center text-center relative z-10">
      <motion.div
        className="mb-6 p-4 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full
          ring-2 ring-white/[0.08] hover:ring-blue-500/30 transition-all duration-300
          relative overflow-hidden shadow-lg"


      >
        {/* Inner glow for icon */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-blue-500/20 blur-sm" />
        <Icon className="w-8 h-8 text-blue-300 relative z-10 group-hover:text-blue-200 transition-colors duration-300" />
      </motion.div>

      <h3 className="text-xl font-semibold bg-gradient-to-br from-white to-blue-100/90 bg-clip-text text-transparent mb-3">
        {title}
      </h3>
      <p className="text-gray-300/90 leading-relaxed">{description}</p>
    </div>
  </motion.div>
);

// Define the prop types for TeamMember
interface TeamMemberProps {
  name: string;
  role: string;
  image: string;
  linkedin?: string;
  github?: string;
  floatDelay: number;
}

const TeamMember: FC<TeamMemberProps> = ({
  name,
  role,
  image,
  linkedin,
  github,
  floatDelay,
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        duration: 1,
        bounce: 0.3,
      },
    }}
    animate={{
      y: [0, -10, 0],
    }}

    whileHover={{ scale: 1.02, y: -15 }}
    className="relative group"
  >
    <div className="relative overflow-hidden">
      {/* Animated background glow */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 
        opacity-0 group-hover:opacity-100 blur-2xl transition-all duration-700 -z-10"
      />

      <div
        className="bg-gradient-to-br from-white/[0.12] via-white/[0.08] to-transparent 
        backdrop-blur-xl rounded-2xl p-8 border border-white/[0.08] 
        group-hover:border-blue-500/30 transition-all duration-500
        shadow-[0_8px_32px_rgba(0,0,0,0.15)] group-hover:shadow-[0_8px_32px_rgba(59,130,246,0.25)]"
      >
        {/* Profile Image Container */}

          {/* Image glow effect */}
          <div
            className="absolute inset-0 bg-gradient-to-br from-blue-500/40 to-purple-500/40 
            opacity-0 group-hover:opacity-100 blur-2xl transition-all duration-500"
          />

          {/* Image frame */}
          <div
            className="relative h-64 rounded-2xl overflow-hidden 
            ring-2 ring-white/[0.08] group-hover:ring-blue-500/30 
            transition-all duration-500 transform"
          >
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover transform scale-105 
                group-hover:scale-110 transition-transform duration-700"
            />

            {/* Overlay gradient */}
            <div
              className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent 
              opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            />
          </div>


        {/* Content Container */}
        <div className="relative z-10 text-white text-lg font-blod">
            {name}
          <p className="text-lg text-blue-200/90 font-medium mb-6">{role}</p>

          <div className="flex gap-6 justify-center mt-6">
            {linkedin && (
              <motion.a
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -4, scale: 1.1 }}
                className="group/icon"
              >
                <LinkedinIcon
                  className="w-8 h-8 text-blue-300 group-hover/icon:text-blue-400 
                  transition-all duration-300 transform"
                />
              </motion.a>
            )}
            {github && (
              <motion.a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -4, scale: 1.1 }}
                className="group/icon"
              >
                <GithubIcon
                  className="w-8 h-8 text-blue-300 group-hover/icon:text-white 
                  transition-all duration-300 transform"
                />
              </motion.a>
            )}
          </div>
        </div>
      </div>
    </div>
  </motion.div>
);

const Home = () => {

    const navigate = useNavigate();
    const { userLoggedIn } = useAuth();

    const handleAuthAction = async () => {
      if (userLoggedIn) {
        await doSignOut();
      }
      navigate("/login");
    };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-900 via-purple-900 to-indigo-900 overflow-hidden">
      <StaticBackground/>

      {/* Hero Section */}
      <section className="relative z-10 grid grid-cols-1 md:grid-cols-2 items-center gap-10 p-8 md:p-16 min-h-screen">
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center md:text-left"
        >
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
            Turn Moments into Words with SnapCaption!
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-8">
            Our advanced transformer-based system generates accurate and
            contextual captions for your images, powered by state-of-the-art
            deep learning.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAuthAction}
            className="px-10 py-5 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xl font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all"
          >
            Get Started
          </motion.button>
        </motion.div>

        <motion.div
    initial={{ opacity: 0, x: 100 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.8 }}
    className="w-full max-w-2xl mx-auto"
  >
    <Swiper
      modules={[Autoplay, EffectCube]}
      effect="cube"
      grabCursor={true}
      loop={true}
      speed={1000}
      cubeEffect={{
        shadow: true,
        slideShadows: true,
        shadowOffset: 20,
        shadowScale: 0.94,
      }}
      autoplay={{ delay: 2600, pauseOnMouseEnter: true }}
      className="rounded-2xl shadow-2xl"
    >
      {[
        {
          img: img1,
          caption: "A large building with a red dome and tall tower stands out at sunset",
        },
        {
          img: img2,
          caption: "A brightly lit clock tower glows purple against a star-filled night sky",
        },
        {
          img: img3,
          caption: "Tall buildings line a busy street with trees on both sides under a cloudy sky",
        },
        {
          img: img4,
          caption: "A tall tower with pink cherry blossoms in front of a blue sky.",
        },
      ].map((slide, index) => (
        <SwiperSlide key={index} className="relative">
          <img
            src={slide.img}
            alt="Slide"
            className="w-full h-[500px] object-cover rounded-2xl"
          />
          <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/90 via-black/60 to-transparent p-6 text-white rounded-b-2xl backdrop-blur-md">
            <p className="text-lg md:text-xl font-light tracking-wider leading-relaxed font-serif italic">
              {slide.caption}
            </p>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  </motion.div>
      </section>

      <section className="relative z-10 py-32 px-8 md:px-16 bg-gradient-to-br from-blue-950 via-indigo-950/95 to-blue-900 overflow-hidden">


        {/* Ambient background effects */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.08)_0%,transparent_100%)]" />

        <div className="relative">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl font-bold bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent mb-6">
              Powered by Advanced AI
            </h2>
            <p className="text-2xl text-gray-300/90 font-light">
              State-of-the-art Transformer Architecture
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={BrainCircuit}
              title="Transformer Model"
              description="Advanced neural architecture for accurate image understanding and context analysis"
              delay={0}
            />
            <FeatureCard
              icon={Shield}
              title="Multi-Head Attention"
              description="Sophisticated attention mechanism for capturing complex image relationships"
              delay={0.2}
            />
            <FeatureCard
              icon={Workflow}
              title="Parallel Processing"
              description="High-speed processing with GPU acceleration for real-time captioning"
              delay={0.4}
            />
            <FeatureCard
              icon={MessageSquareCode}
              title="Natural Language"
              description="Advanced NLP for human-like caption generation"
              delay={0.6}
            />
            <FeatureCard
              icon={ImageIcon}
              title="Image Analysis"
              description="Deep feature extraction for comprehensive scene understanding"
              delay={0.8}
            />
            <FeatureCard
              icon={Cpu}
              title="CUDA Optimized"
              description="Optimized performance on NVIDIA GPUs for faster processing"
              delay={1.0}
            />
            <FeatureCard
              icon={Lightbulb}
              title="Smart Context"
              description="Contextual understanding for more relevant captions"
              delay={1.2}
            />
            <FeatureCard
              icon={Zap}
              title="Real-time Updates"
              description="Continuous model improvements and feature updates"
              delay={1.4}
            />
          </div>
        </div>
      </section>

      <section className="relative z-10 py-32 px-8 md:px-16 bg-gradient-to-br from-blue-950 via-purple-950 to-indigo-900 overflow-hidden">
        <FloatingParticles />

        {/* Additional ambient background effects */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.1),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(147,51,234,0.1),transparent_50%)]" />
        </div>

        <div className="relative">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              type: "spring",
              bounce: 0.4,
            }}
            className="text-center mb-24"
          >
            <h2
              className="text-6xl font-bold bg-gradient-to-r from-white via-blue-100 to-white 
          bg-clip-text text-transparent mb-6"
            >
              Meet Our Team
            </h2>
            <p className="text-2xl text-blue-200/90 font-light">
              The minds behind SnapCaption!
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            <TeamMember
              name="Amit More"
              role="AI Research Lead"
              image={amitImage}
              linkedin="https://www.linkedin.com/in/amit-more-57a646249/"
              github="https://github.com/amitmore-007"
              floatDelay={0}
            />
            <TeamMember
              name="Pranav Patil"
              role="Backend Engineer"
              image={pranavImage}
              linkedin="https://www.linkedin.com/in/pranavvpatil/"
              github="https://github.com/PranavvvPatil"
              floatDelay={0.2}
            />
            <TeamMember
              name="Renuka Jadhav"
              role="Frontend Developer"
              image={renukaImage}
              linkedin="https://www.linkedin.com/in/renuka-jadhav-26a515291/"
              github="https://github.com/renukaj29"
              floatDelay={0}
            />
            <TeamMember
              name="Ganesh Lakhe"
              role="UI/UX Designer"
              image={ganeshImage}
              linkedin="https://www.linkedin.com/in/ganesh-lakhe/"
              github="https://github.com/Ganeshrlakhe"
              floatDelay={0}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;