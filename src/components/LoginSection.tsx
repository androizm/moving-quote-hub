import { Building2, Users, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export const LoginSection = () => {
  return (
    <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto mt-16">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="glass-card rounded-xl p-8"
      >
        <div className="flex items-center mb-4">
          <div className="p-3 rounded-lg bg-primary bg-opacity-10">
            <Users className="w-6 h-6 text-primary" />
          </div>
        </div>
        <h3 className="text-2xl font-semibold mb-3 text-gray-900">
          For Customers
        </h3>
        <p className="text-gray-600 mb-6">
          Get instant quotes from trusted moving companies
        </p>
        <a
          href="/customer-login"
          className="inline-flex items-center text-primary hover:text-primary-hover transition-colors"
        >
          Customer Login
          <ArrowRight className="ml-2 w-4 h-4" />
        </a>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="glass-card rounded-xl p-8"
      >
        <div className="flex items-center mb-4">
          <div className="p-3 rounded-lg bg-primary bg-opacity-10">
            <Building2 className="w-6 h-6 text-primary" />
          </div>
        </div>
        <h3 className="text-2xl font-semibold mb-3 text-gray-900">
          For Moving Companies
        </h3>
        <p className="text-gray-600 mb-6">
          Connect with customers looking for moving services
        </p>
        <a
          href="/company-login"
          className="inline-flex items-center text-primary hover:text-primary-hover transition-colors"
        >
          Company Login
          <ArrowRight className="ml-2 w-4 h-4" />
        </a>
      </motion.div>
    </div>
  );
};