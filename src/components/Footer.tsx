import { motion } from "framer-motion";
import { useTranslation } from 'react-i18next';

export const Footer = () => {
  const { t } = useTranslation();

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-50 border-t"
    >
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-semibold mb-4">{t('aboutUs')}</h3>
            <p className="text-gray-600 text-sm">
              {t('aboutUsText')}
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-4">{t('quickLinks')}</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-600 hover:text-primary">{t('howItWorksLink')}</a></li>
              <li><a href="#" className="text-gray-600 hover:text-primary">{t('getQuoteLink')}</a></li>
              <li><a href="#" className="text-gray-600 hover:text-primary">{t('forMovingCompanies')}</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">{t('contact')}</h3>
            <ul className="space-y-2 text-sm">
              <li className="text-gray-600">{t('email')}: support@moveshop24.com</li>
              <li className="text-gray-600">{t('phone')}: (555) 123-4567</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">{t('legal')}</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-600 hover:text-primary">{t('privacyPolicy')}</a></li>
              <li><a href="#" className="text-gray-600 hover:text-primary">{t('termsOfService')}</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t text-center text-sm text-gray-600">
          <p>&copy; {new Date().getFullYear()} MoveShop24. {t('allRightsReserved')}</p>
        </div>
      </div>
    </motion.footer>
  );
};