import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Building2, Users, Truck } from "lucide-react";

const Index = () => {
  const [isHovered, setIsHovered] = useState<string | null>(null);

  const features = [
    {
      id: "customers",
      title: "For Customers",
      description: "Get instant quotes from trusted moving companies",
      icon: Users,
      path: "/customer-login",
    },
    {
      id: "companies",
      title: "For Moving Companies",
      description: "Connect with customers looking for moving services",
      icon: Truck,
      path: "/company-login",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            Find Your Perfect Moving Company
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Compare quotes from trusted moving companies and choose the best option for your needs
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {features.map((feature) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative"
            >
              <div
                onMouseEnter={() => setIsHovered(feature.id)}
                onMouseLeave={() => setIsHovered(null)}
                className={`glass-card rounded-xl p-8 h-full transition-all duration-300 ${
                  isHovered === feature.id
                    ? "transform -translate-y-2 shadow-xl"
                    : ""
                }`}
              >
                <div className="flex items-center mb-4">
                  <div className="p-3 rounded-lg bg-primary bg-opacity-10">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <h3 className="text-2xl font-semibold mb-3 text-gray-900">
                  {feature.title}
                </h3>
                <p className="text-gray-600 mb-6">{feature.description}</p>
                <a
                  href={feature.path}
                  className="inline-flex items-center text-primary hover:text-primary-hover transition-colors"
                >
                  Get Started
                  <ArrowRight className="ml-2 w-4 h-4" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <p className="text-gray-600 mb-4">Trusted by moving companies across the country</p>
          <div className="flex justify-center items-center space-x-8">
            <Building2 className="w-12 h-12 text-gray-400" />
            <Building2 className="w-12 h-12 text-gray-400" />
            <Building2 className="w-12 h-12 text-gray-400" />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Index;