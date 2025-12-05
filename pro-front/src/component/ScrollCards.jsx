import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ZoomIn, Heart, ShoppingBag } from "lucide-react";

export default function ScrollCards() {
  const [zoomedImage, setZoomedImage] = useState(null);

  const firstAppear = {
    hidden: { opacity: 0, y: 80, scale: 0 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6 } }
  };

  const secondAppear = {
    hidden: { opacity: 0, y: 80, scale: 0 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, delay: 0.4 } }
  };

  const Stars = () => (
    <div className="flex justify-center mt-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} size={14} fill="gold" stroke="gold" />
      ))}
    </div>
  );

  const ProductCard = ({ variants, imageUrl, title, price }) => {
    const [isHovered, setIsHovered] = useState(false);

    const iconVariants = {
      hidden: { opacity: 0, y: 40 },
      visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.1, duration: 0.3, type: "spring", stiffness: 300 }
      })
    };

    return (
      <div className="w-1/4">
        <motion.div
          variants={variants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="relative h-96 shadow-md bg-cover bg-center overflow-hidden"
          style={{ backgroundImage: `url('${imageUrl}')` }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute bottom-4 left-0 right-0 flex justify-center gap-3"
              >
                {[
                  { Icon: ZoomIn, action: () => setZoomedImage(imageUrl) },
                  { Icon: Heart, action: () => console.log("Added to favorites") },
                  { Icon: ShoppingBag, action: () => console.log("Added to bag") }
                ].map(({ Icon, action }, i) => (
                  <motion.button
                    key={i}
                    custom={i}
                    variants={iconVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    whileHover={{ rotate: 360, scale: 1.2, transition: { duration: 0.4 } }}
                    onClick={action}
                    className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-100 transition-colors"
                  >
                    <Icon size={20} className="text-gray-800" />
                  </motion.button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
        <p className="font-semibold mt-3 text-center">{title}</p>
        <Stars />
        <p className="text-center font-bold mt-1">${price}</p>
      </div>
    );
  };

  const products = [
    { id: 1, image: "/src/assets/products/product1.jpg", title: "Buttons tweed blazer", price: "59.0", variant: firstAppear },
    { id: 2, image: "/src/assets/products/product-2.jpg", title: "Elegant dress", price: "79.0", variant: secondAppear },
    { id: 3, image: "/src/assets/products/product3.avif", title: "Casual jacket", price: "89.0", variant: secondAppear },
    { id: 4, image: "/src/assets/products/product-4.jpg", title: "Summer blouse", price: "45.0", variant: firstAppear },
    { id: 5, image: "/src/assets/products/product-5.jpg", title: "Denim vest", price: "65.0", variant: firstAppear },
    { id: 6, image: "/src/assets/products/product-6.jpg", title: "Striped tee", price: "35.0", variant: secondAppear },
    { id: 7, image: "/src/assets/products/product-7.jpg", title: "Wool coat", price: "120.0", variant: secondAppear },
    { id: 8, image: "/src/assets/products/product-8.jpg", title: "Silk scarf", price: "29.0", variant: firstAppear }
  ];

  return (
    <>
      <div className="w-full py-20 flex justify-center bg-gray-50">
        <div className="flex flex-col gap-10 w-[90%]">
          <div className="flex justify-between gap-6">
            {products.slice(0, 4).map((product) => (
              <ProductCard
                key={product.id}
                variants={product.variant}
                imageUrl={product.image}
                title={product.title}
                price={product.price}
              />
            ))}
          </div>

          <div className="flex justify-between gap-6">
            {products.slice(4, 8).map((product) => (
              <ProductCard
                key={product.id}
                variants={product.variant}
                imageUrl={product.image}
                title={product.title}
                price={product.price}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Zoomed Image Modal */}
      <AnimatePresence>
        {zoomedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm"
            onClick={() => setZoomedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 0.95 }}
              exit={{ scale: 0.8 }}
              className="relative max-w-3xl max-h-[80vh] p-4"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={zoomedImage}
                alt="Zoomed product"
                className="w-full h-full object-contain shadow-2xl"
              />
              <button
                onClick={() => setZoomedImage(null)}
                className="absolute top-6 right-6 w-10 h-10 bg-white rounded-full flex items-center justify-center text-2xl font-bold hover:bg-gray-200 transition-colors"
              >
                ×
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
