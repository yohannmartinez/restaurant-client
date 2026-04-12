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
            inviteMember: {
                title: 'Ajouter un membre',
                description: "Invite un utilisateur dans ce restaurant à partir de son adresse email.",
                trigger: 'Ajouter un membre',
                fields: {
                    email: 'Email',
                    role: 'Rôle',
                },
                placeholders: {
                    email: 'membre@restaurant.fr',
                },
                actions: {
                    cancel: 'Annuler',
                    submit: 'Inviter',
                    loading: 'Invitation...',
                },
                feedback: {
                    success: 'Invitation envoyée avec succès.',
                    error: "L'invitation du membre a échoué.",
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
                    invitations: 'Invitations',
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
                    team: 'Membres',
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
                DRAFT: 'En préparation',
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
        invitations: {
            title: 'Invitations',
            description: "Retrouve ici les restaurants dans lesquels tu as été invité.",
            badges: {
                invited: 'Invitation en attente',
            },
            actions: {
                accept: 'Accepter',
                accepting: 'Acceptation...',
                decline: 'Refuser',
                declining: 'Refus...',
            },
            feedback: {
                acceptSuccess: "Invitation acceptée avec succès.",
                acceptNotFoundError: "Invitation introuvable.",
                acceptAlreadyAcceptedError: "Cette invitation a déjà été acceptée.",
                acceptError: "L'acceptation de l'invitation a échoué.",
                declineSuccess: "Invitation refusée avec succès.",
                declineNotFoundError: "Invitation introuvable.",
                declineAlreadyProcessedError: "Cette invitation a déjà été traitée.",
                declineError: "Le refus de l'invitation a échoué.",
            },
            cardDescription: "Ce restaurant t'a invité à rejoindre son espace de gestion.",
            members: (count: number) => count > 1 ? 'membres' : 'membre',
            empty: {
                title: "Aucune invitation pour le moment",
                description: "Quand un restaurant t'invitera, tu le retrouveras ici.",
            },
        },
        restaurant: {
            access: {
                revoked: {
                    title: 'Vous avez été supprimé du restaurant',
                    description: "Vous n'avez plus accès à ce restaurant dans la console.",
                },
                invited: {
                    title: "Vous devez accepter l'invitation à ce restaurant",
                    description: "Accepte d'abord l'invitation pour accéder à cet espace.",
                    actions: {
                        viewInvitations: 'Voir mes invitations',
                    },
                },
            },
            members: {
                title: 'Membres',
                description: (restaurantName: string) => `Retrouve ici les accès et rôles des membres de ${restaurantName}.`,
                memberLabel: (userId: string) => `Utilisateur ${userId.slice(0, 8)}`,
                actions: {
                    setOwner: 'Définir propriétaire',
                    setEditor: 'Définir éditeur',
                    remove: 'Retirer de ce restaurant',
                    restore: "Redonner l'accès à ce restaurant",
                    openMenu: "Ouvrir le menu d'actions",
                },
                feedback: {
                    updateRoleSuccess: 'Le rôle du membre a bien été mis à jour.',
                    updateRoleError: "Impossible de mettre à jour le rôle du membre.",
                    revokeMemberSuccess: 'Le membre a bien été retiré du restaurant.',
                    revokeMemberError: "Impossible de retirer ce membre du restaurant.",
                    restoreMemberSuccess: "L'accès du membre au restaurant a bien été rétabli.",
                    restoreMemberError: "Impossible de redonner l'accès à ce membre.",
                },
                fields: {
                    role: 'Rôle',
                    status: 'Statut',
                },
                roles: {
                    OWNER: 'Propriétaire',
                    EDITOR: 'Éditeur',
                },
                statuses: {
                    ACTIVE: 'Actif',
                    INVITED: 'Invité',
                    REVOKED: 'Révoqué',
                },
                list: {
                    searchPlaceholder: 'Chercher un utilisateur',
                    emptySearch: 'Aucun utilisateur ne correspond à cette recherche.',
                },
                empty: "Aucun membre n'est associé à ce restaurant pour le moment.",
            },
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
