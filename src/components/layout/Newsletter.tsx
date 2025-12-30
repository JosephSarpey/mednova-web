import React from "react";

export default function Newsletter() {
  return (
    <div className="bg-white/5 p-8 md:p-12 rounded-lg mb-20 flex flex-col lg:flex-row items-center justify-between gap-8">
      <div className="lg:w-1/2">
        <h3 className="text-3xl font-serif mb-2">Subscribe Our Newsletter</h3>
        <p className="text-gray-400">Stay updated with our latest health insights and news.</p>
      </div>
      <div className="w-full lg:w-1/2">
        <form className="flex flex-col sm:flex-row gap-4" onSubmit={(e) => e.preventDefault()}>
          <input 
            type="email" 
            placeholder="Enter Email Address" 
            className="flex-grow bg-white text-gray-900 px-6 py-4 rounded-full outline-none focus:ring-2 focus:ring-primary"
          />
          <button className="bg-primary text-white px-8 py-4 rounded-full font-bold uppercase tracking-wider hover:bg-white hover:text-primary transition duration-300">
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
}
