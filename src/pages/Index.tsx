import { motion } from "framer-motion";
import { QuoteForm } from "@/components/QuoteForm";
import { LoginSection } from "@/components/LoginSection";
import { Testimonials } from "@/components/Testimonials";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="flex justify-start mb-8">
            <img 
              src="/lovable-uploads/c266e933-1dde-46e4-9426-20c051352b6a.png" 
              alt="MoveShop24 Logo" 
              className="h-12 md:h-16"
            />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            Find Your Perfect Moving Company
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Compare quotes from trusted moving companies and save up to 40%
          </p>
        </motion.div>

        <QuoteForm />
        <LoginSection />
        <Testimonials />
      </div>
    </div>
  );
};

export default Index;