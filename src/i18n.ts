import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          meta: {
            home: {
              title: "Bayele Immo | Apartment & House Rentals in Yaounde and Douala",
              description: "Find your ideal rental in Yaounde and Douala. Apartments, houses and furnished studios with transparent pricing. Simple and fast rental in Cameroon."
            },
            yaounde: {
              title: "Apartment Rentals Yaounde | Prices & Availability | Bayele Immo",
              description: "Discover our apartments for rent in Yaounde. Studios, 1-4 bedrooms in all neighborhoods: Bastos, Nlongkak, Omnisport. Updated prices and real photos."
            },
            douala: {
              title: "House Rentals Douala | Best Locations | Bayele Immo",
              description: "Find houses and apartments for rent in Douala. All neighborhoods: Bonapriso, Bonanjo, Akwa. Verified listings with real photos and prices."
            }
          },
          navigation: {
            about: "About",
            howItWorks: "How it works",
            listProperty: "List a property",
            support: "Support",
            careers: "Careers",
            login: "Log In",
            signup: "Sign Up"
          },
          footer: {
            company: "Company",
            properties: "Properties",
            legal: "Legal",
            connect: "Connect with us",
            terms: "Terms of Service",
            privacy: "Privacy Policy",
            rights: "All rights reserved"
          }
        }
      },
      fr: {
        translation: {
          meta: {
            home: {
              title: "Bayele Immo | Location Appartements & Maisons à Yaoundé et Douala",
              description: "Trouvez votre location idéale à Yaoundé et Douala. Appartements, maisons et studios meublés avec des prix transparents. Location simple et rapide au Cameroun."
            },
            yaounde: {
              title: "Location Appartement Yaoundé | Prix & Disponibilités | Bayele Immo",
              description: "Découvrez nos appartements à louer à Yaoundé. Studios, F2, F3, F4 dans tous les quartiers: Bastos, Nlongkak, Omnisport. Prix actualisés et photos réelles."
            },
            douala: {
              title: "Location Maison Douala | Meilleurs Quartiers | Bayele Immo",
              description: "Trouvez des maisons et appartements à louer à Douala. Tous les quartiers: Bonapriso, Bonanjo, Akwa. Annonces vérifiées avec photos réelles et prix."
            }
          },
          navigation: {
            about: "À propos",
            howItWorks: "Comment ça marche",
            listProperty: "Lister une propriété",
            support: "Support",
            careers: "Carrières",
            login: "Connexion",
            signup: "S'inscrire"
          },
          footer: {
            company: "Entreprise",
            properties: "Propriétés",
            legal: "Légal",
            connect: "Nous suivre",
            terms: "Conditions d'utilisation",
            privacy: "Politique de confidentialité",
            rights: "Tous droits réservés"
          }
        }
      }
    },
    fallbackLng: "fr",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;