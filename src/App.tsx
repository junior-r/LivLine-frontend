import Navbar from "./components/pages/HomeNavbar";

import ContactsSection from "./pages/home/Contacts";
import Footer from "./pages/home/Footer";
import TeamSection from "./pages/home/Team";
import HeroSection from "./pages/home/Hero";
import AboutSection from "./pages/home/About";
import ServicesSection from "./pages/home/Services";
import ProductSection from "./pages/home/Product";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection />

        {/* About Section */}
        <AboutSection />

        {/* Product Section */}
        <ProductSection />

        {/* Services Section */}
        <ServicesSection />

        {/* Team Section */}
        <TeamSection />

        {/* Contact Section */}
        <ContactsSection />

        {/* Footer */}
        <Footer />
      </main>
    </div>
  );
}

export default App;
