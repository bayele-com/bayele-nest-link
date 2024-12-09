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
    fallbackLng: "en",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;