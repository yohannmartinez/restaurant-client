export const RestaurantRole = {
    OWNER: 'OWNER',
    EDITOR: 'EDITOR'
} as const

export type RestaurantRole = (typeof RestaurantRole)[keyof typeof RestaurantRole]


export const MembershipStatus = {
    INVITED: 'INVITED',
    ACTIVE: 'ACTIVE',
    REVOKED: 'REVOKED'
} as const

export type MembershipStatus = (typeof MembershipStatus)[keyof typeof MembershipStatus]

export type RestaurantMembership = {
    id: string;
    status: MembershipStatus;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    restaurantId: string;
    role: RestaurantRole;
    invitedByUserId: string | null;
}