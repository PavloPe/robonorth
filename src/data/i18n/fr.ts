// ============================================================================
// RoboNorth.ca — French Translations
// ============================================================================

export const fr = {
  // Navigation
  nav: {
    robots: 'Robots',
    brands: 'Marques',
    parts: 'Pièces',
    compare: 'Comparer',
    blog: 'Blogue',
    about: 'À propos',
    getEarlyAccess: 'Accès anticipé',
  },

  // Homepage
  home: {
    title: 'RoboNorth — Le marché canadien des robots humanoïdes',
    subtitle: 'Parcourez, comparez et précommandez des robots humanoïdes des principaux fabricants mondiaux.',
    heroTitle: 'Le futur de la robotique, livré au Canada',
    heroSubtitle: 'Le premier marché dédié aux robots humanoïdes au Canada. Plus de 32 modèles, de 5 900 $ à la gamme entreprise.',
    browseCatalog: 'Parcourir le catalogue',
    takeQuiz: 'Faire le quiz',
    featuredRobots: 'Robots vedettes',
    viewAll: 'Voir tout',
    topBrands: 'Marques principales',
    partsComponents: 'Pièces et composants',
  },

  // Robots page
  robots: {
    title: 'Catalogue de robots humanoïdes',
    description: 'Parcourez plus de 32 robots humanoïdes disponibles au Canada.',
    filters: 'Filtres',
    allCategories: 'Toutes les catégories',
    consumer: 'Consommateur',
    enterprise: 'Entreprise',
    research: 'Recherche',
    announced: 'Annoncé',
    inStock: 'En stock',
    preOrder: 'Précommande',
    pilot: 'Programme pilote',
    comingSoon: 'Bientôt disponible',
    prototype: 'Prototype',
    shipsToCanada: 'Livraison au Canada',
    price: 'Prix',
    specifications: 'Spécifications',
    inquireNow: 'Demander maintenant',
    requestQuote: 'Demander un devis',
  },

  // Parts
  parts: {
    title: 'Pièces et composants',
    description: 'Parcourez les pièces et composants pour robots humanoïdes.',
  },

  // About
  about: {
    title: 'À propos de RoboNorth',
    description: 'Le premier marché canadien dédié aux robots humanoïdes.',
  },

  // Common
  common: {
    home: 'Accueil',
    learnMore: 'En savoir plus',
    viewDetails: 'Voir les détails',
    contactUs: 'Nous contacter',
    email: 'Courriel',
    phone: 'Téléphone',
    name: 'Nom',
    company: 'Entreprise',
    message: 'Message',
    submit: 'Soumettre',
    search: 'Rechercher',
    loading: 'Chargement...',
    error: 'Erreur',
    notFound: 'Page non trouvée',
    back: 'Retour',
    next: 'Suivant',
    previous: 'Précédent',
    copyright: '© 2026 RoboNorth. Tous droits réservés.',
    madeInCanada: 'Fabriqué au Canada',
    privacy: 'Confidentialité',
    terms: 'Conditions',
    accessibility: 'Accessibilité',
  },

  // Footer
  footer: {
    stayUpdated: 'Restez informé',
    getNews: 'Recevez les nouvelles sur les robots et les offres d\'accès anticipé.',
    subscribe: 'S\'abonner',
    yourEmail: 'votre@courriel.com',
    subscribed: 'Vous êtes inscrit !',
  },
} as const;

export type TranslationKey = typeof fr;
