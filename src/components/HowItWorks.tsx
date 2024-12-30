import { motion } from "framer-motion";
import { Truck, ClipboardCheck, ThumbsUp } from "lucide-react";
import { useTranslation } from 'react-i18next';

export const HowItWorks = () => {
  const { t } = useTranslation();

  const steps = [
    {
      icon: <ClipboardCheck className="w-12 h-12 text-primary mb-4" />,
      title: t('requestQuote'),
      description: t('fillOutForm'),
    },
    {
      icon: <Truck className="w-12 h-12 text-primary mb-4" />,
      title: t('getMultipleQuotes'),
      description: t('receiveQuotes'),
    },
    {
      icon: <ThumbsUp className="w-12 h-12 text-primary mb-4" />,
      title: t('chooseAndBook'),
      description: t('selectBestOffer'),
    },
  ];

  return (
    <div className="max-w-6xl mx-auto mt-16 mb-16">
      <h2 className="text-3xl font-bold text-center mb-12">{t('howItWorks')}</h2>
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