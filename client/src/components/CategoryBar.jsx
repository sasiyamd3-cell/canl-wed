import React from 'react';
import { Footprints, Shirt, ShoppingBag, Headphones, Smartphone, Grid } from 'lucide-react';

const CategoryBar = ({ selected, onSelect }) => {
  const categories = [
    { name: 'All', icon: <Grid size={44} /> },
    { name: 'Shoes', icon: <Footprints size={44} /> },
    { name: 'Clothing', icon: <Shirt size={44} /> },
    { name: 'Bags', icon: <ShoppingBag size={44} /> },
    { name: 'Accessories', icon: <Headphones size={44} /> },
    { name: 'Electronics', icon: <Smartphone size={44} /> },
  ];

  return (
    <section className="max-w-[1600px] mx-auto px-6 lg:px-10 py-16">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
        {categories.map((cat) => (
          <button
            key={cat.name}
            onClick={() => onSelect(cat.name)}
            className={`bg-card-bg border-2 rounded-2xl p-6 lg:p-8 flex flex-col items-center gap-4 transition-all hover:scale-105 ${
              selected === cat.name 
                ? 'border-neon-purple glow' 
                : 'border-gray-800 hover:border-neon-purple/50'
            }`}
          >
            <div className={selected === cat.name ? 'text-neon-purple' : 'text-gray-400'}>
              {cat.icon}
            </div>
            <span className="text-lg lg:text-xl font-bold">{cat.name}</span>
          </button>
        ))}
      </div>
    </section>
  );
};

export default CategoryBar;
