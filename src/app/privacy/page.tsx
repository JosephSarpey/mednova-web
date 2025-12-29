import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Mednova+ Inc.",
  description: "Read our Privacy Policy to understand how Mednova+ Inc. collects, uses, and protects your personal information.",
};

export default function PrivacyPage() {
  return (
    <div className="bg-white min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <header className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 mb-4 font-outfit">
            Privacy Policy
          </h1>
          <p className="text-gray-500 text-lg">
            Last Updated: December 29, 2025
          </p>
        </header>

        <div className="prose prose-lg prose-gray max-w-none space-y-12">
          {/* Section 1 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Your Privacy Matters</h2>
            <p className="text-gray-600 leading-relaxed">
              Your privacy is important to us. It is Mednova+ Inc.'s policy to respect your privacy regarding any information we may collect from you across our website, <span className="font-semibold text-gray-900">mednova.org</span>, and other sites we own and operate.
            </p>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Information We Collect</h2>
            <p className="text-gray-600 leading-relaxed sidebar-paragraph">
              We only ask for personal information when we truly need it to provide a service to you. We collect it by fair and lawful means, with your knowledge and consent. We also let you know why we’re collecting it and how it will be used.
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600 mt-4">
              <li><strong className="text-gray-800">Log Data:</strong> When you visit our website, our servers may automatically log the standard data provided by your web browser. This data is considered "non-identifying information", as it does not personally identify you on its own.</li>
              <li><strong className="text-gray-800">Device Data:</strong> We may also collect data about the device you’re using to access our website. This data is also considered "non-identifying information".</li>
              <li><strong className="text-gray-800">Personal Information:</strong> We may ask for personal information, such as your Name, Email, Social media profiles, Date of birth, Phone/mobile number, Home/Mailing address.</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Legal Bases for Processing</h2>
            <p className="text-gray-600 leading-relaxed">
              We will process your personal information lawfully, fairly, and in a transparent manner. We collect and process information about you only where we have legal bases for doing so. These legal bases depend on the services you use and how you use them.
            </p>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Collection and Use of Information</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              We may collect, hold, use, and disclose information for the following purposes and personal information will not be further processed in a manner that is incompatible with these purposes:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li>to provide you with our platform's core features and services;</li>
              <li>to enable you to customize or personalize your experience of our website;</li>
              <li>to contact and communicate with you;</li>
              <li>for internal record keeping and administrative purposes;</li>
              <li>to comply with our legal obligations and resolve any disputes that we may have.</li>
            </ul>
          </section>

           {/* Section 5 */}
           <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Security of Your Information</h2>
            <p className="text-gray-600 leading-relaxed">
              We only retain collected information for as long as necessary to provide you with your requested service. What data we store, we’ll protect within commercially acceptable means to prevent loss and theft, as well as unauthorized access, disclosure, copying, use or modification.
            </p>
          </section>

           {/* Section 6 */}
           <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Sharing of Your Information</h2>
            <p className="text-gray-600 leading-relaxed">
              We don’t share any personally identifying information publicly or with third-parties, except when required to by law.
            </p>
          </section>

          {/* Section 7 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Use of Cookies</h2>
            <p className="text-gray-600 leading-relaxed">
              We use "cookies" to collect information about you and your activity across our site. A cookie is a small piece of data that our website stores on your computer, and accesses each time you visit, so we can understand how you use our site. This helps us serve you content based on preferences you have specified.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
