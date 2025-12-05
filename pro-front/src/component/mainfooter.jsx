import React, { useState } from 'react';
import { Instagram, Facebook, Twitter, Youtube, MapPin } from 'lucide-react';

export default function Footer() {
  const [hoveredImage, setHoveredImage] = useState(null);

  const images = [
    { id: 1, src: '/src/assets/mainfooter/footer_1.jpg', alt: 'Clothespins' },
    { id: 2, src: '/src/assets/mainfooter/footer_2.jpg', alt: 'Clothing rack' },
    { id: 3, src: '/src/assets/mainfooter/footer_3.jpg', alt: 'Fashion' },
    { id: 4, src: '/src/assets/mainfooter/footer_5.jpg', alt: 'Knitting' },
    { id: 5, src: '/src/assets/mainfooter/footer_4.jpg', alt: 'Skincare' },
    { id: 6, src: '/src/assets/mainfooter/footer_6.jpg', alt: 'Apparel' },
  ];

  return (
    <footer className="bg-white space-y-16">

      <div className="pt-10">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="flex flex-wrap justify-between gap-16">

            <div className="flex items-center gap-4">
              <div className="bg-red-600 rounded-full p-3 flex-shrink-0">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Free Shipping</h3>
                <p className="text-sm text-gray-600">For all order over $99</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="bg-red-600 rounded-full p-3 flex-shrink-0">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Money Back Guarantee</h3>
                <p className="text-sm text-gray-600">If goods have problems</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="bg-red-600 rounded-full p-3 flex-shrink-0">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Online Support 24/7</h3>
                <p className="text-sm text-gray-600">Dedicated support</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="bg-red-600 rounded-full p-3 flex-shrink-0">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Payment Secure</h3>
                <p className="text-sm text-gray-600">100% secure payment</p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* 🔥 FIXED IMAGE ZOOM HERE */}
      <div className="py-0">
        <div className="w-full">
          <div className="flex flex-row gap-0 w-full">

            {images.map((image) => (
              <a
                key={image.id}
                href="https://www.instagram.com/pranaydeep921/"
                target="_blank"
                rel="noopener noreferrer"
                className="relative w-1/2 md:w-1/3 lg:w-1/6 h-[400px] overflow-hidden group cursor-pointer"
                onMouseEnter={() => setHoveredImage(image.id)}
                onMouseLeave={() => setHoveredImage(null)}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className={`w-full h-full object-cover transition-all duration-300 ${
                    hoveredImage === image.id ? 'scale-105 blur-[1px]' : ''
                  }`}
                />

                <div
                  className={`absolute inset-0 flex flex-col items-center justify-center bg-black/40 transition-opacity duration-300 ${
                    hoveredImage === image.id ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <Instagram className="w-12 h-12 text-white mb-2" />
                  <span className="text-white font-semibold text-lg">@ pranaydeep921</span>
                </div>

              </a>
            ))}

          </div>
        </div>
      </div>

      <div className="bg-gray-50 py-14">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-row justify-between flex-wrap gap-12">

            <div>
              <h2 className="text-4xl font-bold mb-4" style={{ fontFamily: 'cursive' }}>Ashion</h2>
              <p className="text-gray-600 text-sm mb-6">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</p>
              <div className="flex gap-3">
                <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.png" className="h-8" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" className="h-8" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/American_Express_logo_%282018%29.svg" className="h-8" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" className="h-8" />
              </div>
            </div>

            <div>
              <h3 className="font-bold text-gray-900 mb-4 text-lg">QUICK LINKS</h3>
              <ul className="space-y-2">
                <li><a className="text-gray-600 hover:text-red-600">About</a></li>
                <li><a className="text-gray-600 hover:text-red-600">Blogs</a></li>
                <li><a className="text-gray-600 hover:text-red-600">Contact</a></li>
                <li><a className="text-gray-600 hover:text-red-600">FAQ</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-gray-900 mb-4 text-lg">ACCOUNT</h3>
              <ul className="space-y-2">
                <li><a className="text-gray-600 hover:text-red-600">My Account</a></li>
                <li><a className="text-gray-600 hover:text-red-600">Orders Tracking</a></li>
                <li><a className="text-gray-600 hover:text-red-600">Checkout</a></li>
                <li><a className="text-gray-600 hover:text-red-600">Wishlist</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-gray-900 mb-4 text-lg">NEWSLETTER</h3>
              <div className="flex gap-2 mb-6">
                <input type="email" placeholder="Email" className="flex-1 px-4 py-3  border-gray-300 rounded-lg" />
                <button className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700">SUBSCRIBE</button>
              </div>
              <div className="flex gap-3">
                <a className="bg-gray-200 p-3 rounded-full hover:bg-red-600 hover:text-white"><Facebook className="w-5 h-5" /></a>
                <a className="bg-gray-200 p-3 rounded-full hover:bg-red-600 hover:text-white"><Twitter className="w-5 h-5" /></a>
                <a className="bg-gray-200 p-3 rounded-full hover:bg-red-600 hover:text-white"><Youtube className="w-5 h-5" /></a>
                <a className="bg-gray-200 p-3 rounded-full hover:bg-red-600 hover:text-white"><Instagram className="w-5 h-5" /></a>
                <a className="bg-gray-200 p-3 rounded-full hover:bg-red-600 hover:text-white"><MapPin className="w-5 h-5" /></a>
              </div>
            </div>

          </div>
        </div>
      </div>

      <div className="bg-gray-900 text-white py-4 text-center text-sm">
        © 2024 All rights reserved | Made with ❤️ by Pranaydeep
      </div>

    </footer>
  );
}
