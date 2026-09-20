import React from 'react';
import { ShieldCheck, Truck, CreditCard, Headphones, Facebook, Instagram, Youtube, MessageCircle } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-card-bg border-t border-gray-800 mt-20">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-10 py-12 grid grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          { icon: <ShieldCheck size={40} />, title: '100% Genuine', desc: 'Original products only' },
          { icon: <Truck size={40} />, title: 'Fast Delivery', desc: 'Island wide shipping' },
          { icon: <CreditCard size={40} />, title: 'Secure Payment', desc: 'Cash / Bank / Online' },
          { icon: <Headphones size={40} />, title: '24/7 Support', desc: "We're always here" },
        ].map((f, i) => (
          <div key={i} className="flex items-center gap-4">
            <div className="text-neon-purple">{f.icon}</div>
            <div>
              <h4 className="text-white font-bold text-base lg:text-lg">{f.title}</h4>
              <p className="text-gray-400 text-sm">{f.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-gray-800">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-10 py-8 flex flex-col lg:flex-row items-center justify-between gap-6">
          
          <div className="flex items-center gap-3">
            <div className="text-3xl">👑</div>
            <div>
              <h3 className="text-xl font-black">BEST <span className="text-neon-purple">HAND</span></h3>
              <p className="text-xs text-gray-400">Quality Items • Best Price</p>
            </div>
          </div>

          <div className="flex items-center gap-3 text-green-500">
            <MessageCircle size={24} />
            <div>
              <p className="text-white text-sm">Order Now</p>
              <p className="font-bold">+94 72 644 2818</p>
            </div>
          </div>

          <div className="flex gap-4">
            <a href="#" className="p-3 bg-dark-bg rounded-full hover:bg-neon-purple transition">
              <Facebook size={20} />
            </a>
            <a href="#" className="p-3 bg-dark-bg rounded-full hover:bg-neon-purple transition">
              <Instagram size={20} />
            </a>
            <a href="#" className="p-3 bg-dark-bg rounded-full hover:bg-neon-purple transition">
              <Youtube size={20} />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800 py-6 text-center text-gray-500 text-sm">
        © 2025 Best Hand. All rights reserved. Made with 💜 in Sri Lanka
      </div>
    </footer>
  );
};

export default Footer;
