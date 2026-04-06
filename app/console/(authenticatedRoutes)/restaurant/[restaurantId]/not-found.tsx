import { Text } from "@/lib/components/ui/text";

export default function RestaurantNotFound() {
    return (
        <div className="rounded-2xl border border-destructive/20 bg-card p-6 shadow-sm">
            <Text as="p" size="5" weight="bold">
                Restaurant introuvable
            </Text>
            <Text as="p" size="2" className="mt-2 text-muted-foreground">
                Ce compte n&apos;a pas acces a ce restaurant, ou l&apos;identifiant
                fourni n&apos;existe pas.
            </Text>
        </div>
    );
}
