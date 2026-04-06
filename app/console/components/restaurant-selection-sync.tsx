"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"
import { useRestaurant } from "@/app/console/hooks/use-restaurant"
import { getRestaurantIdFromPathname } from "@/app/console/helpers/get-restaurant-id-from-pathname"

export function RestaurantSelectionSync() {
    const pathname = usePathname()
    const { selectedRestaurantId, setSelectedRestaurantId } = useRestaurant()
    const restaurantIdFromPath = getRestaurantIdFromPathname(pathname)

    useEffect(() => {
        if (selectedRestaurantId !== restaurantIdFromPath) {
            setSelectedRestaurantId(restaurantIdFromPath)
        }
    }, [restaurantIdFromPath, selectedRestaurantId, setSelectedRestaurantId])

    return null
}
