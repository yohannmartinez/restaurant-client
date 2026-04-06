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
            restaurantsTitle: 'Restaurants',
            restaurantsDescription: 'Switch the active restaurant in the console.',
            addRestaurant: 'Add a restaurant',
        },
        navbar: {
            logout: 'Logout',
            feedback: {
                success: 'Successfully logged out.',
            },
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
    },

} as const;
