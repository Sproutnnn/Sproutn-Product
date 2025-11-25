import React from 'react';
import { Product } from '../services/products.service';
import { Package, Star } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onClick?: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  return (
    <div
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
      onClick={onClick}
    >
      {/* Product Image */}
      <div className="relative h-48 bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center">
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <Package className="w-16 h-16 text-green-600" />
        )}

        {/* Featured Badge */}
        {product.featured && (
          <div className="absolute top-3 right-3 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full flex items-center gap-1 text-sm font-semibold">
            <Star className="w-4 h-4 fill-current" />
            Featured
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-5">
        {/* Category Tag */}
        {product.category && (
          <div className="mb-2">
            <span className="inline-block bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded">
              {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
            </span>
          </div>
        )}

        {/* Product Name */}
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          {product.name}
        </h3>

        {/* Product Description */}
        <p className="text-gray-600 text-sm line-clamp-3">
          {product.description || 'No description available'}
        </p>

        {/* Learn More Link */}
        <div className="mt-4">
          <span className="text-green-600 font-semibold text-sm hover:text-green-700 inline-flex items-center">
            Learn More
            <svg
              className="w-4 h-4 ml-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
