import React, { useState } from 'react';
import { Search, ShoppingCart, User, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-dark-bg/95 backdrop-blur-md border-b border-gray-800">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-10 py-5">
        <div className="flex items-center justify-between gap-6">
          
          <Link to="/" className="flex items-center gap-3">
            <div className="text-5xl">👑</div>
            <div>
              <h1 className="text-3xl lg:text-4xl font-black tracking-tight">
                BEST <span className="text-neon-purple">HAND</span>
              </h1>
              <p className="text-xs text-gray-400 hidden sm:block">
                Quality Items • Best Price • For You
              </p>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-10 text-lg font-semibold">
            <Link to="/" className="hover:text-neon-purple transition">Home</Link>
            <a href="#shop" className="hover:text-neon-purple transition">Shop</a>
            <a href="#about" className="hover:text-neon-purple transition">About</a>
            <a href="#contact" className="hover:text-neon-purple transition">Contact</a>
          </div>

          <div className="hidden md:flex items-center bg-card-bg border border-gray-700 rounded-full px-6 py-3 w-80">
            <Search size={20} className="text-gray-400" />
            <input 
              type="text"
              placeholder="Search for products..."
              className="bg-transparent outline-none ml-3 w-full text-white placeholder-gray-500"
            />
          </div>

          <div className="flex items-center gap-3">
            <Link to="/admin" className="p-3 rounded-full hover:bg-card-bg transition">
              <User size={24} />
            </Link>
            <button className="relative p-3 rounded-full hover:bg-card-bg transition">
              <ShoppingCart size={24} />
              <span className="absolute -top-1 -right-1 bg-neon-purple text-xs w-6 h-6 rounded-full flex items-center justify-center font-bold">0</span>
            </button>
            <button className="lg:hidden p-2" onClick={() => setOpen(!open)}>
              {open ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {open && (
          <div className="lg:hidden mt-4 flex flex-col gap-4 text-lg font-semibold pb-4">
            <Link to="/" onClick={() => setOpen(false)}>Home</Link>
            <a href="#shop" onClick={() => setOpen(false)}>Shop</a>
            <a href="#about" onClick={() => setOpen(false)}>About</a>
            <a href="#contact" onClick={() => setOpen(false)}>Contact</a>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
