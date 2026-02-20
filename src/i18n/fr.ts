// ============================================================================
// RoboNorth.ca — French (fr-CA) translations (placeholder)
// ============================================================================

import type { TranslationKey } from './en';

export const fr: TranslationKey = {
  // Common
  common: {
    siteName: 'RoboNorth',
    tagline: 'Le marché canadien des robots humanoïdes',
    language: 'Français',
    locale: 'fr-CA',
  },

  // Navigation
  nav: {
    robots: 'Robots',
    brands: 'Marques',
    parts: 'Pièces',
    compare: 'Comparer',
    blog: 'Blogue',
    about: 'À propos',
    earlyAccess: 'Accès anticipé',
    menu: 'Menu',
    closeMenu: 'Fermer le menu',
    skipToContent: 'Aller au contenu principal',
  },

  // Robot detail
  robot: {
    inquireNow: 'Demander maintenant',
    requestQuote: 'Demander un devis',
    compare: 'Comparer',
    specifications: 'Spécifications',
    performance: 'Performance',
    details: 'Détails',
    shipsToCanada: 'Livraison au Canada',
    inStock: 'En stock',
    preOrder: 'Précommande',
    pilotProgram: 'Programme pilote',
    comingSoon: 'Bientôt disponible',
    prototype: 'Prototype',
    faq: 'Questions fréquemment posées',
    shippingToCanada: 'Expédition au Canada',
    videos: 'Vidéos',
    youMightAlsoLike: 'Vous pourriez aussi aimer',
    recentlyViewed: 'Récemment consultés',
    share: 'Partager',
    save: 'Sauvegarder',
    saved: 'Sauvegardé',
    notifyMe: 'Me notifier quand disponible',
  },

  // Categories
  categories: {
    consumer: 'Consommateur',
    enterprise: 'Entreprise',
    research: 'Recherche',
    announced: 'Annoncé',
  },

  // Footer
  footer: {
    stayUpdated: 'Restez informé',
    newsletterDesc: 'Recevez les nouvelles et offres en avant-première.',
    subscribed: 'Vous êtes abonné!',
    subscribedDesc: 'Nous vous tiendrons au courant des nouveaux robots.',
    enterEmail: 'Entrez votre courriel',
    subscribe: "S'abonner",
    validEmail: 'Veuillez entrer un courriel valide.',
    allRightsReserved: 'Tous droits réservés.',
  },

  // Search
  search: {
    placeholder: 'Rechercher des robots, marques, articles...',
    noResults: 'Aucun résultat trouvé',
    shortcut: '⌘K',
  },

  // Quiz
  quiz: {
    title: 'Quel robot vous convient?',
    subtitle: 'Répondez à 5 questions rapides et nous vous recommanderons les meilleurs robots humanoïdes pour vos besoins.',
    retake: 'Reprendre le quiz',
    compareResults: 'Comparer ces robots',
    getAdvice: 'Obtenir des conseils',
    strongMatch: 'Correspondance forte',
    goodMatch: 'Bonne correspondance',
    yourRecommendations: 'Vos robots recommandés',
  },
} as const;
