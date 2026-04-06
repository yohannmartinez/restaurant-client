export function getRestaurantIdFromPathname(pathname: string) {
    const match = pathname.match(/^\/console\/restaurant\/([^/]+)(?:\/|$)/)
    return match?.[1] ?? null
}
