"use client";

export default function ConsultationForm() {
  return (
    <>
      <form className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
            type="text"
            placeholder="Name"
            className="w-full px-4 py-3 bg-transparent border-b border-[#e1e1e1] text-[#3E4241] placeholder-gray-600 focus:outline-none focus:border-primary transition"
          />
          <input
            type="tel"
            placeholder="Phone"
            className="w-full px-4 py-3 bg-transparent border-b border-[#e1e1e1] text-[#3E4241] placeholder-gray-600 focus:outline-none focus:border-primary transition"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-3 bg-transparent border-b border-[#e1e1e1] text-[#3E4241] placeholder-gray-600 focus:outline-none focus:border-primary transition"
          />
          <select className="w-full px-4 py-3 bg-transparent border-b border-[#e1e1e1] text-[#3E4241] focus:outline-none focus:border-primary transition appearance-none cursor-pointer">
            <option value="">Type of Service</option>
            <option value="holistic">Holistic Health Checkup</option>
            <option value="lifestyle">Lifestyle Medicine</option>
            <option value="public_health">Public Health Consultancy</option>
          </select>
        </div>
        <textarea
          rows={4}
          placeholder="Message"
          className="w-full px-4 py-3 bg-transparent border-b border-[#e1e1e1] text-[#3E4241] placeholder-gray-600 focus:outline-none focus:border-primary transition resize-none"
        />
        <button
          type="submit"
          className="w-full bg-primary text-white font-bold uppercase tracking-wider py-4 rounded-md hover:bg-heading transition duration-300"
        >
          Book Appointment
        </button>
      </form>
    </>
  );
}
