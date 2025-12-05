import React from "react";
import { Star } from "lucide-react";

export default function ProductCategories() {
  const categories = [
    {
      title: "HOT TREND",
      products: [
        {
          id: 1,
          name: "Chain bucket bag",
          price: 59.0,
          image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=400&q=80",
          rating: 5
        },
        {
          id: 2,
          name: "Pendant earrings",
          price: 59.0,
          image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&q=80",
          rating: 5
        },
        {
          id: 3,
          name: "Cotton T-Shirt",
          price: 59.0,
          image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&q=80",
          rating: 5
        }
      ]
    },
    {
      title: "BEST SELLER",
      products: [
        {
          id: 4,
          name: "Cotton T-Shirt",
          price: 59.0,
          image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=400&q=80",
          rating: 5
        },
        {
          id: 5,
          name: "Zip-pockets pebbled tote briefcase",
          price: 59.0,
          image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&q=80",
          rating: 5
        },
        {
          id: 6,
          name: "Round leather bag",
          price: 59.0,
          image: "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=400&q=80",
          rating: 5
        }
      ]
    },
    {
      title: "FEATURE",
      products: [
        {
          id: 7,
          name: "Bow wrap skirt",
          price: 59.0,
          image: "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=400&q=80",
          rating: 5
        },
        {
          id: 8,
          name: "Metallic earrings",
          price: 59.0,
          image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&q=80",
          rating: 5
        },
        {
          id: 9,
          name: "Flap cross-body bag",
          price: 59.0,
          image: "https://images.unsplash.com/photo-1564422170194-896b89110ef8?w=400&q=80",
          rating: 5
        }
      ]
    }
  ];

  const Stars = ({ rating }) => (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={14}
          fill={i < rating ? "#FFD700" : "none"}
          stroke={i < rating ? "#FFD700" : "#D1D5DB"}
        />
      ))}
    </div>
  );

  return (
    <div className="w-full bg-gray-50 py-16 px-8">
      <div className="max-w-5xl mx-auto">
        <div className="w-full flex flex-row justify-between gap-12">
          {categories.map((category, categoryIndex) => (
            <div key={categoryIndex}>
              
              <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-2">
                  {category.title}
                </h2>
                <div className="w-20 h-1 bg-red-600"></div>
              </div>

              <div className="space-y-6">
                {category.products.map((product) => (
                  <div
                    key={product.id}
                    className="flex gap-4 group cursor-pointer"
                  >
                    <div className="w-24 h-24 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>

                    <div className="flex flex-col justify-center">
                      <h3 className="text-gray-800 text-sm font-medium mb-2 group-hover:text-red-600 transition-colors">
                        {product.name}
                      </h3>
                      <Stars rating={product.rating} />
                      <p className="text-gray-900 font-bold text-base mt-2">
                        $ {product.price.toFixed(1)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
