import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      // Header
      "findPerfectMovingCompany": "Find Your Perfect Moving Company",
      "compareQuotes": "Compare quotes from trusted moving companies and save up to 40%",
      
      // How It Works
      "howItWorks": "How It Works",
      "requestQuote": "Request a Quote",
      "fillOutForm": "Fill out our simple form with your moving details",
      "getMultipleQuotes": "Get Multiple Quotes",
      "receiveQuotes": "Receive competitive quotes from trusted moving companies",
      "chooseAndBook": "Choose & Book",
      "selectBestOffer": "Select the best offer and schedule your move",
      
      // Quote Form
      "getYourMovingQuote": "Get Your Moving Quote",
      "currentAddress": "Current Address",
      "newAddress": "New Address",
      "enterCurrentAddress": "Enter your current address",
      "enterNewAddress": "Enter your new address",
      "typeOfMove": "Type of Move",
      "private": "Private",
      "business": "Business",
      "international": "International",
      "pianoTransport": "Piano Transport",
      "privateMove": "Moving from one home to another",
      "businessMove": "Office or commercial relocation",
      "internationalMove": "Moving across borders",
      "pianoMove": "Specialized piano moving service",
      "moveDates": "Move Dates",
      "pickMoveDates": "Pick your move dates",
      "livingSpace": "Living Space (m²)",
      "enterLivingSpace": "Enter living space in square meters",
      "next": "Next",
      "back": "Back",
      "getQuotes": "Get Quotes",
      "submitting": "Submitting...",

      // Login Section
      "forCustomers": "For Customers",
      "forMovingCompanies": "For Moving Companies",
      "getInstantQuotes": "Get instant quotes from trusted moving companies",
      "connectWithCustomers": "Connect with customers looking for moving services",
      "customerLogin": "Customer Login",
      "companyLogin": "Company Login",

      // Testimonials
      "whatUsersSay": "What Our Users Say",

      // Footer
      "aboutUs": "About Us",
      "aboutUsText": "MoveShop24 connects you with trusted moving companies to make your relocation smooth and affordable.",
      "quickLinks": "Quick Links",
      "contact": "Contact",
      "legal": "Legal",
      "allRightsReserved": "All rights reserved.",
    }
  },
  de: {
    translation: {
      // Header
      "findPerfectMovingCompany": "Finden Sie Ihr perfektes Umzugsunternehmen",
      "compareQuotes": "Vergleichen Sie Angebote von vertrauenswürdigen Umzugsunternehmen und sparen Sie bis zu 40%",
      
      // How It Works
      "howItWorks": "So funktioniert's",
      "requestQuote": "Angebot anfordern",
      "fillOutForm": "Füllen Sie unser einfaches Formular mit Ihren Umzugsdetails aus",
      "getMultipleQuotes": "Mehrere Angebote erhalten",
      "receiveQuotes": "Erhalten Sie wettbewerbsfähige Angebote von vertrauenswürdigen Umzugsunternehmen",
      "chooseAndBook": "Auswählen & Buchen",
      "selectBestOffer": "Wählen Sie das beste Angebot und planen Sie Ihren Umzug",
      
      // Quote Form
      "getYourMovingQuote": "Holen Sie sich Ihr Umzugsangebot",
      "currentAddress": "Aktuelle Adresse",
      "newAddress": "Neue Adresse",
      "enterCurrentAddress": "Geben Sie Ihre aktuelle Adresse ein",
      "enterNewAddress": "Geben Sie Ihre neue Adresse ein",
      "typeOfMove": "Art des Umzugs",
      "private": "Privat",
      "business": "Geschäftlich",
      "international": "International",
      "pianoTransport": "Klaviertransport",
      "privateMove": "Umzug von einem Zuhause in ein anderes",
      "businessMove": "Büro- oder Geschäftsumzug",
      "internationalMove": "Umzug über Grenzen hinweg",
      "pianoMove": "Spezialisierter Klaviertransport",
      "moveDates": "Umzugstermine",
      "pickMoveDates": "Wählen Sie Ihre Umzugstermine",
      "livingSpace": "Wohnfläche (m²)",
      "enterLivingSpace": "Geben Sie die Wohnfläche in Quadratmetern ein",
      "next": "Weiter",
      "back": "Zurück",
      "getQuotes": "Angebote einholen",
      "submitting": "Wird gesendet...",

      // Login Section
      "forCustomers": "Für Kunden",
      "forMovingCompanies": "Für Umzugsunternehmen",
      "getInstantQuotes": "Erhalten Sie sofort Angebote von vertrauenswürdigen Umzugsunternehmen",
      "connectWithCustomers": "Verbinden Sie sich mit Kunden, die Umzugsdienstleistungen suchen",
      "customerLogin": "Kunden-Login",
      "companyLogin": "Unternehmens-Login",

      // Testimonials
      "whatUsersSay": "Was unsere Nutzer sagen",

      // Footer
      "aboutUs": "Über uns",
      "aboutUsText": "MoveShop24 verbindet Sie mit vertrauenswürdigen Umzugsunternehmen, um Ihren Umzug reibungslos und kostengünstig zu gestalten.",
      "quickLinks": "Schnellzugriff",
      "contact": "Kontakt",
      "legal": "Rechtliches",
      "allRightsReserved": "Alle Rechte vorbehalten.",
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en", // default language
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;