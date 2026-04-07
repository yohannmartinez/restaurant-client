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
        },
    },
    console: {
        sidebar: {
            header: {
                title: 'Restaurants',
                description: 'Switch the active restaurant in the console.',
                actions: {
                    addRestaurant: 'Add a restaurant',
                },
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
                    team: 'Team',
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
        restaurant: {
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
