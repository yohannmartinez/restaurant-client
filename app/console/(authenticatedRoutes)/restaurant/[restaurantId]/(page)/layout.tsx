import { getUserRestaurant } from "./get-user-restaurant";

type RestaurantLayoutProps = {
    children: React.ReactNode;
    params: Promise<{
        restaurantId: string;
    }>;
};

export default async function RestaurantLayout({
    children,
    params,
}: RestaurantLayoutProps) {
    const { restaurantId } = await params;

    await getUserRestaurant(restaurantId);

    return (
        <>
            {children}
        </>
    );
}
