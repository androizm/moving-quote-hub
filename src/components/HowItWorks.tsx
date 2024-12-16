import { motion } from "framer-motion";
import { Truck, ClipboardCheck, ThumbsUp } from "lucide-react";

export const HowItWorks = () => {
  const steps = [
    {
      icon: <ClipboardCheck className="w-12 h-12 text-primary mb-4" />,
      title: "Request a Quote",
      description: "Fill out our simple form with your moving details",
    },
    {
      icon: <Truck className="w-12 h-12 text-primary mb-4" />,
      title: "Get Multiple Quotes",
      description: "Receive competitive quotes from trusted moving companies",
    },
    {
      icon: <ThumbsUp className="w-12 h-12 text-primary mb-4" />,
      title: "Choose & Book",
      description: "Select the best offer and schedule your move",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto mt-16 mb-16">
      <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
      <div className="grid md:grid-cols-3 gap-8">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="text-center p-6"
          >
            <div className="flex justify-center">{step.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
            <p className="text-gray-600">{step.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};