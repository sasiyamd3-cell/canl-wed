import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import CategoryBar from '../components/CategoryBar';
import ProductCard from '../components/ProductCard';
import Footer from '../components/Footer';
import { getProducts } from '../utils/api';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProducts()
      .then(res => setProducts(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const filtered = selectedCategory === 'All' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-dark-bg">
      <Navbar />
      <Hero />
      <CategoryBar selected={selectedCategory} onSelect={setSelectedCategory} />

      <section id="shop" className="max-w-[1600px] mx-auto px-6 lg:px-10 py-12">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-10 gap-4">
          <div>
            <h2 className="text-4xl lg:text-5xl font-black text-white flex items-center gap-3">
              🔥 Best Sellers
            </h2>
            <p className="text-gray-400 text-lg lg:text-xl mt-2">
              Top products loved by our customers
            </p>
          </div>
          <button 
            onClick={() => setSelectedCategory('All')}
            className="text-neon-purple text-lg font-bold hover:underline"
          >
            View All Products →
          </button>
        </div>

        {loading ? (
          <div className="text-center py-20 text-2xl text-gray-400">Loading... ⏳</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
            {filtered.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {!loading && filtered.length === 0 && (
          <p className="text-center text-gray-500 text-2xl py-20">
            No products found 😢
          </p>
        )}
      </section>

      <Footer />
    </div>
  );
};

export default Home;
