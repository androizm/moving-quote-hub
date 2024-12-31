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
      "emailAddress": "Email",
      "enterEmail": "Enter your email",
      "phoneNumber": "Phone Number",
      "enterPhone": "Enter your phone number",
      "specialItems": "Special Items",
      "enterSpecialItems": "List any special items (piano, artwork, etc.)",
      "loadingAddressVerification": "Loading address verification...",

      // Testimonials
      "whatUsersSay": "What Our Users Say",
      "testimonial1": "The moving quote comparison made it so easy to find the right company. Saved both time and money!",
      "testimonial2": "Excellent service! Got multiple competitive quotes within hours. The move went smoothly.",
      "testimonial3": "Very professional platform. Helped me find a reliable moving company within my budget.",

      // Footer
      "aboutUs": "About Us",
      "aboutUsText": "MoveShop24 connects you with trusted moving companies to make your relocation smooth and affordable.",
      "quickLinks": "Quick Links",
      "howItWorksLink": "How It Works",
      "getQuoteLink": "Get a Quote",
      "forMovingCompanies": "For Moving Companies",
      "contactInfo": "Contact",
      "contactEmail": "Email",
      "contactPhone": "Phone",
      "legal": "Legal",
      "privacyPolicy": "Privacy Policy",
      "termsOfService": "Terms of Service",
      "allRightsReserved": "All rights reserved."
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
      "emailAddress": "E-Mail",
      "enterEmail": "Geben Sie Ihre E-Mail-Adresse ein",
      "phoneNumber": "Telefonnummer",
      "enterPhone": "Geben Sie Ihre Telefonnummer ein",
      "specialItems": "Besondere Gegenstände",
      "enterSpecialItems": "Listen Sie besondere Gegenstände auf (Klavier, Kunstwerke, etc.)",
      "loadingAddressVerification": "Adressüberprüfung wird geladen...",

      // Testimonials
      "whatUsersSay": "Was unsere Nutzer sagen",
      "testimonial1": "Der Umzugsangebots-Vergleich machte es so einfach, die richtige Firma zu finden. Zeit und Geld gespart!",
      "testimonial2": "Ausgezeichneter Service! Erhielt innerhalb von Stunden mehrere wettbewerbsfähige Angebote. Der Umzug verlief reibungslos.",
      "testimonial3": "Sehr professionelle Plattform. Half mir, ein zuverlässiges Umzugsunternehmen in meinem Budget zu finden.",

      // Footer
      "aboutUs": "Über uns",
      "aboutUsText": "MoveShop24 verbindet Sie mit vertrauenswürdigen Umzugsunternehmen, um Ihren Umzug reibungslos und kostengünstig zu gestalten.",
      "quickLinks": "Schnelllinks",
      "howItWorksLink": "So funktioniert's",
      "getQuoteLink": "Angebot einholen",
      "forMovingCompanies": "Für Umzugsunternehmen",
      "contactInfo": "Kontakt",
      "contactEmail": "E-Mail",
      "contactPhone": "Telefon",
      "legal": "Rechtliches",
      "privacyPolicy": "Datenschutzerklärung",
      "termsOfService": "Nutzungsbedingungen",
      "allRightsReserved": "Alle Rechte vorbehalten."
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