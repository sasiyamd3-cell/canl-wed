import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-dark-bg via-purple-950/30 to-dark-bg">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-neon-purple blur-[150px] opacity-20 rounded-full"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-neon-pink blur-[150px] opacity-20 rounded-full"></div>

      <div className="max-w-[1600px] mx-auto px-6 lg:px-10 py-20 lg:py-32 grid lg:grid-cols-2 gap-16 items-center relative z-10">
        
        <div>
          <p className="text-neon-purple text-lg lg:text-xl font-semibold tracking-widest mb-4 flex items-center gap-3">
            <span className="w-12 h-[2px] bg-neon-purple"></span>
            WELCOME TO BEST HAND
          </p>
          
          <h1 className="text-6xl lg:text-8xl font-black leading-[0.95] mb-6">
            BEST ITEMS<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-purple via-purple-400 to-neon-pink italic glow-text">
              BEST HAND
            </span>
          </h1>

          <p className="text-xl lg:text-2xl text-gray-300 mb-10 flex flex-wrap gap-3 items-center">
            High Quality Products 
            <span className="text-neon-purple">|</span>
            Low Prices 
            <span className="text-neon-purple">|</span>
            Fast Delivery
          </p>
          
          <div className="flex flex-wrap items-center gap-8">
            <a 
              href="#shop"
              className="bg-neon-purple hover:bg-purple-700 text-white px-10 py-5 rounded-full text-xl font-bold flex items-center gap-3 transition glow"
            >
              Shop Now <ArrowRight size={24} />
            </a>
            <div className="text-2xl italic text-gray-300">
              Your Style 👑<br />
              <span className="text-neon-purple font-bold not-italic">Our Priority</span>
            </div>
          </div>

          <div className="mt-12 flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-neon-purple"></span>
            <span className="w-3 h-3 rounded-full bg-gray-600"></span>
            <span className="w-3 h-3 rounded-full bg-gray-600"></span>
          </div>
        </div>

        <div className="relative">
          <img 
            src="https://images.unsplash.com/photo-1552346154-21d32810aba3?w=1200" 
            alt="Hero"
            className="relative w-full h-[500px] lg:h-[650px] object-cover rounded-3xl border-2 border-neon-purple/40 glow"
          />
          <div className="absolute -bottom-6 -right-6 bg-neon-purple px-6 py-4 rounded-2xl rotate-[-5deg] glow">
            <p className="text-white font-black text-lg flex items-center gap-2">
              <Sparkles size={20} /> BEST QUALITY ALWAYS
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
