import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function DiscountBanner() {
  const [timeLeft, setTimeLeft] = useState({
    days: 29,
    hours: 11,
    minutes: 49,
    seconds: 23
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { days, hours, minutes, seconds } = prev;
        
        seconds--;
        
        if (seconds < 0) {
          seconds = 59;
          minutes--;
        }
        
        if (minutes < 0) {
          minutes = 59;
          hours--;
        }
        
        if (hours < 0) {
          hours = 23;
          days--;
        }
        
        if (days < 0) {
          return { days: 0, hours: 0, minutes: 0, seconds: 0 };
        }
        
        return { days, hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full min-h-[500px] bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-8">
      <div className="w-full max-w-7xl flex flex-row items-center gap-8 bg-white rounded-3xl shadow-2xl overflow-hidden">

        
        {/* Left Side - Image */}
        <div className="w-full md:w-1/2 h-[500px] bg-pink-200">
          <img
            src="/src/assets/timer/img2.jpg"
            alt="Fashion model"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Side - Content */}
        <div className="w-full md:w-1/2 p-12 flex flex-col items-center text-center">
          
          {/* Discount Badge */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p className="text-gray-700 font-semibold text-sm tracking-widest uppercase mb-2">
              DISCOUNT
            </p>
            <h1 className="text-6xl md:text-7xl font-bold text-red-600 mb-4" style={{ fontFamily: "'Dancing Script', cursive" }}>
              Summer 2019
            </h1>
          </motion.div>

          {/* Sale Percentage */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mb-8"
          >
            <p className="text-xl font-semibold text-gray-800">
              SALE <span className="text-red-600 text-4xl font-bold">50%</span>
            </p>
          </motion.div>

          {/* Countdown Timer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex gap-6 mb-8"
          >
            <TimeUnit value={timeLeft.days} label="Day" />
            <TimeUnit value={timeLeft.hours} label="Hour" />
            <TimeUnit value={timeLeft.minutes} label="Min" />
            <TimeUnit value={timeLeft.seconds} label="Sec" />
          </motion.div>

          {/* Shop Now Button */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative group"
          >
            <span className="text-xl font-bold text-gray-800 tracking-wider uppercase">
              SHOP NOW
            </span>
            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-red-600 transform origin-left transition-transform group-hover:scale-x-110"></div>
          </motion.button>
        </div>
      </div>

      {/* Load Dancing Script Font */}
      <link
        href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&display=swap"
        rel="stylesheet"
      />
    </div>
  );
}

function TimeUnit({ value, label }) {
  return (
    <div className="flex flex-col items-center">
      <motion.div
        key={value}
        initial={{ scale: 1.2 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3 }}
        className="text-5xl font-bold text-gray-900"
      >
        {String(value).padStart(2, '0')}
      </motion.div>
      <div className="text-sm text-gray-600 mt-1 font-medium">{label}</div>
    </div>
  );
}