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
      "getMovingQuote": "Get Your Moving Quote",
      "currentAddress": "Current Address",
      "newAddress": "New Address",
      "enterCurrentAddress": "Enter your current address",
      "enterNewAddress": "Enter your new address",
      "moveType": "Type of Move",
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
      "fullName": "Full Name",
      "enterFullName": "Enter your full name",
      "email": "Email",
      "enterEmail": "Enter your email",
      "phone": "Phone Number",
      "enterPhone": "Enter your phone number",
      "specialItems": "Special Items",
      "enterSpecialItems": "List any special items (piano, artwork, etc.)",
      "loadingAddressVerification": "Loading address verification..."
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
      "getMovingQuote": "Holen Sie sich Ihr Umzugsangebot",
      "currentAddress": "Aktuelle Adresse",
      "newAddress": "Neue Adresse",
      "enterCurrentAddress": "Geben Sie Ihre aktuelle Adresse ein",
      "enterNewAddress": "Geben Sie Ihre neue Adresse ein",
      "moveType": "Art des Umzugs",
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
      "fullName": "Vollständiger Name",
      "enterFullName": "Geben Sie Ihren vollständigen Namen ein",
      "email": "E-Mail",
      "enterEmail": "Geben Sie Ihre E-Mail-Adresse ein",
      "phone": "Telefonnummer",
      "enterPhone": "Geben Sie Ihre Telefonnummer ein",
      "specialItems": "Besondere Gegenstände",
      "enterSpecialItems": "Listen Sie besondere Gegenstände auf (Klavier, Kunstwerke, etc.)",
      "loadingAddressVerification": "Adressüberprüfung wird geladen..."
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
