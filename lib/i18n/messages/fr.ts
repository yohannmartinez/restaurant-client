export const frMessages = {
    features: {
        modals: {
            createRestaurant: {
                title: 'Créer un restaurant',
                description:
                    'Renseigne les informations principales pour ajouter un restaurant.',
                trigger: 'Créer un restaurant',
                fields: {
                    name: 'Nom',
                    description: 'Description',
                    address: 'Adresse',
                },
                placeholders: {
                    name: 'Le Bistrot du Coin',
                    description:
                        'Cuisine de saison, plats a partager, service du midi...',
                    address: '12 rue des Fleurs, 75002 Paris',
                },
                actions: {
                    cancel: 'Annuler',
                    submit: 'Créer',
                    loading: 'Création...',
                },
                feedback: {
                    success: 'Restaurant créé avec succès.',
                    error: 'La création du restaurant a échoué.',
                },
            },
        },
    },
    console: {
        sidebar: {
            restaurantsTitle: 'Restaurants',
            restaurantsDescription: 'Change le restaurant actif dans la console.',
            addRestaurant: 'Ajouter un restaurant',
        },
        login: {
            title: 'Connexion',
            description:
                "Connecte-toi avec Google pour accéder a l'espace d'administration de ton restaurant.",
            submit: 'Continuer avec Google',
            loading: 'Redirection en cours...',
            footer:
                "En continuant, tu accèdes a l'espace privé de gestion de ton restaurant.",
        },
        navbar: {
            logout: 'Déconnexion',
            feedback: {
                success: 'Déconnexion réussie.',
            },
        },
    },

} as const;
