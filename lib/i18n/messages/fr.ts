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
            header: {
                title: "Restaurant",
                text: "Selectionner",
                popover: {
                    title: 'Restaurants',
                    description: 'Change le restaurant actif dans la console.',
                    actions: {
                        addRestaurant: 'Ajouter un restaurant',
                    },
                }
            },
            trigger: {
                collapse: 'Réduire la barre',
                expand: 'Agrandir la barre',
            },
            withoutRestaurant: {
                groups: {
                    console: 'Console',
                    support: 'Support',
                },
                items: {
                    dashboard: 'Dashboard',
                    analytics: 'Analytics',
                    restaurants: 'Restaurants',
                    settings: 'Parametres',
                    help: 'Aide',
                },
            },
            withRestaurant: {
                backToRestaurants: 'Tous les restaurants',
                groups: {
                    content: 'Contenu',
                    management: 'Gestion',
                },
                items: {
                    dishes: 'Plats',
                    menus: 'Menus',
                    design: 'Thème',
                    publication: 'Mise en ligne',
                    team: 'Equipe',
                    analytics: 'Analytics',
                    settings: 'Parametres',
                },
            },
            footer: {
                logout: 'Déconnexion',
                feedback: {
                    success: 'Déconnexion réussie.',
                },
            }
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
        restaurants: {
            title: 'Restaurants',
            description: 'Gère les restaurants associés à ton compte.',
            empty: {
                title: 'Aucun restaurant pour le moment',
                description: "Crée ton premier restaurant pour commencer à gérer ton activité depuis la console.",
            },
            fields: {
                slug: 'Slug',
                status: 'Statut',
                updatedAt: 'Dernière édition',
            },
            statuses: {
                DRAFT: 'Brouillon',
                ACTIVE: 'Actif',
                SUSPENDED: 'Suspendu',
                ARCHIVED: 'Archivé',
            },
            members: (count: number) => count > 1 ? 'membres' : 'membre',
            actions: {
                add: 'Créer un restaurant',
                addDescription: 'Ajoute un nouveau restaurant et centralise sa gestion depuis la console.',
                view: 'Voir le restaurant',
                edit: 'Modifier les informations',
            },
        },
        restaurant: {
            notFound: {
                title: 'Restaurant non trouvé',
                description:
                    "Le restaurant que tu cherches n'existe pas ou tu n'y as pas accès. Tu peux en sélectionner un autre depuis le menu de navigation.",
                actions: {
                    viewRestaurants: 'Voir mes restaurants',
                },
            },
        }
    },

} as const;
