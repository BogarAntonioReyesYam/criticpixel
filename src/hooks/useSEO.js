import { useEffect } from 'react';

const useSEO = ({ title, description }) => {
  useEffect(() => {
    const fullTitle = title ? `${title} — CriticPixel` : 'CriticPixel — Reseñas honestas de videojuegos';
    document.title = fullTitle;

    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'description';
      document.head.appendChild(meta);
    }
    meta.content = description || 'Scores reales, reseñas detalladas. Tu guía para elegir el próximo juego.';

    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (!ogTitle) {
      ogTitle = document.createElement('meta');
      ogTitle.setAttribute('property', 'og:title');
      document.head.appendChild(ogTitle);
    }
    ogTitle.content = fullTitle;

    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (!ogDesc) {
      ogDesc = document.createElement('meta');
      ogDesc.setAttribute('property', 'og:description');
      document.head.appendChild(ogDesc);
    }
    ogDesc.content = description || 'Scores reales, reseñas detalladas. Tu guía para elegir el próximo juego.';
  }, [title, description]);
};

export default useSEO;
