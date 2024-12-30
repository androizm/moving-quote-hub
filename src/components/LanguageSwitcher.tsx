import { useTranslation } from 'react-i18next';
import { Button } from "@/components/ui/button";

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'de' : 'en';
    i18n.changeLanguage(newLang);
  };

  return (
    <Button
      variant="outline"
      onClick={toggleLanguage}
      className="px-4 py-2 rounded-md"
    >
      {i18n.language === 'en' ? 'Deutsch' : 'English'}
    </Button>
  );
};