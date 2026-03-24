export const RestaurantStatus = {
    DRAFT: 'DRAFT',
    ACTIVE: 'ACTIVE',
    SUSPENDED: 'SUSPENDED',
    ARCHIVED: 'ARCHIVED'
} as const

export type RestaurantStatus = (typeof RestaurantStatus)[keyof typeof RestaurantStatus]

export type Restaurant = {
    name: string;
    description: string | null;
    address: string;
    id: string;
    slug: string;
    status: RestaurantStatus;
    createdAt: Date;
    updatedAt: Date;
}