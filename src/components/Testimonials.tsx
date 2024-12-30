import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { useTranslation } from 'react-i18next';

export const Testimonials = () => {
  const { t } = useTranslation();

  const testimonials = [
    {
      name: "Sarah Johnson",
      text: t('testimonial1'),
      rating: 5,
    },
    {
      name: "Michael Chen",
      text: t('testimonial2'),
      rating: 5,
    },
    {
      name: "Emma Williams",
      text: t('testimonial3'),
      rating: 4,
    },
  ];

  return (
    <div className="max-w-6xl mx-auto mt-16 mb-16">
      <h2 className="text-3xl font-bold text-center mb-12">{t('whatUsersSay')}</h2>
      <div className="grid md:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="glass-card rounded-xl p-6"
          >
            <div className="flex mb-4">
              {[...Array(testimonial.rating)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
              ))}
            </div>
            <p className="text-gray-600 mb-4">{testimonial.text}</p>
            <p className="font-semibold">{testimonial.name}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};