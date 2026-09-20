import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Plus, Trash2, Edit, Package, Save, X, Download, 
  LogOut, RotateCcw, ArrowLeft, Upload 
} from 'lucide-react';
import { 
  getProducts, createProduct, updateProduct, 
  deleteProduct, updateStock, bulkSave 
} from '../utils/api';
import { isAdminLoggedIn, setAdminLoggedIn, exportProductsJSON } from '../utils/storage';

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '', price: '', oldPrice: '', category: 'Shoes',
    image: '', description: '', stock: 0, isBestSeller: false,
    rating: 4.5, reviews: 0
  });
  const navigate = useNavigate();

  const fetchProducts = () => {
    getProducts().then(res => setProducts(res.data));
  };

  useEffect(() => {
    if (!isAdminLoggedIn()) {
      navigate('/admin');
      return;
    }
    fetchProducts();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateProduct(editingId, formData);
      } else {
        await createProduct(formData);
      }
      resetForm();
      fetchProducts();
    } catch (err) {
      alert('Error saving product');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('මේ බඩුව delete කරන්නද? 🗑️')) return;
    try {
      await deleteProduct(id);
      fetchProducts();
    } catch (err) {
      alert('Error deleting');
    }
  };

  const handleEdit = (product) => {
    setFormData(product);
    setEditingId(product.id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStockUpdate = async (id, newStock) => {
    try {
      await updateStock(id, newStock);
      fetchProducts();
    } catch (err) {
      alert('Error updating stock');
    }
  };

  const handleExport = () => {
    exportProductsJSON(products);
  };

  const handleImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const imported = JSON.parse(event.target.result);
        if (window.confirm(`${imported.length} products import කරන්නද?`)) {
          await bulkSave(imported);
          fetchProducts();
          alert('✅ Imported successfully!');
        }
      } catch (err) {
        alert('❌ Invalid JSON file');
      }
    };
    reader.readAsText(file);
  };

  const resetForm = () => {
    setFormData({
      name: '', price: '', oldPrice: '', category: 'Shoes',
      image: '', description: '', stock: 0, isBestSeller: false,
      rating: 4.5, reviews: 0
    });
    setEditingId(null);
    setShowForm(false);
  };

  const logout = () => {
    setAdminLoggedIn(false);
    navigate('/admin');
  };

  const totalStock = products.reduce((sum, p) => sum + (p.stock || 0), 0);
  const outOfStock = products.filter(p => p.stock <= 0).length;
  const bestSellers = products.filter(p => p.isBestSeller).length;

  return (
    <div className="min-h-screen bg-dark-bg text-white">
      {/* Header */}
      <div className="bg-card-bg border-b border-gray-800 px-6 lg:px-10 py-6 sticky top-0 z-40">
        <div className="max-w-[1600px] mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link to="/" className="p-3 bg-dark-bg rounded-xl hover:bg-neon-purple transition">
              <ArrowLeft size={22} />
            </Link>
            <h1 className="text-2xl lg:text-4xl font-black">
              👑 Admin <span className="text-neon-purple">Dashboard</span>
            </h1>
          </div>
          <div className="flex flex-wrap gap-3">
            <button 
              onClick={() => setShowForm(!showForm)}
              className="bg-neon-purple hover:bg-purple-700 px-5 py-3 rounded-xl font-bold flex items-center gap-2"
            >
              {showForm ? <X size={20} /> : <Plus size={20} />}
              {showForm ? 'Close' : 'Add Product'}
            </button>
            <button 
              onClick={handleExport}
              className="bg-green-600 hover:bg-green-700 px-5 py-3 rounded-xl font-bold flex items-center gap-2"
            >
              <Download size={20} /> Export JSON
            </button>
            <label className="bg-blue-600 hover:bg-blue-700 px-5 py-3 rounded-xl font-bold flex items-center gap-2 cursor-pointer">
              <Upload size={20} /> Import
              <input type="file" accept=".json" onChange={handleImport} className="hidden" />
            </label>
            <button 
              onClick={logout}
              className="bg-red-600 hover:bg-red-700 px-5 py-3 rounded-xl font-bold flex items-center gap-2"
            >
              <LogOut size={20} /> Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-6 lg:px-10 py-10">

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          <div className="bg-card-bg p-6 rounded-2xl border border-gray-800">
            <Package className="text-neon-purple mb-3" size={32} />
            <h3 className="text-gray-400 text-sm">Total Products</h3>
            <p className="text-3xl lg:text-4xl font-black">{products.length}</p>
          </div>
          <div className="bg-card-bg p-6 rounded-2xl border border-gray-800">
            <h3 className="text-gray-400 text-sm">Total Stock</h3>
            <p className="text-3xl lg:text-4xl font-black text-green-500">{totalStock}</p>
          </div>
          <div className="bg-card-bg p-6 rounded-2xl border border-gray-800">
            <h3 className="text-gray-400 text-sm">Out of Stock</h3>
            <p className="text-3xl lg:text-4xl font-black text-red-500">{outOfStock}</p>
          </div>
          <div className="bg-card-bg p-6 rounded-2xl border border-gray-800">
            <h3 className="text-gray-400 text-sm">Best Sellers</h3>
            <p className="text-3xl lg:text-4xl font-black text-neon-purple">{bestSellers}</p>
          </div>
        </div>

        {/* Add/Edit Form */}
        {showForm && (
          <form onSubmit={handleSubmit} className="bg-card-bg p-6 lg:p-8 rounded-2xl border-2 border-neon-purple mb-10">
            <h2 className="text-2xl lg:text-3xl font-black mb-6">
              {editingId ? '✏️ Edit Product' : '➕ Add New Product'}
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <input 
                placeholder="Product Name *" required
                value={formData.name}
                className="bg-dark-bg border border-gray-700 rounded-xl px-5 py-4 text-lg focus:border-neon-purple outline-none"
                onChange={(e) => setFormData({...formData, name: e.target.value})} 
              />
              <select 
                value={formData.category}
                className="bg-dark-bg border border-gray-700 rounded-xl px-5 py-4 text-lg focus:border-neon-purple outline-none"
                onChange={(e) => setFormData({...formData, category: e.target.value})}
              >
                <option>Shoes</option>
                <option>Clothing</option>
                <option>Bags</option>
                <option>Accessories</option>
                <option>Electronics</option>
              </select>

              <input 
                type="number" placeholder="Price (Rs) *" required
                value={formData.price}
                className="bg-dark-bg border border-gray-700 rounded-xl px-5 py-4 text-lg focus:border-neon-purple outline-none"
                onChange={(e) => setFormData({...formData, price: e.target.value})} 
              />
              <input 
                type="number" placeholder="Old Price (optional)"
                value={formData.oldPrice}
                className="bg-dark-bg border border-gray-700 rounded-xl px-5 py-4 text-lg focus:border-neon-purple outline-none"
                onChange={(e) => setFormData({...formData, oldPrice: e.target.value})} 
              />

              <input 
                type="number" placeholder="Stock Quantity *" required
                value={formData.stock}
                className="bg-dark-bg border border-gray-700 rounded-xl px-5 py-4 text-lg focus:border-neon-purple outline-none"
                onChange={(e) => setFormData({...formData, stock: e.target.value})} 
              />
              <input 
                placeholder="Image URL *" required
                value={formData.image}
                className="bg-dark-bg border border-gray-700 rounded-xl px-5 py-4 text-lg focus:border-neon-purple outline-none"
                onChange={(e) => setFormData({...formData, image: e.target.value})} 
              />

              <input 
                type="number" placeholder="Rating (1-5)" step="0.1"
                value={formData.rating}
                className="bg-dark-bg border border-gray-700 rounded-xl px-5 py-4 text-lg focus:border-neon-purple outline-none"
                onChange={(e) => setFormData({...formData, rating: e.target.value})} 
              />
              <input 
                type="number" placeholder="Reviews Count"
                value={formData.reviews}
                className="bg-dark-bg border border-gray-700 rounded-xl px-5 py-4 text-lg focus:border-neon-purple outline-none"
                onChange={(e) => setFormData({...formData, reviews: e.target.value})} 
              />

              <textarea 
                placeholder="Description"
                value={formData.description}
                className="bg-dark-bg border border-gray-700 rounded-xl px-5 py-4 text-lg focus:border-neon-purple outline-none lg:col-span-2"
                rows="3"
                onChange={(e) => setFormData({...formData, description: e.target.value})} 
              />

              <label className="flex items-center gap-3 text-lg lg:col-span-2">
                <input 
                  type="checkbox"
                  checked={formData.isBestSeller}
                  className="w-6 h-6 accent-neon-purple"
                  onChange={(e) => setFormData({...formData, isBestSeller: e.target.checked})} 
                />
                Mark as Best Seller 🔥
              </label>
            </div>

            <div className="flex gap-4 mt-8">
              <button type="submit" className="bg-neon-purple hover:bg-purple-700 px-8 py-4 rounded-xl text-lg font-bold flex items-center gap-2">
                <Save size={22} /> {editingId ? 'Update' : 'Save Product'}
              </button>
              {editingId && (
                <button type="button" onClick={resetForm} className="bg-gray-700 px-8 py-4 rounded-xl text-lg font-bold">
                  Cancel
                </button>
              )}
            </div>
          </form>
        )}

        {/* Products Table */}
        <div className="bg-card-bg rounded-2xl border border-gray-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-dark-bg border-b border-gray-800">
                <tr>
                  <th className="text-left p-4 text-gray-400 text-sm">Image</th>
                  <th className="text-left p-4 text-gray-400 text-sm">Name</th>
                  <th className="text-left p-4 text-gray-400 text-sm">Category</th>
                  <th className="text-left p-4 text-gray-400 text-sm">Price</th>
                  <th className="text-left p-4 text-gray-400 text-sm">Stock</th>
                  <th className="text-left p-4 text-gray-400 text-sm">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map(p => (
                  <tr key={p.id} className="border-b border-gray-800 hover:bg-dark-bg/50">
                    <td className="p-4">
                      <img src={p.image} className="w-14 h-14 object-cover rounded-lg" alt={p.name} />
                    </td>
                    <td className="p-4 font-bold">{p.name}</td>
                    <td className="p-4 text-gray-400">{p.category}</td>
                    <td className="p-4 text-neon-purple font-bold">Rs {p.price.toLocaleString()}</td>
                    <td className="p-4">
                      <input 
                        type="number"
                        value={p.stock}
                        onChange={(e) => handleStockUpdate(p.id, e.target.value)}
                        className={`w-20 px-3 py-2 rounded-lg border-2 font-bold bg-dark-bg outline-none ${
                          p.stock <= 0 ? 'border-red-500 text-red-500' :
                          p.stock <= 5 ? 'border-orange-500 text-orange-500' :
                          'border-green-500 text-green-500'
                        }`}
                      />
                    </td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <button 
                          onClick={() => handleEdit(p)}
                          className="p-2.5 bg-blue-600 hover:bg-blue-700 rounded-lg"
                          title="Edit"
                        >
                          <Edit size={16} />
                        </button>
                        <button 
                          onClick={() => handleDelete(p.id)}
                          className="p-2.5 bg-red-600 hover:bg-red-700 rounded-lg"
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {products.length === 0 && (
            <p className="text-center text-gray-500 text-xl py-20">
              No products yet. Add your first product! 🚀
            </p>
          )}
        </div>

        {/* Info Box */}
        <div className="mt-8 bg-blue-500/10 border border-blue-500/30 rounded-2xl p-6">
          <h3 className="text-blue-400 font-bold text-lg mb-2">💡 වැදගත් තොරතුරු</h3>
          <ul className="text-gray-300 space-y-2 text-sm">
            <li>• Admin Panel එකෙන් add කරන products <b>Heroku server</b> එකේ JSON file එකේ save වෙනවා.</li>
            <li>• හැමෝටම පේන්න ඕන නම් <b>Export JSON</b> කරලා GitHub එකට push කරන්න.</li>
            <li>• Stock එක inline edit කරන්න පුළුවන් (table එකේ).</li>
            <li>• Delete කරන්න 🗑️ button එක ඔබන්න.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
