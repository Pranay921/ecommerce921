import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";

export default function Slideshow() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    { id: 1, para: "New Collection 2024", heading: "Summer Vibes", description: "Discover the latest trends" },
    { id: 2, para: "Exclusive Offers", heading: "Style Your Way", description: "Up to 50% off on selected items" },
    { id: 3, para: "Limited Edition", heading: "Premium Quality", description: "Handcrafted with love" }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const textVariants = {
    enter: { x: 80, opacity: 0 },
    center: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }
    },
    exit: { x: -80, opacity: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="w-full min-h-[200px] flex items-center justify-center bg-gray-100 ">
      <div className="relative w-full  h-[420px] bg-gray-200 overflow-hidden shadow-2xl flex items-center justify-center">

        {/* Left PNG (small, fixed at left) */}
        <img
          src="/src/assets/slideshow/left.png"
          alt="side-img"
          className="absolute left-0 bottom-0 h-85 w-auto object-contain "
        />

        {/* Center Slideshow Text */}
        <div className="relative z-10 text-center w-[60%] mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              variants={textVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="space-y-4"
            >
              <motion.p className="text-red-600 text-lg font-medium tracking-wide uppercase">
                {slides[currentSlide].para}
              </motion.p>

              <motion.h1
                className="text-6xl font-bold text-gray-800"
                style={{ fontFamily: "'Dancing Script', cursive" }}
              >
                {slides[currentSlide].heading}
              </motion.h1>

              <motion.p className="text-gray-700 text-xl">
                {slides[currentSlide].description}
              </motion.p>

              {/* Shop Now */}
              <motion.div className="inline-block mt-2">
                <button className="group flex items-center gap-3 text-gray-800 hover:text-red-600 transition-colors">
                  <span>SHOP NOW</span>
                  <ChevronRight className="group-hover:translate-x-1 transition-transform" size={18} />
                </button>
                {/* <div className="h-0.5 bg-red-600 mt-1"></div> */}
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dots */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${currentSlide === index ? "bg-red-600 w-8" : "bg-gray-500"}`}
            />
          ))}
        </div>
        <img
          src="/src/assets/slideshow/right.png"
          alt="side-img"
          className="absolute right-0 bottom-0 h-85 w-auto object-contain "
        />
      </div>

      <link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&display=swap" rel="stylesheet" />
    </div>
  );
}
