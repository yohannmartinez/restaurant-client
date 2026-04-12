export const enMessages = {
    features: {
        modals: {
            createRestaurant: {
                title: 'Create a restaurant',
                description:
                    'Fill in the main information to add a restaurant.',
                trigger: 'Create restaurant',
                fields: {
                    name: 'Name',
                    description: 'Description',
                    address: 'Address',
                },
                placeholders: {
                    name: 'Corner Bistro',
                    description:
                        'Seasonal cuisine, sharing plates, lunch service...',
                    address: '12 Flower Street, 75002 Paris',
                },
                actions: {
                    cancel: 'Cancel',
                    submit: 'Create',
                    loading: 'Creating...',
                },
                feedback: {
                    success: 'Restaurant created successfully.',
                    error: 'Restaurant creation failed.',
                },
            },
            inviteMember: {
                title: 'Add a member',
                description: 'Invite a user to this restaurant using their email address.',
                trigger: 'Add a member',
                fields: {
                    email: 'Email',
                    role: 'Role',
                },
                placeholders: {
                    email: 'member@restaurant.com',
                },
                actions: {
                    cancel: 'Cancel',
                    submit: 'Invite',
                    loading: 'Inviting...',
                },
                feedback: {
                    success: 'Invitation sent successfully.',
                    error: 'Member invitation failed.',
                },
            },
        },
    },
    console: {
        sidebar: {
            header: {
                title: 'Restaurant',
                text: 'Select',
                popover: {
                    title: 'Restaurants',
                    description: 'Switch the active restaurant in the console.',
                    actions: {
                        addRestaurant: 'Add a restaurant',
                    },
                }
            },
            trigger: {
                collapse: 'Collapse navbar',
                expand: 'Expand navbar',
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
                    settings: 'Settings',
                    help: 'Help',
                },
            },
            withRestaurant: {
                backToRestaurants: 'All restaurants',
                groups: {
                    content: 'Content',
                    management: 'Management',
                },
                items: {
                    dishes: 'Dishes',
                    menus: 'Menus',
                    design: 'Theme',
                    publication: 'Publish',
                    team: 'Members',
                    analytics: 'Analytics',
                    settings: 'Settings',
                },
            },
            footer: {
                logout: 'Logout',
                feedback: {
                    success: 'Successfully logged out.',
                },
            }
        },
        login: {
            title: 'Sign in',
            description:
                "Sign in with Google to access your restaurant's admin area.",
            submit: 'Continue with Google',
            loading: 'Redirecting...',
            footer:
                "By continuing, you access your restaurant's private management area.",
        },
        restaurants: {
            title: 'Restaurants',
            description: 'Manage the restaurants linked to your account.',
            empty: {
                title: 'No restaurants yet',
                description: 'Create your first restaurant to start managing your business from the console.',
            },
            fields: {
                slug: 'Slug',
                status: 'Status',
                updatedAt: 'Last updated',
            },
            statuses: {
                DRAFT: 'In preparation',
                ACTIVE: 'Active',
                SUSPENDED: 'Suspended',
                ARCHIVED: 'Archived',
            },
            members: (count: number) => count > 1 ? 'members' : 'member',
            actions: {
                add: 'Create a restaurant',
                addDescription: 'Add a new restaurant and centralize its management from the console.',
                view: 'View restaurant',
                edit: 'Edit information',
            },
        },
        invitations: {
            title: 'Invitations',
            description: 'Find the restaurants that invited you here.',
            badges: {
                invited: 'Pending invitation',
            },
            actions: {
                accept: 'Accept',
                accepting: 'Accepting...',
                decline: 'Decline',
                declining: 'Declining...',
            },
            feedback: {
                acceptSuccess: 'Invitation accepted successfully.',
                acceptNotFoundError: 'Invitation not found.',
                acceptAlreadyAcceptedError: 'This invitation has already been accepted.',
                acceptError: 'Invitation acceptance failed.',
                declineSuccess: 'Invitation declined successfully.',
                declineNotFoundError: 'Invitation not found.',
                declineAlreadyProcessedError: 'This invitation has already been processed.',
                declineError: 'Invitation decline failed.',
            },
            cardDescription: 'This restaurant invited you to join its management space.',
            members: (count: number) => count > 1 ? 'members' : 'member',
            empty: {
                title: 'No invitations yet',
                description: 'When a restaurant invites you, it will appear here.',
            },
        },
        restaurant: {
            access: {
                revoked: {
                    title: 'You have been removed from the restaurant',
                    description: 'You no longer have access to this restaurant in the console.',
                },
                invited: {
                    title: 'You need to accept the invitation to this restaurant',
                    description: 'Accept the invitation first to access this area.',
                    actions: {
                        viewInvitations: 'View my invitations',
                    },
                },
            },
            members: {
                title: 'Members',
                description: (restaurantName: string) => `Find the access and roles for ${restaurantName} here.`,
                memberLabel: (userId: string) => `User ${userId.slice(0, 8)}`,
                actions: {
                    setOwner: 'Set as owner',
                    setEditor: 'Set as editor',
                    remove: 'Remove from restaurant',
                    restore: 'Restore access to this restaurant',
                    openMenu: 'Open actions menu',
                },
                feedback: {
                    updateRoleSuccess: "The member's role was updated.",
                    updateRoleError: "The member's role could not be updated.",
                    revokeMemberSuccess: 'The member was removed from the restaurant.',
                    revokeMemberError: 'The member could not be removed from the restaurant.',
                    restoreMemberSuccess: "The member's access to the restaurant was restored.",
                    restoreMemberError: "The member's access could not be restored.",
                },
                fields: {
                    role: 'Role',
                    status: 'Status',
                },
                roles: {
                    OWNER: 'Owner',
                    EDITOR: 'Editor',
                },
                statuses: {
                    ACTIVE: 'Active',
                    INVITED: 'Invited',
                    REVOKED: 'Revoked',
                },
                list: {
                    searchPlaceholder: 'Search for a user',
                    emptySearch: 'No users match this search.',
                },
                empty: 'No members are linked to this restaurant yet.',
            },
            notFound: {
                title: 'Restaurant not found',
                description:
                    "The restaurant you're looking for doesn't exist or you don't have access to it. You can select another one from the navigation menu.",
                actions: {
                    viewRestaurants: 'View my restaurants',
                },
            }
        }
    },

} as const;
