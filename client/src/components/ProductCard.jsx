import React from 'react';
import { ShoppingCart, Star, AlertTriangle } from 'lucide-react';
import { sendSingleOrder } from '../utils/whatsapp';

const ProductCard = ({ product }) => {
  const outOfStock = product.stock <= 0;

  return (
    <div className="bg-card-bg rounded-2xl overflow-hidden border border-gray-800 hover:border-neon-purple transition-all duration-300 group">
      
      <div className="relative h-64 lg:h-72 overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        
        {product.isBestSeller && (
          <span className="absolute top-4 left-4 bg-gradient-to-r from-neon-purple to-neon-pink text-white text-xs lg:text-sm px-4 py-1.5 rounded-full font-bold">
            🔥 Best Seller
          </span>
        )}

        {outOfStock && (
          <div className="absolute inset-0 bg-black/75 flex items-center justify-center">
            <span className="text-red-500 text-xl lg:text-2xl font-black border-2 border-red-500 px-6 py-3 rounded-lg rotate-[-15deg]">
              OUT OF STOCK
            </span>
          </div>
        )}

        {!outOfStock && product.stock <= 5 && (
          <span className="absolute top-4 right-4 bg-orange-500 text-white text-xs px-3 py-1.5 rounded-full font-bold flex items-center gap-1">
            <AlertTriangle size={14} /> Only {product.stock}!
          </span>
        )}
      </div>

      <div className="p-5 lg:p-6">
        <h3 className="text-white font-bold text-xl lg:text-2xl mb-1 line-clamp-1">
          {product.name}
        </h3>
        <p className="text-gray-400 text-sm lg:text-base mb-3">{product.category}</p>
        
        <div className="flex items-center gap-3 mb-3 flex-wrap">
          <span className="text-neon-purple font-black text-2xl lg:text-3xl">
            Rs {product.price.toLocaleString()}
          </span>
          {product.oldPrice > 0 && (
            <span className="text-gray-500 line-through text-base lg:text-lg">
              Rs {product.oldPrice.toLocaleString()}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 text-yellow-500 text-sm lg:text-base mb-3">
          <Star size={16} fill="currentColor" />
          <span className="text-white font-bold">{product.rating}</span>
          <span className="text-gray-400">({product.reviews})</span>
        </div>

        <div className="mb-4 text-sm">
          {outOfStock ? (
            <span className="text-red-500 font-bold">❌ Out of Stock</span>
          ) : (
            <span className="text-green-500 font-bold">✅ In Stock: {product.stock} items</span>
          )}
        </div>

        <button 
          onClick={() => !outOfStock && sendSingleOrder(product)}
          disabled={outOfStock}
          className={`w-full py-3 lg:py-4 rounded-xl flex items-center justify-center gap-2 text-base lg:text-lg font-bold transition ${
            outOfStock 
              ? 'bg-gray-700 text-gray-400 cursor-not-allowed' 
              : 'bg-neon-purple hover:bg-purple-700 text-white glow'
          }`}
        >
          <ShoppingCart size={20} />
          {outOfStock ? 'Out of Stock' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
