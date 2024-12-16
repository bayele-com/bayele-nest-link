import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

interface SEOProps {
  title?: string;
  description?: string;
  type?: "website" | "article";
}

export const SEO = ({ title, description, type = "website" }: SEOProps) => {
  const { t } = useTranslation();
  const location = useLocation();

  useEffect(() => {
    // Update meta tags
    document.title = title || t("meta.home.title");
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", description || t("meta.home.description"));
    }

    // Update OpenGraph tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    const ogDescription = document.querySelector('meta[property="og:description"]');
    const ogType = document.querySelector('meta[property="og:type"]');
    const ogUrl = document.querySelector('meta[property="og:url"]');

    if (ogTitle) ogTitle.setAttribute("content", title || t("meta.home.title"));
    if (ogDescription) ogDescription.setAttribute("content", description || t("meta.home.description"));
    if (ogType) ogType.setAttribute("content", type);
    if (ogUrl) ogUrl.setAttribute("content", `https://bayele.com${location.pathname}`);
  }, [title, description, type, t, location]);

  return null;
};