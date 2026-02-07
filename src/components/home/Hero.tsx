import Image from "next/image";
import Link from "next/link";
import { Phone, Users, ShieldCheck, Activity } from "lucide-react";
import BlurText from "@/components/ui/BlurText";
import * as motion from "framer-motion/client";

export default function Hero() {
  return (
    <div className="relative bg-white min-h-screen w-full flex items-center overflow-hidden pt-12 lg:pt-0">

      {/* Abstract Background Elements - Soft light blue and white fluid waves */}
      <div className="absolute inset-0 z-0">
        <svg
          viewBox="0 0 1440 800"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute top-0 left-0 w-full h-full object-cover opacity-60"
          preserveAspectRatio="xMidYMid slice"
        >
          <path
            d="M0 100C320 50 480 250 800 200C1120 150 1280 50 1440 100V800H0V100Z"
            fill="url(#paint0_linear_hero)"
          />
          <path
            d="M0 200C400 150 600 350 900 300C1200 250 1300 150 1440 200V800H0V200Z"
            fill="url(#paint1_linear_hero)"
            style={{ opacity: 0.5 }}
          />
          <defs>
            <linearGradient
              id="paint0_linear_hero"
              x1="720"
              y1="0"
              x2="720"
              y2="800"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#E0F2FE" />
              <stop offset="1" stopColor="white" />
            </linearGradient>
            <linearGradient
              id="paint1_linear_hero"
              x1="720"
              y1="100"
              x2="720"
              y2="800"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#F0F9FF" />
              <stop offset="1" stopColor="white" />
            </linearGradient>
          </defs>
        </svg>

        {/* Floating soft bokeh elements */}
        <div className="absolute top-[20%] left-[10%] w-64 h-64 bg-blue-100/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-[20%] right-[10%] w-96 h-96 bg-blue-50/40 rounded-full blur-3xl" />
        <div className="absolute top-[40%] right-[30%] w-48 h-48 bg-primary/5 rounded-full blur-2xl" />
      </div>

      {/* Background Decorative Blobs */}
      <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] animate-pulse z-0" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[100px] z-0" />

      {/* Subtle Background Watermark on Left */}
      <div className="absolute left-10 top-1/2 -translate-y-1/2 select-none pointer-events-none z-0 hidden lg:block opacity-30">
        <span className="text-[200px] font-bold text-mednova-green/30 leading-none tracking-tighter">
          MEDNOVA+
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">

          {/* Left Column: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col justify-center text-center lg:text-left pt-6 lg:pt-0"
          >
            <div className="inline-flex items-center self-center lg:self-start bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100 mb-6">
              <span className="flex h-2 w-2 relative mr-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              <span className="text-secondary font-semibold text-xs tracking-wider uppercase">
                Healthcare • Dental • Public Health
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold tracking-tight mb-6 leading-[1.1] text-secondary">
              <span className="block text-secondary">We care about</span>
              <span className="block text-mednova-green">your health</span>
            </h1>

            <p className="text-lg text-gray-600 mb-8 max-w-lg mx-auto lg:mx-0 leading-relaxed">
              At Mednova+, Health means love. We provide premier healthcare solutions, expert dental services, and strategic public health consultancy to improve quality of life.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                href="/services"
                className="inline-flex items-center justify-center bg-primary text-white font-medium px-8 py-4 rounded-full transition-all duration-300 hover:bg-secondary hover:shadow-lg shadow-primary/30"
              >
                Explore Our Services
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center justify-center bg-white text-secondary font-medium px-8 py-4 rounded-full transition-all duration-300 hover:bg-gray-50 border border-gray-200 shadow-sm hover:shadow-md"
              >
                Learn More
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="mt-12 flex items-center justify-center lg:justify-start gap-8 text-gray-500 text-sm font-medium">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-primary" />
                <span>Verified Specialists</span>
              </div>
              <div className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-primary" />
                <span>High Tech Labs</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: 3D Image Composition */}
          <div className="relative w-full flex items-center justify-center lg:justify-end mt-12 lg:mt-0 px-4 lg:px-0">

            {/* Main Image Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative z-20 w-[280px] sm:w-[400px] lg:w-[500px] aspect-square rounded-full overflow-hidden shadow-2xl border-[6px] border-white/30 backdrop-blur-sm"
            >
              <Image
                src="/mednova_img.jpg"
                alt="Doctor"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 500px"
                className="object-cover object-center"
                priority
              />
            </motion.div>

            {/* Decorative Circle Backdrop */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-primary/20 via-blue-100/10 to-transparent rounded-full blur-3xl z-0" />

            {/* Floating 3D Pills - Bottom Right */}
            <motion.div
              animate={{ y: [0, 15, 0], rotate: [0, -5, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
              className="absolute -bottom-4 -right-2 sm:bottom-0 sm:right-0 lg:bottom-10 lg:-right-4 z-30 w-16 h-16 sm:w-20 sm:h-20"
            >
              <Image
                src="/3d-pill.jpg"
                alt="3d-pill"
                width={150}
                height={150}
                className="w-full h-full object-cover rounded-full"
              />
            </motion.div>

            {/* Floating Heartbeat - Top Right */}
            <motion.div
              animate={{ scale: [1, 1.9, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-10 right-0 sm:top-0 sm:right-6 lg:-top-4 lg:right-10 z-30 w-14 h-14 sm:w-18 sm:h-18 flex items-center justify-center"
            >
              <Image
                src="/3d-heartpulse.jpg"
                alt="3d-heartpulse"
                width={100}
                height={100}
                className="w-full h-full object-contain rounded-full"
              />
            </motion.div>

            {/* Floating Card 1: Impact - Bottom Left */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute bottom-6 -left-4 sm:bottom-10 sm:-left-8 lg:bottom-16 lg:-left-12 bg-white p-2.5 sm:p-3 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] z-30 flex items-center gap-2 sm:gap-3 max-w-[140px] sm:max-w-[180px]"
            >
              <div className="bg-primary/10 p-1.5 rounded-full">
                <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" />
              </div>
              <div>
                <p className="font-bold text-secondary text-[10px] sm:text-xs">10k+ Lives Impacted</p>
                <p className="text-[9px] sm:text-[10px] text-gray-500">Global Wellness</p>
              </div>
            </motion.div>

            {/* Floating Card 2: Call Center - Top Right Side */}
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-10 -right-6 sm:top-20 sm:-right-10 lg:top-24 lg:-right-4 bg-white/90 backdrop-blur-md p-2.5 sm:p-3 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] z-20 flex items-center gap-2 sm:gap-3"
            >
              <div className="bg-secondary p-1.5 rounded-full text-white">
                <Phone className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              </div>
              <div>
                <p className="font-bold text-secondary text-[10px] sm:text-xs">24/7 Support</p>
                <p className="text-[9px] sm:text-[10px] text-primary font-bold">+1 (914) 616-6162</p>
              </div>
            </motion.div>

            {/* Floating Pill: Status - Top Left */}
            <motion.div
              animate={{ x: [0, 10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              className="absolute -top-2 left-0 sm:top-4 sm:left-4 lg:top-8 lg:-left-4 bg-white py-1.5 px-3 rounded-full shadow-lg z-30 flex items-center gap-2"
            >
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
              <span className="text-[10px] sm:text-xs font-bold text-secondary whitespace-nowrap">Open Now</span>
            </motion.div>

          </div>
        </div>
      </div>
    </div>
  );
}
